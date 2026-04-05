import json
import math
import os
import pickle
from collections import Counter, defaultdict

try:
    from sklearn.ensemble import (
        GradientBoostingClassifier,
        GradientBoostingRegressor,
        RandomForestClassifier,
        RandomForestRegressor,
        VotingClassifier,
    )
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.linear_model import LogisticRegression
    from sklearn.metrics import accuracy_score, confusion_matrix, f1_score, precision_score, recall_score
    from sklearn.metrics.pairwise import cosine_similarity
    from sklearn.model_selection import train_test_split

    SKLEARN_AVAILABLE = True
except ImportError:
    GradientBoostingClassifier = None
    GradientBoostingRegressor = None
    RandomForestClassifier = None
    RandomForestRegressor = None
    TfidfVectorizer = None
    LogisticRegression = None
    VotingClassifier = None
    accuracy_score = None
    confusion_matrix = None
    f1_score = None
    precision_score = None
    recall_score = None
    cosine_similarity = None
    train_test_split = None
    SKLEARN_AVAILABLE = False

try:
    from xgboost import XGBClassifier

    XGBOOST_AVAILABLE = True
except ImportError:
    XGBClassifier = None
    XGBOOST_AVAILABLE = False


ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "artifacts")
ARTIFACTS_PATH = os.path.join(ARTIFACTS_DIR, "ensemble_artifacts.pkl")


def split_tokens(value):
    if value is None:
        return []
    if isinstance(value, list):
        parts = value
    else:
        parts = str(value).replace("/", " ").replace(",", " ").split()
    return [str(item).strip().lower() for item in parts if str(item).strip()]


def normalize_text(value):
    return " ".join(split_tokens(value))


def safe_float(value, default=0.0):
    if value in (None, ""):
        return default
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def status_weight(status):
    mapping = {"approved": 1.0, "review": 0.85, "applied": 0.75, "rejected": 0.15}
    return mapping.get(str(status or "").lower(), 0.5)


def interaction_weight(event_type):
    mapping = {
        "view": 0.08,
        "detail_click": 0.18,
        "save": 0.55,
        "recommendation_click": 0.65,
        "apply": 0.85,
    }
    return mapping.get(str(event_type or "").lower(), 0.05)


def build_user_text(user):
    fields = [
        user.get("fullName") or user.get("name"),
        user.get("degree"),
        user.get("region"),
        user.get("category"),
        user.get("specialisation"),
        user.get("currentYear"),
        user.get("incomeRange"),
        " ".join(user.get("skills") or []),
        " ".join(user.get("interests") or []),
    ]
    return " ".join(normalize_text(field) for field in fields if field)


def build_scholarship_text(scholarship):
    fields = [
        scholarship.get("title"),
        scholarship.get("description"),
        scholarship.get("region"),
        scholarship.get("degree"),
        scholarship.get("category"),
        scholarship.get("provider"),
        " ".join(scholarship.get("eligibleSkills") or []),
    ]
    return " ".join(normalize_text(field) for field in fields if field)


def token_overlap_ratio(left_tokens, right_tokens):
    left_set = set(left_tokens)
    right_set = set(right_tokens)
    if not left_set or not right_set:
        return 0.0
    return len(left_set & right_set) / len(left_set | right_set)


def build_feature_vector(user, scholarship, popularity_score):
    user_skills = split_tokens(user.get("skills") or [])
    user_interests = split_tokens(user.get("interests") or [])
    scholarship_skills = split_tokens(scholarship.get("eligibleSkills") or [])
    scholarship_text_tokens = split_tokens(build_scholarship_text(scholarship))

    region_match = int(
        normalize_text(user.get("region")) != ""
        and normalize_text(user.get("region")) == normalize_text(scholarship.get("region"))
    )
    degree_match = int(
        normalize_text(user.get("degree")) != ""
        and normalize_text(user.get("degree")) == normalize_text(scholarship.get("degree"))
    )
    category_match = int(
        normalize_text(user.get("category")) != ""
        and normalize_text(user.get("category")) == normalize_text(scholarship.get("category"))
    )
    skill_overlap = token_overlap_ratio(user_skills, scholarship_skills)
    interest_overlap = token_overlap_ratio(user_interests, scholarship_text_tokens)

    days_until_deadline = 0.0
    deadline = scholarship.get("deadline")
    if deadline:
        try:
            from datetime import datetime, timezone

            parsed = datetime.fromisoformat(str(deadline).replace("Z", "+00:00"))
            now = datetime.now(timezone.utc)
            days_until_deadline = max((parsed - now).total_seconds() / 86400.0, 0.0)
        except ValueError:
            days_until_deadline = 0.0

    gpa = safe_float(user.get("gpa"))
    age = safe_float(user.get("age"))

    return [
        region_match,
        degree_match,
        category_match,
        skill_overlap,
        interest_overlap,
        min(gpa / 10.0, 1.0),
        min(age / 40.0, 1.0),
        min(days_until_deadline / 365.0, 1.0),
        popularity_score,
        min(len(user_skills) / 10.0, 1.0),
        min(len(scholarship_skills) / 10.0, 1.0),
    ]


