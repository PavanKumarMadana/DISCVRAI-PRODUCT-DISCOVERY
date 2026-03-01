import React, { useState } from 'react';
import Hero from '../components/Hero';
import AISearch from '../components/AISearch';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import useProducts from '../hooks/useProducts';
import LoadingSkeleton from '../components/LoadingSkeleton';

export default function Home() {
  const { products, loading, error, categories, setAskResult } = useProducts();
  const [activeCat, setActiveCat] = useState(null);
  const [filtered, setFiltered] = useState([]);

  const handleResults = (res) => {
    setFiltered(res);
  };

  const visible = filtered && filtered.length ? filtered : (activeCat ? products.filter((p) => p.category === activeCat) : products);

  return (
    <div>
      <Hero onCta={() => { const el = document.getElementById('ai-search'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} />

      <div id="ai-search" style={{ marginBottom: 12 }}>
        <AISearch onResults={handleResults} />
      </div>

      <CategoryFilter categories={categories} active={activeCat} onChange={(c) => { setActiveCat(c); setFiltered([]); setAskResult({ products: [], summary: '' }); }} />

      {loading ? <LoadingSkeleton /> : error ? <div style={{ color: 'red' }}>{error}</div> : <ProductGrid products={visible} />}
    </div>
  );
}

