const API_BASE = "http://localhost:5001/api";

function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChange"));
}

export function logout() {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange"));
}

export function isAuthenticated() {
  return !!getToken();
}

async function request(path, options = {}) {
  const headers = options.headers || {};

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
}

// PRODUCTS
export async function getProducts() {
  return request("/products", {
    method: "GET",
  });
}

// ORDERS
export async function createOrder(orderData) {
  return request("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
}

export default {
  getProducts,
  saveToken,
  logout,
  createOrder,
  isAuthenticated,
};