import React from 'react';

export default function ErrorMessage({ message }) {
  if (!message) return null;
  return (
    <div className="error-message" role="alert" style={{ color: '#b00020', marginTop: 8 }}>
      {message}
    </div>
  );
}
