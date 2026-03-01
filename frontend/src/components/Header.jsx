import React from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from './CartIcon';

export default function Header() {
  return (
    <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 40, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, width: '100%' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <div className="brand">Discvrai</div>
          <nav style={{ display: 'flex', gap: 12 }}>
            <NavLink to="/" end style={({isActive}) => ({ color: isActive ? '#2563eb' : '#374151', textDecoration: 'none', fontWeight: 600 })}>Home</NavLink>
            <NavLink to="/" style={({isActive}) => ({ color: isActive ? '#2563eb' : '#374151', textDecoration: 'none', fontWeight: 600 })}>Categories</NavLink>
            <NavLink to="/about" style={({isActive}) => ({ color: isActive ? '#2563eb' : '#374151', textDecoration: 'none', fontWeight: 600 })}>About</NavLink>
          </nav>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <NavLink to="/cart" style={{ textDecoration: 'none' }}>
            <CartIcon />
          </NavLink>
        </div>
      </div>
    </header>
  );
}
