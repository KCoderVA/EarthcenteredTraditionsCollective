/**
 * @fileoverview Authentication module for the Earthcentered Traditions Collective members area.
 * Manages client-side auth state using localStorage.
 *
 * SECURITY NOTE: This is client-side-only auth. Content protected by this module
 * is not cryptographically secure — it is protected from casual visitors only.
 * See docs/members-area.md for the auth roadmap and planned Google OAuth upgrade.
 *
 * @module auth
 */

'use strict';

// TODO(auth): Replace with Google OAuth 2.0 via Google Identity Services
// See docs/members-area.md for the upgrade plan.

/** @const {string} localStorage key for the auth token */
const AUTH_TOKEN_KEY = 'etc_auth_token';

/** @const {string} localStorage key for the user display name */
const AUTH_USER_KEY = 'etc_auth_user';

/** @const {number} Session duration in milliseconds (24 hours) */
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

/**
 * @typedef {Object} AuthUser
 * @property {string} username - The user's username
 * @property {string} displayName - The user's display name
 * @property {number} expiresAt - Unix timestamp (ms) when the session expires
 */

/**
 * Check if a user is currently authenticated.
 * Validates the stored token and checks session expiry.
 *
 * @returns {AuthUser|null} The authenticated user object, or null if not authenticated.
 */
function checkAuthState() {
  try {
    const tokenJson = localStorage.getItem(AUTH_TOKEN_KEY);

    if (!tokenJson) {
      return null;
    }

    const token = JSON.parse(tokenJson);

    if (!token || !token.username || !token.expiresAt) {
      clearAuthState();
      return null;
    }

    if (Date.now() > token.expiresAt) {
      clearAuthState();
      return null;
    }

    return {
      username: token.username,
      displayName: token.displayName || token.username,
      expiresAt: token.expiresAt,
    };
  } catch (_err) {
    clearAuthState();
    return null;
  }
}

/**
 * Redirect the current user to the members login page if not authenticated.
 * Call this at the top of every members-only page script.
 *
 * @param {string} [loginPath='/members/'] - Path to redirect unauthenticated users to.
 * @returns {boolean} True if user is authenticated (page can continue loading), false if redirected.
 */
function redirectIfNotAuth(loginPath = '/members/') {
  const user = checkAuthState();

  if (!user) {
    // Save current URL to redirect back after login
    try {
      sessionStorage.setItem('etc_redirect_after_login', window.location.pathname);
    } catch (_e) {
      // sessionStorage may not be available; continue with redirect
    }
    window.location.replace(loginPath);
    return false;
  }

  return true;
}

/**
 * Attempt to log in with provided credentials.
 * On success, stores the auth token in localStorage.
 *
 * TODO(auth): Replace this with a real authentication flow (Google OAuth, etc.)
 * The password here is intentionally simple — this is a demo/MVP auth only.
 *
 * @param {string} username - The username to authenticate with.
 * @param {string} password - The password to authenticate with.
 * @returns {{ success: boolean, error?: string, user?: AuthUser }} Login result.
 */
function login(username, password) {
  // TODO(auth): Replace with real credential validation against Google OAuth or backend
  // CAUTION: Never store real passwords in client-side code.
  // This is a placeholder for demo purposes ONLY.

  if (!username || !password) {
    return { success: false, error: 'Username and password are required.' };
  }

  // Placeholder credential check — replace with real auth
  const validUsername = 'member';
  const validPassword = 'traditions2025'; // TODO(auth): Remove this; use OAuth

  if (username.trim().toLowerCase() !== validUsername || password !== validPassword) {
    return { success: false, error: 'Invalid username or password. Please try again.' };
  }

  const user = {
    username: username.trim(),
    displayName: 'Member',
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };

  try {
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_USER_KEY, user.displayName);
  } catch (_err) {
    return { success: false, error: 'Unable to save session. Please check your browser settings.' };
  }

  return { success: true, user };
}

/**
 * Log out the current user.
 * Clears the auth token from localStorage and redirects to the homepage.
 *
 * @param {string} [redirectPath='/'] - Path to redirect to after logout.
 */
function logout(redirectPath = '/') {
  clearAuthState();
  window.location.replace(redirectPath);
}

/**
 * Clear all authentication state from localStorage.
 * @private
 */
function clearAuthState() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (_err) {
    // Ignore storage errors
  }
}

/**
 * Initialize the members portal login form and dashboard.
 * Handles form submission, error display, and dashboard rendering.
 */
function initMembersPortal() {
  const loginSection = document.getElementById('login-section');
  const dashboardSection = document.getElementById('dashboard-section');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');
  const displayNameEl = document.getElementById('display-name');
  const logoutBtn = document.getElementById('logout-btn');

  const currentUser = checkAuthState();

  if (currentUser) {
    // Show dashboard
    if (loginSection) {
      loginSection.hidden = true;
    }
    if (dashboardSection) {
      dashboardSection.hidden = false;
    }
    if (displayNameEl) {
      displayNameEl.textContent = currentUser.displayName;
    }
  } else {
    // Show login
    if (loginSection) {
      loginSection.hidden = false;
    }
    if (dashboardSection) {
      dashboardSection.hidden = true;
    }
  }

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const usernameInput = loginForm.querySelector('#username');
      const passwordInput = loginForm.querySelector('#password');
      const username = usernameInput ? usernameInput.value : '';
      const password = passwordInput ? passwordInput.value : '';

      const result = login(username, password);

      if (result.success) {
        // Redirect to saved path or dashboard
        try {
          const redirectPath = sessionStorage.getItem('etc_redirect_after_login');
          sessionStorage.removeItem('etc_redirect_after_login');
          window.location.replace(redirectPath || '/members/');
        } catch (_e) {
          window.location.replace('/members/');
        }
      } else {
        if (loginError) {
          loginError.textContent = result.error || 'Login failed. Please try again.';
          loginError.hidden = false;
        }
        if (passwordInput) {
          passwordInput.value = '';
          passwordInput.focus();
        }
      }
    });
  }

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => logout('/'));
  }
}

// Initialize portal on members/index.html
document.addEventListener('DOMContentLoaded', () => {
  const isPortalPage =
    document.getElementById('login-section') || document.getElementById('dashboard-section');

  if (isPortalPage) {
    initMembersPortal();
  } else {
    // On other members pages, enforce auth
    const isMembersPage = window.location.pathname.startsWith('/members/');

    if (isMembersPage) {
      redirectIfNotAuth('/members/');

      // Set up logout buttons on all members pages
      document.querySelectorAll('#logout-btn').forEach((btn) => {
        btn.addEventListener('click', () => logout('/'));
      });
    }
  }
});

export { checkAuthState, redirectIfNotAuth, login, logout };
