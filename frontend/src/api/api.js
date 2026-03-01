// Centralized API helpers with configurable base URL.
const BASE = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');
if (process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL) {
  console.warn(
    'Warning: REACT_APP_API_URL is not set. API calls may fail in production. ' +
    'Set it to the full URL of your backend API server. ' +
    'For example: https://your-api.onrender.com'
  );
}
const makeUrl = (path) => (BASE ? `${BASE}${path}` : path);

async function parseJsonOrThrow(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch (err) {
    // If the server returned HTML (index.html or error page), include a short snippet
    const snippet = text && text.length ? text.slice(0, 300).replace(/\n/g, ' ') : '';
    throw new Error(`Invalid JSON response: ${snippet}`);
  }
}

export async function fetchProducts() {
  const res = await fetch(makeUrl('/api/products'));
  if (!res.ok) throw new Error('Failed to fetch products');
  return parseJsonOrThrow(res);
}

export async function fetchProductById(id) {
  const res = await fetch(makeUrl(`/api/products/${id}`));
  if (!res.ok) throw new Error('Product not found');
  return parseJsonOrThrow(res);
}

export async function askBackend(query) {
  const res = await fetch(makeUrl('/api/ask'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  if (!res.ok) {
    // try to parse JSON error, otherwise include text
    const bodyText = await res.text().catch(() => '');
    let body;
    try { body = JSON.parse(bodyText); } catch (e) { body = null; }
    throw new Error((body && body.error) || res.statusText || `LLM request failed: ${bodyText.slice(0,200)}`);
  }
  return parseJsonOrThrow(res);
}

const api = { fetchProducts, fetchProductById, askBackend };

export default api;
