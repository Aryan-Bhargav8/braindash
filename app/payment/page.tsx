'use client';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from '../../styles/Home.module.css';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Payment() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCards = () => {
    router.push('/cards');
    setIsMenuOpen(false);
  };

  const handlePayment = () => {
    router.push('/payment');
    setIsMenuOpen(false);
  };

  const handleStart = () => {
    router.push('/start');
    setIsMenuOpen(false);
  };

  const handlePricing = () => {
    router.push('/pricing');
    setIsMenuOpen(false);
  };

  const handleSignUp = () => {
    router.push('/sign-up');
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-tertiary font-sans min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-quaternary text-primary border-2 border-primary py-6 px-4 sm:px-6 lg:px-12 mt-12 mb-12 mx-4 sm:mx-8 lg:mx-32 rounded-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <img src="/images/logo.webp" alt="Logo" className="h-10 sm:h-12 lg:h-16" />
          </div>
          <nav className="relative">
            <ul className="hidden lg:flex space-x-4">
              <li>
                <button 
                  onClick={handleCards}
                  className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
                  Cards
                </button>
              </li>
              <li>
                <button
                  onClick={handlePayment}
                  className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
                  Payment
                </button>
              </li>
              <li>
                <button
                  onClick={handleStart}
                  className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
                  Start
                </button>
              </li>
              <li>
                <SignedOut>
                  <button onClick={handleSignUp} className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg hover:scale-105">
                    SignUp
                  </button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
            <div className="lg:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            {isMenuOpen && (
              <ul className="absolute right-0 mt-2 py-2 w-48 bg-quaternary border rounded-lg shadow-xl">
                <li>
                  <button 
                    onClick={handleCards}
                    className="block px-4 py-2 text-primary hover:bg-secondary hover:text-tertiary w-full text-left">
                    Cards
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handlePayment}
                    className="block px-4 py-2 text-primary hover:bg-secondary hover:text-tertiary w-full text-left">
                    Payment
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleStart}
                    className="block px-4 py-2 text-primary hover:bg-secondary hover:text-tertiary w-full text-left">
                    Start
                  </button>
                </li>
                <li>
                  <SignedOut>
                    <button onClick={handleSignUp} className="block px-4 py-2 text-primary hover:bg-secondary hover:text-tertiary w-full text-left">
                      SignUp
                    </button>
                  </SignedOut>
                  <SignedIn>
                    <div className="px-4 py-2">
                      <UserButton />
                    </div>
                  </SignedIn>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <div className="px-4 sm:px-8 lg:px-32 mb-12">
          <div className="w-full flex items-center justify-center">
            <div className="text-center max-w-3xl">
              <h1 className="text-primary text-3xl sm:text-4xl lg:text-6xl font-bold mb-8 text-center">
                The Perfect Plan For Your Needs
              </h1>
              <p className="text-senary text-lg sm:text-xl text-center mb-8">
                Our transparent pricing makes it easy to find a plan that works within your financial constraints.
              </p>
              <img src="/images/cat-payment.png" alt="Image description" className="m-auto animate-float max-w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <section className="px-4 sm:px-8 lg:px-32 py-12">
          <h2 className="text-primary text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-12 text-center">Choose a Pricing Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {[
              { title: 'Monthly', price: '$9', period: 'per month' },
              { title: 'Quarterly', price: '$24', period: 'per quarter' },
              { title: 'Yearly', price: '$80', period: 'per year' }
            ].map((plan, index) => (
              <div key={plan.title} className={`bg-gradient-to-tr from-light to-${index === 1 ? 'septenary' : 'secondary'} bg-opacity-20 p-8 rounded-[2rem] shadow-lg flex flex-col items-center ${index === 1 ? 'border-2 border-primary' : ''}`}>
                <h3 className="text-primary font-bold text-2xl mb-4 text-center">{plan.title}</h3>
                <div className="text-4xl font-bold text-primary mb-4 text-center">{plan.price}</div>
                <img src="/images/coin-payment.png" alt="Coin" className="hover:animate-bounce" />
                <p className="text-primary mb-6 text-center text-xl">{plan.period}</p>
                <ul className="text-primary mb-8">
                  {[1, 2, 3].map((feature) => (
                    <li key={feature} className="flex items-center mb-2 justify-center">
                      <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Feature {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handlePricing}
                  className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 px-6 sm:px-8 lg:px-32 text-center mt-12 border-2 border-primary ">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-4">
            {[
              { Icon: FaFacebookF, url: 'https://www.facebook.com' },
              { Icon: FaTwitter, url: 'https://www.twitter.com' },
              { Icon: FaInstagram, url: 'https://www.instagram.com' },
            ].map(({ Icon, url }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                <Icon className="text-primary hover:text-senary" />
              </a>
            ))}
          </div>
          <p className="text-sm mt-4">
            &copy; 2023 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}