def compatibility_score(features):
    weights = [0.20, 0.22, 0.10, 0.22, 0.10, 0.03, 0.01, 0.03, 0.05, 0.02, 0.02]
    return max(0.0, min(sum(feature * weight for feature, weight in zip(features, weights)), 1.0))


def value_is_generic(value):
    normalized = normalize_text(value)
    return normalized in {"", "all", "any", "open to all", "pan india", "nationwide", "general"}


def profile_fit_adjustment(user, scholarship):
    adjustment = 0.0

    user_degree = normalize_text(user.get("degree"))
    scholarship_degree = normalize_text(scholarship.get("degree"))
    if scholarship_degree and not value_is_generic(scholarship_degree):
        if user_degree == scholarship_degree:
            adjustment += 0.14
        elif user_degree:
            adjustment -= 0.10

    user_region = normalize_text(user.get("region"))
    scholarship_region = normalize_text(scholarship.get("region"))
    if scholarship_region and not value_is_generic(scholarship_region):
        if user_region == scholarship_region:
            adjustment += 0.08
        elif user_region:
            adjustment -= 0.04

    user_category = normalize_text(user.get("category") or user.get("fieldOfStudy"))
    scholarship_category = normalize_text(scholarship.get("category"))
    if scholarship_category and not value_is_generic(scholarship_category):
        if user_category == scholarship_category:
            adjustment += 0.06
        elif user_category:
            adjustment -= 0.03

    user_skills = set(split_tokens(user.get("skills") or []))
    scholarship_skills = set(split_tokens(scholarship.get("eligibleSkills") or []))
    if scholarship_skills:
        overlap = len(user_skills & scholarship_skills)
        if overlap >= 3:
            adjustment += 0.06
        elif overlap == 2:
            adjustment += 0.04
        elif overlap == 1:
            adjustment += 0.02

    return max(-0.18, min(adjustment, 0.22))


def build_training_rows(users_by_id, scholarships_by_id, applications, interactions):
    rows = []
    labels = []
    positive_pairs = set()
    popularity = defaultdict(int)

    for application in applications:
        scholarship_id = str(application.get("scholarshipId"))
        popularity[scholarship_id] += 4
        positive_pairs.add((str(application.get("userId")), scholarship_id))

    for interaction in interactions:
        scholarship_id = str(interaction.get("scholarshipId"))
        popularity[scholarship_id] += interaction_weight(interaction.get("eventType"))
        if interaction_weight(interaction.get("eventType")) >= 0.55:
            positive_pairs.add((str(interaction.get("userId")), scholarship_id))

    max_popularity = max(popularity.values(), default=1)

    for application in applications:
        user = users_by_id.get(str(application.get("userId")))
        scholarship = scholarships_by_id.get(str(application.get("scholarshipId")))
        if not user or not scholarship:
            continue
        rows.append(build_feature_vector(user, scholarship, popularity[str(application.get("scholarshipId"))] / max_popularity))
        labels.append(status_weight(application.get("status")))

    for interaction in interactions:
        user = users_by_id.get(str(interaction.get("userId")))
        scholarship = scholarships_by_id.get(str(interaction.get("scholarshipId")))
        if not user or not scholarship:
            continue
        rows.append(build_feature_vector(user, scholarship, popularity[str(interaction.get("scholarshipId"))] / max_popularity))
        labels.append(interaction_weight(interaction.get("eventType")))

    scholarship_ids = list(scholarships_by_id.keys())
    for user_id, user in users_by_id.items():
        negatives_added = 0
        for scholarship_id in scholarship_ids:
            if (user_id, scholarship_id) in positive_pairs:
                continue
            rows.append(build_feature_vector(user, scholarships_by_id[scholarship_id], popularity[scholarship_id] / max_popularity))
            labels.append(0.0)
            negatives_added += 1
            if negatives_added >= 3:
                break

    return rows, labels, popularity, max_popularity


