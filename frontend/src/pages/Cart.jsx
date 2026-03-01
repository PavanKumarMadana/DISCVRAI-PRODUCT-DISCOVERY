import React from 'react';
import { useCart } from '../context/CartContext';
import EmptyState from '../components/EmptyState';

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, calculateTotal } = useCart();

  if (!cartItems || cartItems.length === 0) return <EmptyState title="Your cart is empty" message="Add products to your cart to see them here." />;

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <h1>Your Cart</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {cartItems.map((it) => (
          <div key={it.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 12, background: '#fff', borderRadius: 8 }}>
            <img src={it.image} alt={it.name} style={{ width: 96, height: 72, objectFit: 'cover', borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{it.name}</div>
              <div style={{ color: '#6b7280' }}>{it.category}</div>
            </div>
            <div>
              <div style={{ fontWeight: 800 }}>${(it.price * it.qty).toFixed(2)}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <button onClick={() => decreaseQty(it.id)}>-</button>
                <div style={{ padding: '4px 8px' }}>{it.qty}</div>
                <button onClick={() => increaseQty(it.id)}>+</button>
              </div>
              <div style={{ marginTop: 8 }}>
                <button onClick={() => removeFromCart(it.id)} style={{ color: '#ef4444' }}>Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, textAlign: 'right' }}>
        <div style={{ fontSize: 18 }}>Total: <strong>${calculateTotal.toFixed(2)}</strong></div>
        <div style={{ marginTop: 12 }}>
          <button style={{ padding: '10px 16px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none' }}>Checkout</button>
        </div>
      </div>
    </div>
  );
}
