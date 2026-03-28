(function attachScholarLensAuth() {
  const STORAGE_KEY = "scholarlens-session";

  function rerenderAuthUi() {
    if (typeof window.renderNav === "function") {
      window.renderNav();
    }

    if (typeof window.renderSidebar === "function") {
      window.renderSidebar();
    }
  }

  function getSession() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { loggedIn: false, role: null };
    } catch {
      return { loggedIn: false, role: null };
    }
  }

  function setSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    window.dispatchEvent(new CustomEvent("scholarlens:auth-changed", { detail: session }));
  }

  function clearSession() {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("scholarlens:auth-changed", { detail: { loggedIn: false, role: null } }));
  }

  function isLoggedIn() {
    return Boolean(getSession().token);
  }

  function logout() {
    clearSession();
    window.location.href = "login.html";
  }

  function requireRole(requiredRole) {
    const session = getSession();

    if (!requiredRole) {
      return true;
    }

    if (!session.loggedIn || !session.token) {
      window.location.href = "login.html";
      return false;
    }

    if (requiredRole !== session.role) {
      window.location.href = session.role === "admin" ? "admin.html" : "dashboard.html";
      return false;
    }

    return true;
  }

  window.ScholarLensAuth = {
    STORAGE_KEY,
    getSession,
    setSession,
    clearSession,
    isLoggedIn,
    logout,
    requireRole
  };

  window.addEventListener("scholarlens:auth-changed", rerenderAuthUi);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      rerenderAuthUi();
    }
  });
})();