def train_meta_model(rows, labels):
    if not SKLEARN_AVAILABLE or len(rows) < 8 or len(set(labels)) < 2:
        return None
    model = RandomForestRegressor(n_estimators=120, max_depth=6, min_samples_leaf=2, random_state=42)
    model.fit(rows, labels)
    return model


def train_structured_model(rows, labels):
    if not SKLEARN_AVAILABLE or len(rows) < 8 or len(set(labels)) < 2:
        return None
    model = GradientBoostingRegressor(
        n_estimators=160,
        learning_rate=0.05,
        max_depth=3,
        random_state=42,
    )
    model.fit(rows, labels)
    return model


def build_binary_labels(labels, positive_threshold=0.55):
    return [1 if label >= positive_threshold else 0 for label in labels]


def build_classifier_estimators():
    estimators = [
        ("rf", RandomForestClassifier(n_estimators=140, max_depth=8, min_samples_leaf=2, random_state=42)),
        ("gb", GradientBoostingClassifier(n_estimators=140, learning_rate=0.05, max_depth=3, random_state=42)),
        ("lr", LogisticRegression(max_iter=1200, class_weight="balanced", random_state=42)),
    ]

    if XGBOOST_AVAILABLE:
        estimators.insert(
            0,
            (
                "xgb",
                XGBClassifier(
                    n_estimators=120,
                    max_depth=4,
                    learning_rate=0.05,
                    subsample=0.9,
                    colsample_bytree=0.9,
                    eval_metric="logloss",
                    random_state=42,
                ),
            ),
        )

    return estimators


def train_classifier_ensemble(rows, labels):
    binary_labels = build_binary_labels(labels)
    if not SKLEARN_AVAILABLE or len(rows) < 30 or len(set(binary_labels)) < 2:
        return None

    estimators = build_classifier_estimators()
    weights = [4, 3, 2, 1] if XGBOOST_AVAILABLE else [3, 2, 1]
    model = VotingClassifier(estimators=estimators, voting="soft", weights=weights)
    model.fit(rows, binary_labels)
    return model


def mean_absolute_error_score(actual, predicted):
    if not actual:
        return None
    return sum(abs(left - right) for left, right in zip(actual, predicted)) / len(actual)


def root_mean_squared_error_score(actual, predicted):
    if not actual:
        return None
    return math.sqrt(sum((left - right) ** 2 for left, right in zip(actual, predicted)) / len(actual))


def r2_score_value(actual, predicted):
    if not actual:
        return None
    mean_actual = sum(actual) / len(actual)
    total_sum_squares = sum((value - mean_actual) ** 2 for value in actual)
    if total_sum_squares <= 0:
        return None
    residual_sum_squares = sum((left - right) ** 2 for left, right in zip(actual, predicted))
    return 1.0 - (residual_sum_squares / total_sum_squares)


def top_k_hit_rate(rows, labels, structured_model, meta_model, top_k=3):
    if not rows or not labels:
        return None

    scored = []
    for index, row in enumerate(rows):
        score = 0.0
        used = 0
        if structured_model is not None:
            score += float(structured_model.predict([row])[0])
            used += 1
        if meta_model is not None:
            score += float(meta_model.predict([row])[0])
            used += 1
        if used == 0:
            continue
        scored.append((index, score / used, labels[index]))

    if not scored:
        return None

    scored.sort(key=lambda item: item[1], reverse=True)
    top_slice = scored[: min(top_k, len(scored))]
    positives = sum(1 for _, _, label in top_slice if label >= 0.55)
    return positives / len(top_slice)


