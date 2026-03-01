import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  if (!product) return null;
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="product-card">
      <div style={{ height: 220, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
        {product.image && !imageError ? (
          <img 
            className="card-image" 
            src={product.image} 
            alt={product.name} 
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            onError={handleImageError}
          />
        ) : (
          <div style={{ textAlign: 'center', color: '#999', fontSize: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📷</div>
            <div>Image not available</div>
          </div>
        )}
      </div>

      <div className="card-body">
        <div className="product-name">{product.name}</div>
        <div className="product-meta">
          {product.category}
          <span className="product-price">${product.price}</span>
        </div>
        <p style={{ marginTop: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{product.description}</p>
        <div style={{ marginTop: 10 }}>
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); }} style={{ padding: '8px 12px', borderRadius: 8, background: '#111827', color: '#fff', border: 'none', cursor: 'pointer' }}>Add to cart</button>
        </div>
      </div>
      </div>
    </Link>
  );
}
