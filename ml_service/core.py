import json
import math
import os
import pickle
from collections import Counter, defaultdict

try:
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity

    SKLEARN_AVAILABLE = True
except ImportError:
    RandomForestRegressor = None
    TfidfVectorizer = None
    cosine_similarity = None
    SKLEARN_AVAILABLE = False


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

    return {
        "meta_model": meta_model,
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
            "metaModelTrained": meta_model is not None,
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


def explain_reasons(user, scholarship, content_score_value, compatibility_score_value, meta_score):
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
        reasons.append("strong structured compatibility")
    if meta_score is not None and meta_score >= 0.55:
        reasons.append("learned model predicts strong application likelihood")
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
    if meta_model is None:
        meta_model = train_meta_model(rows, labels)

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
        if meta_model is not None:
            meta_score = float(max(0.0, min(meta_model.predict([features])[0], 1.0)))
        if meta_score is None:
            final_score = 0.42 * content[index] + 0.40 * compatibility
        else:
            final_score = 0.25 * content[index] + 0.35 * compatibility + 0.40 * meta_score

        final_score = max(0.0, min(final_score + profile_fit_adjustment(user, scholarship), 1.0))

        recommendations.append(
            {
                **scholarship,
                "matchScore": round(final_score * 100, 2),
                "ensembleBreakdown": {
                    "contentScore": round(content[index] * 100, 2),
                    "compatibilityScore": round(compatibility * 100, 2),
                    "metaModelScore": round(meta_score * 100, 2) if meta_score is not None else None,
                    "popularityScore": round(popularity_score * 100, 2),
                    "sklearnEnabled": SKLEARN_AVAILABLE,
                    "artifactBacked": bool(artifacts),
                },
                "reasons": explain_reasons(user, scholarship, content[index], compatibility, meta_score),
            }
        )

    recommendations.sort(key=lambda item: item["matchScore"], reverse=True)
    return [item for item in recommendations if item["matchScore"] > 0]


def load_payload(path):
    with open(path, "r", encoding="utf-8") as file_obj:
        return json.load(file_obj)
