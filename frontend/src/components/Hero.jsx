import React from 'react';

export default function Hero({ onCta }) {
  return (
    <section style={{ borderRadius: 12, padding: '36px 18px', marginBottom: 18, background: 'linear-gradient(90deg,#eef2ff,#f8fafc)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: 34, margin: '0 0 8px 0' }}>Find the right products — faster with AI</h1>
        <p style={{ margin: '0 0 18px 0', color: '#374151', fontSize: 16 }}>Ask in plain language and get tailored product matches, summaries, and recommendations powered by LLMs.</p>
        <div>
          <button onClick={onCta} style={{ padding: '10px 18px', borderRadius: 10, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 700 }}>Try AI Search</button>
        </div>
      </div>
    </section>
  );
}
