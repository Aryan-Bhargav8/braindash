'use client';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
// import { Link, useLocation } from 'react-router-dom';
import styles from '../../styles/Home.module.css';
import {
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Payment() {
  const router = useRouter();
  // const location = useLocation();

  const handleCards = async () => {
    router.push('/cards');
  };

  const handlePayment = async () => {
    router.push('/payment');
  };

  const handleStart = async () => {
    router.push('/start');
  };


  const handlePricing = async () => {
    router.push('/pricing');
  };
  const handleSignUp = async () => {
    router.push('/sign-up');

  };
  return (
    <div className="bg-tertiary font-sans">
  {/* Header */}
  <header className="bg-quaternary text-primary border-2 border-primary py-6 px-12 mt-12 mb-12 mx-32 rounded-lg">
    <div className="container bg-quaternary mx-auto flex justify-between items-center">
      <div>
        <img src="/images/logo.webp" alt="Logo" className="h-16" />
      </div>
      <nav>
        <ul className="flex space-x-4">
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
            className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary  "
            >
              Payment
            </button>
          </li>
          <li>
            <button
              onClick={handleStart}
              className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary"
            >
              Start
            </button>
          </li>
          <li>
          <SignedOut>
                <button  onClick={handleSignUp} className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary  px-6 py-3 rounded-lg hover:scale-105">
                    SignUp
                </button>
                </SignedOut>
                <SignedIn>
                  <UserButton />
            </SignedIn>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <div className="h-[calc(100vh-4rem)] bg-gradient-to-r   px-32">
      <div className="w-full 2 flex items-center justify-center">
      <div className="text-center max-w-3xl px-4 md:px-0">
      <h1 className="text-primary text-3xl sm:text-6xl font-bold text-white mb-8 text-center">
        The Perfect Plan For Your Needs
      </h1>
      <p className="text-senary text-xl text-center mb-8">
        Our transparent pricing makes it easy to find a plan that works within your financial constraints.
      </p>
      <img src="/images/cat-payment.png" alt="Image description" className="m-auto animate-float" />
      
    </div>
  </div>
  
      </div>

  {/* Pricing Section */}
  <section className="px-32 py-12">
    <h2 className="text-primary text-3xl sm:text-6xl font-bold text-white mb-12 text-center">Choose a Pricing Plan</h2>
    <div className="grid grid-cols-3 gap-12 mt-8">
      <div className="bg-gradient-to-tr from-light to-secondary bg-opacity-20 p-12 rounded-[2rem] shadow-lg flex flex-col items-center">
        
        <h3 className="text-primary font-bold text-center text-2xl mb-4">Monthly</h3>
        <div className="text-4xl font-bold text-center text-primary mb-4">$9</div>
        <img src="/images/coin-payment.png" alt="Coin" className='hover:animate-bounce' />
        <p className="text-primary mb-6 text-center text-xl">per month</p>
        <ul className="text-primary mb-8 ">
          <li className="flex items-center justify-center mb-2">
            <svg className="w-6 h-6  mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 1
          </li>
          <li className="flex items-center mb-2 justify-center ">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 2
          </li>
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 3
          </li>
        </ul>
        <button
        onClick={handlePricing}
        className="bg-primary  font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
        Get Started
        </button>
      </div>

      <div className="bg-gradient-to-br from-light to-septenary bg-opacity-75 p-12 rounded-[2rem] shadow-lg border-2 border-primary flex flex-col items-center">
        <h3 className="text-primary font-bold text-2xl mb-4 text-center">Quarterly</h3>
        <div className="text-4xl font-bold text-primary mb-4 text-center">$24</div>
        <img src="/images/coin-payment.png" alt="Coin" className='hover:animate-bounce' />
        <p className="text-primary mb-6 text-center text-xl">per quarter</p>
        <ul className="text-primary mb-8">
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 1
          </li>
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 2
          </li>
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 3
          </li>
        </ul>
        <button
        onClick={handlePricing}
        className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
          Get Started
        </button>
      </div>

      <div className="bg-gradient-to-tl from-orange to-secondary bg-opacity-20 p-12 rounded-[2rem] shadow-lg flex flex-col items-center">
        <h3 className="text-primary font-bold text-2xl mb-4 text-center">Yearly</h3>
        <div className="text-4xl font-bold text-primary mb-4 text-center">$90</div>
        <img src="/images/coin-payment.png" alt="Coin" className='hover:animate-bounce' />
        <p className="text-primary mb-6 text-center text-xl">per year</p>
        <ul className="text-primary mb-8">
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 1
          </li>
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 2
          </li>
          <li className="flex items-center mb-2 justify-center">
            <svg className="w-6 h-6 mr-2 text-senary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Feature 3
          </li>
        </ul>
        <button
        onClick={handlePricing}
        className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
        Get Started
        </button>
      </div>
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-primary text-white py-6 px-32 ">
    <div className="flex justify-between items-center mb-4">
      <div>
        {/* Logo goes here */}
        <img src="/images/logo.webp" alt="BRAINDASH" className="h-16 w-full" />
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* Social media icons */}
        <a href="#" className="text-tertiary hover:text-secondary mr-4">
          <FaFacebookF className="text-2xl"/>
        </a>
        <a href="#" className="text-tertiary hover:text-secondary mr-4">
          <FaTwitter className="text-2xl"/>
        </a>
        <a href="#" className="text-tertiary hover:text-secondary">
          <FaInstagram className="text-2xl"/>
        </a>
      </div>
    </div>
    <p className="text-center text-tertiary">© 2024 BRAINDASH. All rights reserved.</p>
  </footer>
</div>
  );
}