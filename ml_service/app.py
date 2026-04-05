import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from core import SKLEARN_AVAILABLE, load_artifacts, recommend


class RecommendationHandler(BaseHTTPRequestHandler):
    def _send_json(self, status_code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/health":
            self._send_json(
                200,
                {
                    "success": True,
                    "service": "scholarlens-ensemble-ml",
                    "sklearnEnabled": SKLEARN_AVAILABLE,
                    "artifactsLoaded": self.server.artifacts is not None,
                },
            )
            return

        self._send_json(404, {"success": False, "message": "Route not found"})

    def do_POST(self):
        if self.path != "/recommend":
            self._send_json(404, {"success": False, "message": "Route not found"})
            return

        try:
            content_length = int(self.headers.get("Content-Length", "0"))
            raw_body = self.rfile.read(content_length)
            payload = json.loads(raw_body.decode("utf-8") or "{}")
            self._send_json(200, {"success": True, "data": recommend(payload, artifacts=self.server.artifacts)})
        except Exception as error:
            self._send_json(500, {"success": False, "message": str(error)})


def main():
    host = os.getenv("ML_SERVICE_HOST", "127.0.0.1")
    port = int(os.getenv("ML_SERVICE_PORT", "8001"))
    server = ThreadingHTTPServer((host, port), RecommendationHandler)
    server.artifacts = load_artifacts()
    print(f"ScholarLens ensemble ML service running on http://{host}:{port}")
    print(f"scikit-learn enabled: {SKLEARN_AVAILABLE}")
    print(f"pretrained artifacts loaded: {server.artifacts is not None}")
    server.serve_forever()


if __name__ == "__main__":
    main()
