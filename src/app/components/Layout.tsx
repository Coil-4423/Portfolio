// src/components/Layout.tsx

import React from 'react';
import Header from './Header';
import RandomBackground from './RandomBackground';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;