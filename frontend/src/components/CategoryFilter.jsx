import React from 'react';

export default function CategoryFilter({ categories = [], active, onChange }) {
  if (!categories || categories.length === 0) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
      <button onClick={() => onChange(null)} style={{ padding: '6px 10px', borderRadius: 999, border: active ? '2px solid #2563eb' : '1px solid #e5e7eb', background: active ? '#eef2ff' : '#fff' }}>All</button>
      {categories.map((c) => (
        <button key={c} onClick={() => onChange(c)} style={{ padding: '6px 10px', borderRadius: 999, border: active === c ? '2px solid #2563eb' : '1px solid #e5e7eb', background: active === c ? '#eef2ff' : '#fff' }}>{c}</button>
      ))}
    </div>
  );
}
