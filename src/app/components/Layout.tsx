// src/components/Layout.tsx

import React from 'react';
import Header from './Header';
import RandomBackground from './RandomBackground';
import Footer from './Footer'


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
        {children}
      <Footer/>
    </>
  );
};

export default Layout;