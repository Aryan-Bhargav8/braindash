'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import styles from '../../styles/Home.module.css';
import {
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
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

      {/* Hero Section */}
      <div className="h-[calc(100vh-4rem)] bg-gradient-to-r from-yellow-400 to-orange-400 flex flex-col md:flex-row px-32">
      <div className="w-full md:w-1/2 flex items-center justify-center">
      <div className="text-center max-w-3xl px-4 md:px-0">
      <h1 className="text-primary text-3xl sm:text-6xl font-bold text-white mb-8 text-center">
        Introducing our state-of-the-art flashcard app
      </h1>
      <p className="text-senary text-xl text-center mb-8">
        The ultimate tool to elevate your learning journey. Whether you&apos;re a
        student tackling a challenging course, a professional seeking to
        expand your expertise, or a lifelong learner driven by curiosity,
        our platform is designed to empower you every step of the way.
      </p>
      <button
        onClick={handlePayment}
        className=" bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary  px-6 py-3 rounded-lg hover:scale-105"
      >
        Get Started
      </button>
    </div>
  </div>
  <div className="w-full md:w-1/2 bg-cover bg-center h-[30vh] md:h-full">
    <div className="w-full h-full bg-center bg-no-repeat bg-contain animate-float" style={{ backgroundImage: 'url("/images/hero-cat.jpg")' }}>
    </div>
  </div>
      </div>

      {/* About The App */}
      <section className="bg-white h-[calc(100vh-4rem)] flex flex-col md:flex-row px-32">
    <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row">
    <div className="w-full md:w-1/2 bg-cover bg-center h-[50vh] md:h-full">
      <div
        className="w-full h-full bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: 'url("/images/about-cat.png")' }}
      ></div>
    </div>
    <div className="w-full md:w-1/2 flex flex-col pl-8 justify-center mt-8 md:mt-0 md:ml-8 ">
      <h2 className="text-primary text-3xl sm:text-6xl font-bold text-white mb-8 text-center">About the App</h2>
      <p className="text-senary mb-8 text-xl text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque ex non sunt ipsum, odio alias expedita dicta perspiciatis vero ipsa beatae laboriosam, eveniet quas accusantium ab! Porro quisquam sit incidunt.
      </p>
    </div>
  </div>
      </section>

      {/* Features */}
      <section className="bg-gray-100 py-16 px-32">
        <div className="container mx-auto px-6">
          <h2 className="text-primary text-3xl sm:text-6xl font-bold text-white mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className='rounded-[.5rem] overflow-hidden grid grid-cols-1 grid-rows-2 gap-0 h-full'>
              <div className="w-full h-full">
                <img src="/images/feature-1.jpg" alt="Feature 1" className="w-full h-full object-cover object-center" />
              </div>
              <div className='bg-septenary rounded-b-[.5rem] w-full h-1/4 flex items-center justify-center'>
                <h3 className='text-secondary font-bold'>Learning New Words</h3>
              </div>
            </div>
            <div className='rounded-[.5rem] overflow-hidden grid grid-cols-1 grid-rows-2 gap-0 h-full'>
              <div className="w-full h-full">
                <img src="/images/feature-2.jpg" alt="Feature 2" className="w-full h-full object-cover object-center" />
              </div>
              <div className='bg-septenary rounded-b-[.5rem] w-full h-1/4 flex items-center justify-center'>
                <h3 className='text-secondary font-bold'>Learning New Words</h3>
              </div>
            </div>

            <div className='rounded-[.5rem] overflow-hidden grid grid-cols-1 grid-rows-2 gap-0 h-full'>
              <div className="w-full h-full">
                <img src="/images/feature-4.jpg" alt="Feature 3" className="w-full h-full object-cover object-center" />
              </div>
              <div className='bg-septenary rounded-b-[.5rem] w-full h-1/4 flex items-center justify-center'>
                <h3 className='text-secondary font-bold'>Learning New Words</h3>
              </div>
            </div>

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