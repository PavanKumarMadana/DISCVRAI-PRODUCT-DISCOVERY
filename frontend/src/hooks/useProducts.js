import { useState, useEffect, useMemo, useCallback } from 'react';
import api from '../api/api';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // AI ask state
  const [askLoading, setAskLoading] = useState(false);
  const [askError, setAskError] = useState(null);
  const [askResult, setAskResult] = useState({ products: [], summary: '' });

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api.fetchProducts()
      .then((data) => mounted && setProducts(data || []))
      .catch((err) => mounted && setError(err.message || String(err)))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, []);

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => p.category && set.add(p.category));
    return Array.from(set);
  }, [products]);

  const ask = useCallback(async (query) => {
    setAskLoading(true);
    setAskError(null);
    setAskResult({ products: [], summary: '' });
    try {
      const json = await api.askBackend(query);
      setAskResult({ products: json.products || [], summary: json.summary || '' });
      return json;
    } catch (err) {
      setAskError(err.message || String(err));
      return null;
    } finally {
      setAskLoading(false);
    }
  }, []);

  return {
    products,
    loading,
    error,
    categories,
    ask,
    askLoading,
    askError,
    askResult,
    setAskResult
  };
}
