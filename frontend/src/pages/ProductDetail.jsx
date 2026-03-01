import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((r) => {
        if (!r.ok) throw new Error('Product not found');
        return r.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message || String(err)))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!product) return null;

  return (
    <div className="site-container">
      <div style={{ marginBottom: 12 }}>
        <Link to="/" style={{ color: '#2563eb' }}>← Back to products</Link>
      </div>

      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 420px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', maxHeight: 420, objectFit: 'cover', borderRadius: 8 }} />
        </div>

        <div style={{ flex: '1 1 360px' }}>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>
          <div style={{ color: '#6b7280', marginBottom: 12 }}>{product.category} • <span style={{ fontWeight: 800, color: '#0f172a' }}>${product.price}</span></div>
          <p style={{ color: '#374151' }}>{product.description}</p>

          <div style={{ marginTop: 12 }}>
            <button style={{ background: '#2563eb', color: '#fff', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', marginRight: 8 }}>Add to cart</button>
            <button style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>Save</button>
          </div>

          {product.tags && (
            <div style={{ marginTop: 14, color: '#6b7280' }}>
              <strong>Tags:</strong> {product.tags.join(', ')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
