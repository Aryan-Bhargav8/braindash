'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from '../../styles/Home.module.css';

export default function Pricing() {
    const router = useRouter();

    const handleCards = async () => {
      router.push('/cards');
    };
  
    const handlePayment = async () => {
      router.push('/payment');
    };
  
    const handleStart = async () => {
      router.push('/start');
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
            <button onClick={handleCards} className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
              Cards
            </button>
          </li>
          <li>
            <button onClick={handlePayment} className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
              Payment
            </button>
          </li>
          <li>
            <button onClick={handleStart} className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
              Start
            </button>
          </li>
          <li>
            <button className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105">
              SignUp
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  <section className="px-32 py-12">
  <div className="flex items-center gap-10 mb-8">
    <button
    onClick={handlePayment}
    className="bg-primary font-bold text-tertiary border-2 border-light hover:text-primary hover:bg-secondary hover:border-primary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 focus:outline-none">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </button>
    <h2 className="text-primary font-bold text-4xl">Choose Your Payment Method</h2>
  </div>
  </section>

  {/* Payment Section */}
  <section className="px-32 mb-10 flex flex-row gap-10">
    <div className="bg-secondary w-1/2 px-20 py-10 rounded-lg  shadow-lg flex flex-col justify-between">
    <div className="mb-8">
            <img src="/images/pricing-card2.png" alt="Image description" />
    </div>
      <div className="mb-8 ">
        <h3 className="text-primary font-bold text-2xl mb-4">Credit/Debit Card</h3>
        <form>
          <div className="mb-6">
            <label htmlFor="card-number" className="text-primary font-bold block mb-2">
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              className="bg-tertiary text-primary border-2 border-primary rounded-lg px-4 py-2 w-full"
              placeholder="0000 0000 0000 0000"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="expiration-date" className="text-primary font-bold block mb-2">
              Expiration Date
            </label>
            <input
              type="text"
              id="expiration-date"
              className="bg-tertiary text-primary border-2 border-primary rounded-lg px-4 py-2 w-full"
              placeholder="MM/YY"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="cvv" className="text-primary font-bold block mb-2">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              className="bg-tertiary text-primary border-2 border-primary rounded-lg px-4 py-2 w-full"
              placeholder="123"
            />
          </div>
        </form>
        <button
        type="submit"
        className="bg-primary font-bold text-secondary border-2  hover:text-primary hover:bg-septenary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        Pay Now
      </button>
      </div>
    </div>

    <div className="bg-septenary w-1/2 px-20 py-10 rounded-lg shadow-lg flex flex-col justify-between">
    <div className="mb-8">
        <img src="/images/pricing-card.png" alt="Image description" />
    </div>
      
      <div className="mb-8">
        <h3 className="text-primary font-bold text-2xl mb-4">PayPal</h3>
        <form>
          <div className="mb-6">
            <label htmlFor="paypal-email" className="text-primary font-bold block mb-2">
              Email
            </label>
            <input
              type="email"
              id="paypal-email"
              className="bg-tertiary text-primary border-2 border-primary rounded-lg px-4 py-2 w-full"
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="paypal-password" className="text-primary font-bold block mb-2">
              Password
            </label>
            <input
              type="password"
              id="paypal-password"
              className="bg-tertiary text-primary border-2 border-primary rounded-lg px-4 py-2 w-full"
              placeholder="********"
            />
          </div>
        </form>
        <button
        type="submit"
        className="bg-primary font-bold text-secondary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        Pay Now
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
          <FaFacebookF className="text-2xl" />
        </a>
        <a href="#" className="text-tertiary hover:text-secondary mr-4">
          <FaTwitter className="text-2xl" />
        </a>
        <a href="#" className="text-tertiary hover:text-secondary">
          <FaInstagram className="text-2xl" />
        </a>
      </div>
    </div>
    <p className="text-center text-tertiary">© 2024 BRAINDASH. All rights reserved.</p>
  </footer>
</div>
  );
}