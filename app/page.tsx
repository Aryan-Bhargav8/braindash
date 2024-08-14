// // pages/index.js

// import React from 'react';
// import Head from 'next/head';
// import Link from 'next/link';
// // import "./globals.css";
// // import '../.next/static/css/app/layout.css'
// import styles from '../.next/styles/Home.module.css';


// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <header className={styles.header}>
//         <a href="/" className={styles.logo}>
//           <img src="/images/logo.webp" alt="Logo" />
//         </a>
//         <nav className={styles.navLinks}>
//           <a href="/cards" className={styles.navLink}>
//             Cards
//           </a>
//           <a href="/payment" className={styles.navLink}>
//             Payment
//           </a>
//           <a href="/start" className={styles.navLink}>
//             Start
//           </a>
//           <button className={styles.signInButton}>Sign In</button>
//         </nav>
//       </header>

//       <main>
//         <section className={styles.heroSection}>
//           <div className={styles.heroText}>
//             <h1 className={styles.heroTitle}>Unlock Your Financial Potential</h1>
//             <p className={styles.heroDescription}>
//               Our cutting-edge platform empowers you to take control of your finances and achieve your goals.
//             </p>
//             {/* Add any call-to-action buttons or links here */}
//           </div>
//           <div className={styles.heroImage}>
//             <img src="/images/hero-cat.jpg" alt="Hero Image" />
//           </div>
//         </section>

//         {/* Add more sections as needed */}
//       </main>

//       <footer className={styles.footer}>
//         {/* Footer content */}
//       </footer>
//     </div>
//   );
// }

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router= useRouter();
  const Handelgetstart= async () =>{
    router.push('/payment')  }
  return (
    <div>
      <div className="h-[100vh] w-full dark:bg-black  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look /}
      {/ <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div> */}
      <h1>Hello World</h1>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-200 py-8">
        Backgrounds
      </p>
      <button onClick={Handelgetstart}>pages</button>
    </div>
    <div className="h-[500vh] text-white">
        <p>Hello</p>
        <button onClick={Handelgetstart}>pages</button>
    </div>
    </div>



  );
}