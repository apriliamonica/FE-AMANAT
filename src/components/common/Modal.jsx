import React from 'react';

export default function Modal({ title, children, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{ background: '#fff', padding: 20, borderRadius: 8, width: 560 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>{title}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
