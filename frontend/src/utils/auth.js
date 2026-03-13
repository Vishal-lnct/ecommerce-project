
// src/utils/auth.js

export const saveTokens = (tokens) => {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const authFetch = async (url, options = {}) => {
  const token = getAccessToken();

  const headers = options.headers ? { ...options.headers } : {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  headers["Content-Type"] = headers["Content-Type"] || "application/json";

  const response = await fetch(url, { ...options, headers });

  // ⚠️ Do NOT immediately clear tokens
  // Just return response so caller can handle it

  return response;
};

