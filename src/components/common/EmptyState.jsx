import React from 'react';

export default function EmptyState({
  title = 'Kosong',
  message = 'Belum ada data',
}) {
  return (
    <div
      style={{
        padding: 20,
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 6px 18px rgba(2,6,23,0.04)',
      }}
    >
      <h4>{title}</h4>
      <p style={{ color: '#6b7280' }}>{message}</p>
    </div>
  );
}
