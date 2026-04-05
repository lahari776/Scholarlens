const DEFAULT_TIMEOUT_MS = Number(process.env.ML_REQUEST_TIMEOUT_MS || 4000);
const DEFAULT_URL = process.env.ML_SERVICE_URL || "http://127.0.0.1:8001";

async function requestMlRecommendations(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${DEFAULT_URL}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`ML service returned ${response.status}`);
    }

    const result = await response.json();
    return result.data || [];
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  requestMlRecommendations
};
