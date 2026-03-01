import React from 'react';

export default function EmptyState({ title = 'No items', message }) {
  return (
    <div style={{ textAlign: 'center', padding: 28 }}>
      <div style={{ fontSize: 20, fontWeight: 700 }}>{title}</div>
      {message && <div style={{ marginTop: 8, color: '#6b7280' }}>{message}</div>}
    </div>
  );
}