def evaluate_models(rows, labels, structured_model, meta_model):
    evaluation = {
        "labelMean": round(sum(labels) / len(labels), 4) if labels else None,
        "positiveLabelRate": round(sum(1 for item in labels if item >= 0.55) / len(labels), 4) if labels else None,
        "structuredModel": None,
        "metaModel": None,
        "top3HitRate": None,
    }

    if rows and labels and structured_model is not None:
        structured_predictions = [
            float(max(0.0, min(structured_model.predict([row])[0], 1.0)))
            for row in rows
        ]
        evaluation["structuredModel"] = {
            "mae": round(mean_absolute_error_score(labels, structured_predictions), 4),
            "rmse": round(root_mean_squared_error_score(labels, structured_predictions), 4),
            "r2": round(r2_score_value(labels, structured_predictions), 4),
        }

    if rows and labels and meta_model is not None:
        meta_predictions = [
            float(max(0.0, min(meta_model.predict([row])[0], 1.0)))
            for row in rows
        ]
        evaluation["metaModel"] = {
            "mae": round(mean_absolute_error_score(labels, meta_predictions), 4),
            "rmse": round(root_mean_squared_error_score(labels, meta_predictions), 4),
            "r2": round(r2_score_value(labels, meta_predictions), 4),
        }

    top3 = top_k_hit_rate(rows, labels, structured_model, meta_model, top_k=3)
    if top3 is not None:
        evaluation["top3HitRate"] = round(top3, 4)

    return evaluation


def predict_classifier_probability(classifier_model, row):
    if classifier_model is None:
        return None
    probabilities = classifier_model.predict_proba([row])[0]
    if len(probabilities) < 2:
        return None
    return float(max(0.0, min(probabilities[1], 1.0)))


def evaluate_classifier_model(rows, labels):
    binary_labels = build_binary_labels(labels)
    if not SKLEARN_AVAILABLE or len(rows) < 40 or len(set(binary_labels)) < 2:
        return None

    X_train, X_test, y_train, y_test = train_test_split(
        rows,
        binary_labels,
        test_size=0.2,
        random_state=42,
        stratify=binary_labels,
    )

    estimator = VotingClassifier(
        estimators=build_classifier_estimators(),
        voting="soft",
        weights=[4, 3, 2, 1] if XGBOOST_AVAILABLE else [3, 2, 1],
    )
    estimator.fit(X_train, y_train)
    predicted = estimator.predict(X_test)
    probabilities = estimator.predict_proba(X_test)[:, 1]
    confusion = confusion_matrix(y_test, predicted).ravel()
    tn, fp, fn, tp = [int(value) for value in confusion]

    return {
        "accuracy": round(float(accuracy_score(y_test, predicted)), 4),
        "precision": round(float(precision_score(y_test, predicted, zero_division=0)), 4),
        "recall": round(float(recall_score(y_test, predicted, zero_division=0)), 4),
        "f1": round(float(f1_score(y_test, predicted, zero_division=0)), 4),
        "avgPositiveProbability": round(float(sum(probabilities) / len(probabilities)), 4),
        "testSize": len(y_test),
        "confusionMatrix": {
            "tn": tn,
            "fp": fp,
            "fn": fn,
            "tp": tp,
        },
    }


def train_artifacts(payload):
    users = payload.get("users") or []
    scholarships = payload.get("scholarships") or []
    applications = payload.get("applications") or []
    interactions = payload.get("interactions") or []

    users_by_id = {str(item.get("id") or item.get("_id")): item for item in users if item.get("id") or item.get("_id")}
    scholarships_by_id = {str(item.get("id") or item.get("_id")): item for item in scholarships if item.get("id") or item.get("_id")}
    rows, labels, popularity, max_popularity = build_training_rows(users_by_id, scholarships_by_id, applications, interactions)

    text_vectorizer = None
    scholarship_matrix = None
    scholarship_ids = list(scholarships_by_id.keys())
    scholarship_texts = [build_scholarship_text(scholarships_by_id[item_id]) for item_id in scholarship_ids]
    if SKLEARN_AVAILABLE and scholarship_texts:
        text_vectorizer = TfidfVectorizer(stop_words="english")
        scholarship_matrix = text_vectorizer.fit_transform(scholarship_texts)

    meta_model = train_meta_model(rows, labels)
    structured_model = train_structured_model(rows, labels)
    classifier_model = train_classifier_ensemble(rows, labels)
    evaluation = evaluate_models(rows, labels, structured_model, meta_model)
    classifier_evaluation = evaluate_classifier_model(rows, labels)

    return {
        "meta_model": meta_model,
        "structured_model": structured_model,
        "classifier_model": classifier_model,
        "text_vectorizer": text_vectorizer,
        "scholarship_matrix": scholarship_matrix,
        "scholarship_ids": scholarship_ids,
        "popularity": dict(popularity),
        "max_popularity": max_popularity,
        "training_summary": {
            "users": len(users),
            "scholarships": len(scholarships),
            "applications": len(applications),
            "interactions": len(interactions),
            "rows": len(rows),
            "sklearnEnabled": SKLEARN_AVAILABLE,
            "xgboostEnabled": XGBOOST_AVAILABLE,
            "classifierEnsembleTrained": classifier_model is not None,
            "structuredModelTrained": structured_model is not None,
            "metaModelTrained": meta_model is not None,
            "evaluation": evaluation,
            "classifierEvaluation": classifier_evaluation,
        },
    }


