import React from 'react';

export default function Header() {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 18 }}></h1>
      </div>
      <div>{/* future: user menu, notifications */}</div>
    </header>
  );
}
