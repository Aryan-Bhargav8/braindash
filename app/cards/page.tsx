'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from '../../styles/Home.module.css';

export default function Cards() {
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
                <button 
                onClick={handleCards}
                className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary">
                  Cards
                </button>
              </li>
              <li>
                <button
                onClick={handlePayment}
                className="text-primary font-bold px-4 py-2 hover:border-b-2 hover:border-primary"
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
                <button className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary  px-6 py-3 rounded-lg hover:scale-105">
                  SignUp
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>


    



     

     

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