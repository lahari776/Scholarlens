function normalizeApiBaseUrl(value) {
  if (!value) {
    return null;
  }

  const trimmed = String(value).trim().replace(/\/+$/, "");
  if (!trimmed) {
    return null;
  }

  return trimmed.endsWith("/api") ? trimmed : `${trimmed}/api`;
}

function getDefaultApiBaseUrl() {
  const host = window.location.hostname || "localhost";
  const protocol = window.location.protocol === "https:" ? "https:" : "http:";
  return `${protocol}//${host}:5000/api`;
}

function resolveApiBaseUrl() {
  const fromGlobal =
    window.SCHOLARLENS_API_BASE_URL ||
    window.__SCHOLARLENS_CONFIG__?.API_BASE_URL ||
    window.REACT_APP_API_URL ||
    window.VITE_API_BASE_URL;
  const fromStorage = localStorage.getItem("SCHOLARLENS_API_BASE_URL");

  return normalizeApiBaseUrl(fromGlobal) || normalizeApiBaseUrl(fromStorage) || getDefaultApiBaseUrl();
}

const API_BASE_URL = resolveApiBaseUrl();
const SESSION_STORAGE_KEY = "scholarlens-session";

function getStoredSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_STORAGE_KEY)) || { loggedIn: false, role: null };
  } catch {
    return { loggedIn: false, role: null };
  }
}

function storeSession(session) {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

function clearStoredSession() {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}

async function apiRequest(path, options = {}) {
  const session = getStoredSession();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (session.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers
  });

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(payload?.message || "Request failed");
    error.status = response.status;
    error.payload = payload;

    if (response.status === 401) {
      clearStoredSession();
    }

    throw error;
  }

  return payload;
}

async function signupUser(data) {
  return apiRequest("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function loginUser(data) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function fetchScholarships() {
  return apiRequest("/scholarships");
}

async function fetchScholarshipById(id) {
  return apiRequest(`/scholarships/${id}`);
}

async function createScholarship(data) {
  return apiRequest("/scholarships", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function updateScholarship(id, data) {
  return apiRequest(`/scholarships/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

async function deleteScholarship(id) {
  return apiRequest(`/scholarships/${id}`, {
    method: "DELETE"
  });
}

async function trackInteraction(data) {
  return apiRequest("/interactions", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function applyForScholarship(data) {
  return apiRequest("/applications/apply", {
    method: "POST",
    body: JSON.stringify(data)
  });
}

async function fetchUserApplications(userId) {
  return apiRequest(`/applications/user/${userId}`);
}

async function fetchRecommendations(userId) {
  return apiRequest(`/recommendations/${userId}`);
}

async function fetchNotifications(userId) {
  return apiRequest(`/notifications/${userId}`);
}

async function fetchProfile() {
  return apiRequest("/auth/profile");
}

async function updateProfile(data) {
  return apiRequest("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(data)
  });
}

async function fetchAdminUsers() {
  return apiRequest("/auth/users");
}

async function fetchAdminStats() {
  return apiRequest("/auth/admin/stats");
}

window.ScholarLensAPI = {
  API_BASE_URL,
  getSession: getStoredSession,
  setSession: storeSession,
  clearSession: clearStoredSession,
  signupUser,
  loginUser,
  fetchScholarships,
  fetchScholarshipById,
  createScholarship,
  updateScholarship,
  deleteScholarship,
  trackInteraction,
  applyForScholarship,
  fetchUserApplications,
  fetchRecommendations,
  fetchNotifications,
  fetchProfile,
  updateProfile,
  fetchAdminUsers,
  fetchAdminStats
};


