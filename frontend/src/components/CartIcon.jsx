import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { cartItems } = useCart();
  const count = cartItems.reduce((s, i) => s + (i.qty || 0), 0);

  return (
    <div style={{ position: 'relative' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="20" r="1" fill="#111827" />
        <circle cx="18" cy="20" r="1" fill="#111827" />
      </svg>
      {count > 0 && (
        <span style={{ position: 'absolute', top: -6, right: -8, background: '#ef4444', color: '#fff', borderRadius: 999, padding: '2px 6px', fontSize: 12, fontWeight: 700 }}>{count}</span>
      )}
    </div>
  );
}
