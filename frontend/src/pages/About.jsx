import React from 'react';

export default function About() {
  return (
    <div style={{ maxWidth: 760, margin: '40px auto', textAlign: 'center' }}>
      <h1>About Discvrai</h1>
      <p style={{ color: '#6b7280' }}>Discvrai is a demo AI-powered product discovery platform that helps users find products using natural language. It combines a small product catalog with an LLM-backed search endpoint to provide concise recommendations and summaries.</p>
      <p style={{ color: '#6b7280' }}>This demo showcases backend API design, frontend UI, React context for cart management, and basic LLM integration for natural language understanding.</p>
    </div>
  );
}
