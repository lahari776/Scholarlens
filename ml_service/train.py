import argparse
import os

from core import ARTIFACTS_PATH, load_payload, save_artifacts, train_artifacts


BASE_DIR = os.path.dirname(os.path.abspath(__file__))


def main():
    parser = argparse.ArgumentParser(description="Train and persist ScholarLens ensemble artifacts.")
    parser.add_argument("--data", default="ml_service/data/training_dataset.json", help="Path to dataset JSON.")
    parser.add_argument("--output", default=ARTIFACTS_PATH, help="Path to artifact output file.")
    args = parser.parse_args()

    data_path = args.data if os.path.isabs(args.data) else os.path.abspath(os.path.join(BASE_DIR, "..", args.data))
    output_path = args.output if os.path.isabs(args.output) else os.path.abspath(os.path.join(BASE_DIR, "..", args.output))

    payload = load_payload(data_path)
    artifacts = train_artifacts(payload)
    save_artifacts(artifacts, output_path)
    print("Saved ensemble artifacts successfully.")
    print("Training summary:", artifacts["training_summary"])


if __name__ == "__main__":
    main()
