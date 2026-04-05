# ScholarLens Ensemble ML Service

## What it does
This service scores scholarships with an ensemble of:
- content similarity between the user profile text and scholarship text
- structured compatibility features such as region, degree, category, skills, and interests
- a learned tree-based model when `scikit-learn` is installed
- interaction history such as saves, recommendation clicks, detail clicks, and applies

If `scikit-learn` is not installed, the service still runs with the first two ensemble components.

## Install
```powershell
python -m pip install -r ml_service/requirements.txt
```

## Run only the ML service
```powershell
npm run start:ml
```

## Run the whole project with ML
```powershell
npm run start:full
```

## Backend integration
The backend recommendation route calls `http://127.0.0.1:8001/recommend` by default.

Optional environment variables:

```env
ML_SERVICE_URL=http://127.0.0.1:8001
ML_REQUEST_TIMEOUT_MS=4000
ML_SERVICE_HOST=127.0.0.1
ML_SERVICE_PORT=8001
```

If the ML service is unavailable, the backend falls back to the original JavaScript recommendation logic.

## Export training data from MongoDB
```powershell
npm run export:ml-data
```

This creates `ml_service/data/training_dataset.json`.

## Train and persist artifacts
```powershell
npm run train:ml
```

This creates `ml_service/artifacts/ensemble_artifacts.pkl`.

When the ML service starts, it loads those artifacts automatically if they exist. If not, it falls back to live in-memory fitting.

## Seed sample data
```powershell
npm run seed:sample-data
```

This creates sample scholarships, student users, interactions, applications, and notifications so the recommender has meaningful data to learn from.
