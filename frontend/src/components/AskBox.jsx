import React, { useState } from 'react';

export default function AskBox({ onAsk, loading, error, result }) {
  const [query, setQuery] = useState('');

  const submit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    if (!query) return;
    await onAsk(query);
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <form onSubmit={submit} className="search-row">
        <input
          className="search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about products, e.g. 'budget laptops for students'"
        />
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <div className="error-message" style={{ marginTop: 8 }}>{error}</div>}

      {result && result.summary && (
        <div className="ai-summary">
          <strong>AI Summary:</strong>
          <div style={{ marginTop: 6 }}>{result.summary}</div>
        </div>
      )}
    </div>
  );
}
