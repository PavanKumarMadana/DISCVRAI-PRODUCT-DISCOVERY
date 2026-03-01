import React from 'react';

export default function Loader({ size = 24 }) {
  const style = {
    width: size,
    height: size,
    border: '3px solid #eee',
    borderTop: '3px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    display: 'inline-block'
  };

  return <div style={style} aria-label="loading" />;
}
