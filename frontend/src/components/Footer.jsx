import React from 'react';

export default function Footer() {
  return (
    <footer style={{ marginTop: 36, padding: '20px 0', textAlign: 'center', color: '#6b7280' }}>
      <div>© {new Date().getFullYear()} Discvrai — Built with ❤️</div>
    </footer>
  );
}
