import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ background: '#fff', padding: 12, borderRadius: 12, minHeight: 260, boxShadow: '0 6px 20px rgba(2,6,23,0.04)' }}>
          <div style={{ height: 140, background: '#eef2ff', borderRadius: 8, marginBottom: 8 }} />
          <div style={{ height: 12, width: '60%', background: '#f3f4f6', marginBottom: 6 }} />
          <div style={{ height: 12, width: '40%', background: '#f3f4f6' }} />
        </div>
      ))}
    </div>
  );
}