def save_artifacts(artifacts, output_path=ARTIFACTS_PATH):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "wb") as file_obj:
        pickle.dump(artifacts, file_obj)


def load_artifacts(path=ARTIFACTS_PATH):
    if not os.path.exists(path):
        return None
    with open(path, "rb") as file_obj:
        return pickle.load(file_obj)


def explain_reasons(user, scholarship, content_score_value, compatibility_score_value, meta_score, classifier_score=None):
    reasons = []
    if normalize_text(user.get("region")) and normalize_text(user.get("region")) == normalize_text(scholarship.get("region")):
        reasons.append("region match")
    user_skills = set(split_tokens(user.get("skills") or []))
    scholarship_skills = set(split_tokens(scholarship.get("eligibleSkills") or []))
    skill_matches = sorted(user_skills & scholarship_skills)
    if skill_matches:
        reasons.append("skills match: " + ", ".join(skill_matches[:3]))
    if normalize_text(user.get("degree")) and normalize_text(user.get("degree")) == normalize_text(scholarship.get("degree")):
        reasons.append("degree match")
    if content_score_value >= 0.35:
        reasons.append("high profile-text similarity")
    if compatibility_score_value >= 0.45:
        reasons.append("structured model predicts strong fit")
    if meta_score is not None and meta_score >= 0.55:
        reasons.append("behavior model predicts strong application likelihood")
    if classifier_score is not None and classifier_score >= 0.60:
        reasons.append("classifier ensemble predicts a likely application match")
    return reasons[:4]


def get_content_scores(user, scholarships, artifacts=None):
    user_text = build_user_text(user)
    scholarship_texts = [build_scholarship_text(item) for item in scholarships]

    if not user_text.strip():
        return [0.0 for _ in scholarships]

    if artifacts and artifacts.get("text_vectorizer") is not None and artifacts.get("scholarship_matrix") is not None:
        matrix_by_id = {scholarship_id: index for index, scholarship_id in enumerate(artifacts.get("scholarship_ids") or [])}
        user_vector = artifacts["text_vectorizer"].transform([user_text])
        scores = []
        for scholarship in scholarships:
            scholarship_id = str(scholarship.get("id") or scholarship.get("_id"))
            matrix_index = matrix_by_id.get(scholarship_id)
            if matrix_index is None:
                scores.append(0.0)
                continue
            score = cosine_similarity(user_vector, artifacts["scholarship_matrix"][matrix_index]).flatten()[0]
            scores.append(float(max(0.0, min(score, 1.0))))
        return scores

    if SKLEARN_AVAILABLE:
        vectorizer = TfidfVectorizer(stop_words="english")
        matrix = vectorizer.fit_transform([user_text, *scholarship_texts])
        similarities = cosine_similarity(matrix[0:1], matrix[1:]).flatten()
        return [float(max(0.0, min(score, 1.0))) for score in similarities]

    user_counter = Counter(split_tokens(user_text))
    user_norm = math.sqrt(sum(value * value for value in user_counter.values())) or 1.0
    scores = []
    for scholarship_text in scholarship_texts:
        scholarship_counter = Counter(split_tokens(scholarship_text))
        scholarship_norm = math.sqrt(sum(value * value for value in scholarship_counter.values())) or 1.0
        dot_product = sum(user_counter[token] * scholarship_counter[token] for token in user_counter.keys())
        scores.append(dot_product / (user_norm * scholarship_norm))
    return [float(max(0.0, min(score, 1.0))) for score in scores]


