import argparse
import os

from core import ARTIFACTS_PATH, load_payload, save_artifacts, train_artifacts


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_REPORT_PATH = os.path.join(os.path.dirname(ARTIFACTS_PATH), "training_metrics.pdf")


def flatten_summary(summary, prefix=""):
    lines = []
    for key, value in summary.items():
        label = f"{prefix}{key}"
        if isinstance(value, dict):
            lines.append(f"{label}:")
            lines.extend(flatten_summary(value, prefix=f"{label}."))
        else:
            lines.append(f"{label}: {value}")
    return lines


def escape_pdf_text(value):
    return (
        str(value)
        .replace("\\", "\\\\")
        .replace("(", "\\(")
        .replace(")", "\\)")
    )


def write_simple_pdf(path, title, lines):
    page_width = 612
    page_height = 792
    start_y = 760
    line_height = 16
    usable_lines = 42

    pages = []
    for page_index in range(0, len(lines), usable_lines):
        chunk = lines[page_index:page_index + usable_lines]
        content_lines = ["BT", "/F1 12 Tf"]
        current_y = start_y
        for index, line in enumerate(chunk):
            font_size = 16 if page_index == 0 and index == 0 else 11
            content_lines.append(f"/F1 {font_size} Tf")
            content_lines.append(f"1 0 0 1 50 {current_y} Tm ({escape_pdf_text(line)}) Tj")
            current_y -= line_height
        content_lines.append("ET")
        pages.append("\n".join(content_lines).encode("latin-1", errors="replace"))

    objects = []
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    kids = " ".join(f"{3 + index * 2} 0 R" for index in range(len(pages)))
    objects.append(f"<< /Type /Pages /Count {len(pages)} /Kids [{kids}] >>".encode("latin-1"))

    font_object_number = 3 + len(pages) * 2
    for index, content in enumerate(pages):
        page_object_number = 3 + index * 2
        content_object_number = page_object_number + 1
        page_object = (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {page_width} {page_height}] "
            f"/Resources << /Font << /F1 {font_object_number} 0 R >> >> "
            f"/Contents {content_object_number} 0 R >>"
        )
        objects.append(page_object.encode("latin-1"))
        stream = b"<< /Length " + str(len(content)).encode("latin-1") + b" >>\nstream\n" + content + b"\nendstream"
        objects.append(stream)

    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")

    pdf = bytearray(b"%PDF-1.4\n")
    offsets = [0]
    for object_index, obj in enumerate(objects, start=1):
        offsets.append(len(pdf))
        pdf.extend(f"{object_index} 0 obj\n".encode("latin-1"))
        pdf.extend(obj)
        pdf.extend(b"\nendobj\n")

    xref_offset = len(pdf)
    pdf.extend(f"xref\n0 {len(objects) + 1}\n".encode("latin-1"))
    pdf.extend(b"0000000000 65535 f \n")
    for offset in offsets[1:]:
        pdf.extend(f"{offset:010} 00000 n \n".encode("latin-1"))
    pdf.extend(
        (
            f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
            f"startxref\n{xref_offset}\n%%EOF"
        ).encode("latin-1")
    )

    with open(path, "wb") as file_obj:
        file_obj.write(pdf)


def main():
    parser = argparse.ArgumentParser(description="Train and persist ScholarLens ensemble artifacts.")
    parser.add_argument("--data", default="ml_service/data/training_dataset.json", help="Path to dataset JSON.")
    parser.add_argument("--output", default=ARTIFACTS_PATH, help="Path to artifact output file.")
    parser.add_argument("--report-output", default=DEFAULT_REPORT_PATH, help="Path to metrics summary PDF.")
    args = parser.parse_args()

    data_path = args.data if os.path.isabs(args.data) else os.path.abspath(os.path.join(BASE_DIR, "..", args.data))
    output_path = args.output if os.path.isabs(args.output) else os.path.abspath(os.path.join(BASE_DIR, "..", args.output))
    report_path = args.report_output if os.path.isabs(args.report_output) else os.path.abspath(os.path.join(BASE_DIR, "..", args.report_output))

    payload = load_payload(data_path)
    artifacts = train_artifacts(payload)
    save_artifacts(artifacts, output_path)
    os.makedirs(os.path.dirname(report_path), exist_ok=True)
    report_lines = ["ScholarLens ML Training Report", *flatten_summary(artifacts["training_summary"])]
    write_simple_pdf(report_path, "ScholarLens ML Training Report", report_lines)
    print("Saved ensemble artifacts successfully.")
    print("Saved training metrics to training_metrics.pdf")
    print("Training summary:", artifacts["training_summary"])


if __name__ == "__main__":
    main()
