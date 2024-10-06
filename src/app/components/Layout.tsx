import React from 'react';
import Header from './Header';
import Footer from './Footer';
import styles from "@/app/css/Layout.module.css"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={styles.layout}
    >
      <Header />
        {children}
      <Footer />
    </div>
  );
};

export default Layout;