def recommend(payload, artifacts=None):
    user = payload.get("user") or {}
    scholarships = payload.get("scholarships") or []
    applications = payload.get("applications") or []
    interactions = payload.get("interactions") or []
    users = payload.get("users") or []

    if not user or not scholarships:
        return []

    users_by_id = {str(item.get("id") or item.get("_id")): item for item in users if item.get("id") or item.get("_id")}
    scholarships_by_id = {str(item.get("id") or item.get("_id")): item for item in scholarships if item.get("id") or item.get("_id")}
    rows, labels, popularity, max_popularity = build_training_rows(users_by_id, scholarships_by_id, applications, interactions)

    meta_model = artifacts.get("meta_model") if artifacts else None
    structured_model = artifacts.get("structured_model") if artifacts else None
    classifier_model = artifacts.get("classifier_model") if artifacts else None
    if meta_model is None:
        meta_model = train_meta_model(rows, labels)
    if structured_model is None:
        structured_model = train_structured_model(rows, labels)
    if classifier_model is None:
        classifier_model = train_classifier_ensemble(rows, labels)

    effective_popularity = artifacts.get("popularity") if artifacts else popularity
    effective_max_popularity = artifacts.get("max_popularity") if artifacts else max_popularity
    content = get_content_scores(user, scholarships, artifacts=artifacts)

    recommendations = []
    for index, scholarship in enumerate(scholarships):
        scholarship_id = str(scholarship.get("id") or scholarship.get("_id"))
        popularity_score = effective_popularity.get(scholarship_id, 0) / effective_max_popularity if effective_max_popularity else 0.0
        features = build_feature_vector(user, scholarship, popularity_score)
        compatibility = compatibility_score(features)
        meta_score = None
        structured_score = None
        classifier_score = predict_classifier_probability(classifier_model, features)
        if structured_model is not None:
            structured_score = float(max(0.0, min(structured_model.predict([features])[0], 1.0)))
        if meta_model is not None:
            meta_score = float(max(0.0, min(meta_model.predict([features])[0], 1.0)))
        effective_structured_score = structured_score if structured_score is not None else compatibility
        if classifier_score is not None and structured_score is not None and meta_score is not None:
            final_score = (
                0.18 * content[index]
                + 0.22 * effective_structured_score
                + 0.25 * meta_score
                + 0.35 * classifier_score
            )
        elif classifier_score is not None and structured_score is not None:
            final_score = 0.25 * content[index] + 0.35 * effective_structured_score + 0.40 * classifier_score
        elif classifier_score is not None and meta_score is not None:
            final_score = 0.22 * content[index] + 0.28 * meta_score + 0.35 * classifier_score + 0.15 * compatibility
        elif meta_score is None and structured_score is None:
            final_score = 0.42 * content[index] + 0.40 * compatibility
        elif meta_score is None:
            final_score = 0.35 * content[index] + 0.65 * effective_structured_score
        elif structured_score is None:
            final_score = 0.30 * content[index] + 0.30 * compatibility + 0.40 * meta_score
        else:
            final_score = 0.25 * content[index] + 0.35 * effective_structured_score + 0.40 * meta_score

        if structured_score is None and classifier_score is None:
            final_score = max(0.0, min(final_score + (profile_fit_adjustment(user, scholarship) * 0.35), 1.0))
        else:
            final_score = max(0.0, min(final_score, 1.0))

        recommendations.append(
            {
                **scholarship,
                "matchScore": round(final_score * 100, 2),
                "ensembleBreakdown": {
                    "contentScore": round(content[index] * 100, 2),
                    "compatibilityScore": round(effective_structured_score * 100, 2),
                    "metaModelScore": round(meta_score * 100, 2) if meta_score is not None else None,
                    "classifierScore": round(classifier_score * 100, 2) if classifier_score is not None else None,
                    "popularityScore": round(popularity_score * 100, 2),
                    "sklearnEnabled": SKLEARN_AVAILABLE,
                    "artifactBacked": bool(artifacts),
                    "structuredModelBacked": structured_score is not None,
                    "classifierEnsembleBacked": classifier_score is not None,
                },
                "reasons": explain_reasons(user, scholarship, content[index], effective_structured_score, meta_score, classifier_score),
            }
        )

    recommendations.sort(key=lambda item: item["matchScore"], reverse=True)
    return [item for item in recommendations if item["matchScore"] > 0]


def load_payload(path):
    with open(path, "r", encoding="utf-8") as file_obj:
        return json.load(file_obj)
