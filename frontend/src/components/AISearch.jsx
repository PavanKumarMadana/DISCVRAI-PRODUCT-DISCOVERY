import React, { useState, useRef } from 'react';
import LoadingSkeleton from './LoadingSkeleton';

export default function AISearch({ onResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState('');
  const inputRef = useRef(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      setError('Please enter a search query');
      return;
    }

    setLoading(true);
    setError(null);
    setSummary('');

    try {
      console.log('🔍 Sending AI search query:', query);
      
      const res = await fetch('http://localhost:5000/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      console.log('✅ AI Response:', data);

      if (!res.ok) {
        throw new Error(data.error || data.message || 'AI request failed');
      }

      setSummary(data.summary || 'No summary available');
      onResults && onResults(data.products || []);

    } catch (err) {
      console.error('❌ AI Search Error:', err);
      setError(err.message || 'Failed to search. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    setSummary('');
    setError(null);
    onResults && onResults([]);
  };

  return (
    <div style={{ marginBottom: 18, padding: '16px', background: '#f9fafb', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          ref={inputRef}
          className="search-input"
          placeholder="Ask AI about products (e.g., 'best budget laptops for students')"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={loading}
          style={{
            padding: '10px 18px',
            borderRadius: 8,
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            fontWeight: 600
          }}
        >
          {loading ? 'Searching...' : 'Try AI Search'}
        </button>
        <button className="search-btn" onClick={handleClear}>Clear</button>
      </div>

      {loading && <div style={{ marginTop: 12 }}><LoadingSkeleton /></div>}

      {error && <div style={{ color: '#dc2626', marginTop: 12, padding: '10px', background: '#fee2e2', borderRadius: '6px' }}>{error}</div>}

      {summary && (
        <div className="ai-summary" style={{ marginTop: 12, padding: '12px', background: '#dbeafe', borderLeft: '4px solid #2563eb', borderRadius: '4px' }}>
          <strong>🤖 AI Summary</strong>
          <div style={{ marginTop: 8, color: '#1e40af' }}>{summary}</div>
        </div>
      )}
    </div>
  );
}
