// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <h2>AV Computers</h2>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
