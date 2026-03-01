import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react';

const CartContext = createContext(null);

const initial = { items: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return { items: state.items.map((it) => it.id === action.item.id ? { ...it, qty: it.qty + 1 } : it) };
      }
      return { items: [...state.items, { ...action.item, qty: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) };
    case 'INCREASE':
      return { items: state.items.map((i) => i.id === action.id ? { ...i, qty: i.qty + 1 } : i) };
    case 'DECREASE':
      return { items: state.items.map((i) => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i) };
    case 'SET':
      return { items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial, (init) => {
    try {
      const raw = localStorage.getItem('discrai_cart');
      return raw ? { items: JSON.parse(raw) } : init;
    } catch {
      return init;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('discrai_cart', JSON.stringify(state.items)); } catch {}
  }, [state.items]);

  const addToCart = (item) => dispatch({ type: 'ADD', item });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id });
  const increaseQty = (id) => dispatch({ type: 'INCREASE', id });
  const decreaseQty = (id) => dispatch({ type: 'DECREASE', id });

  const calculateTotal = useMemo(() => {
    return state.items.reduce((s, it) => s + (it.price || 0) * (it.qty || 0), 0);
  }, [state.items]);

  const value = { cartItems: state.items, addToCart, removeFromCart, increaseQty, decreaseQty, calculateTotal };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
