'use client';
import React from 'react';

import styles from '../.next/styles/Payment.module.css';
import Head from 'next/head';
export default function Payment() {
  return (
    <div className={styles.container}>
        <Head>
        <title>Payment</title>
        <meta name="description" content="Payment page" />
        </Head>
        
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <img src="/images/logo.webp" alt="Logo" />
        </a>
        <nav className={styles.navLinks}>
          <a href="/" className={styles.navLink}>
            Home
          </a>
          <a href="/cards" className={styles.navLink}>
            Cards
          </a>
          <a href="/start" className={styles.navLink}>
            Start
          </a>
          <button className={styles.signInButton}>Sign In</button>
        </nav>
      </header>

      <main>
        <section className={styles.paymentSection}>
          <h1 className={styles.paymentTitle}>Make a Payment</h1>
          {/* Add your payment processing code here */}
        </section>
      </main>

      <footer className={styles.footer}>
        {/* Footer content */}
      </footer>
    </div>
  );
}