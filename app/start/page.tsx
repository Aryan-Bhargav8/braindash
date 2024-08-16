'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaInstagram, FaArrowLeft } from 'react-icons/fa';
import styles from '../../styles/Home.module.css';


import {
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
export default function Start() {
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
      <Head>
        <title>BRAINDASH - Start</title>
        <meta name="description" content="Get started with BRAINDASH flashcards" />
      </Head>

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


      {/* Start Page Content */}
      <section className=" py-20 px-8 md:px-16 lg:px-32">
  <div className="mb-12">
    <h2 className="text-primary font-bold text-4xl text-center">Getting Started with BRAINDASH</h2>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
    <div className="bg-orange p-8 rounded-lg">
      <h3 className="text-[#F2F4F3] font-bold text-2xl mb-4">Create Flashcards</h3>
      <p className="text-[#F2F4F3] text-lg mb-8">
        Start creating your own flashcards by clicking the "Cards" button in the navigation menu. You can add questions, answers, and tags to your cards.
=======
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
      <button onClick={handleCards} className="bg-[#F2F4F3] font-bold text-orange border-2 hover:text-tertiary hover:bg-septenary px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
        Create Cards
      </button>
    </div>
    <div className="bg-septenary p-8 rounded-lg">
      <h3 className="text-tertiary font-bold text-2xl mb-4">Manage Payments</h3>
      <p className="text-tertiary text-lg mb-8">
        To access advanced features, you can upgrade your account by clicking the "Payment" button in the navigation menu.
      </p>
      <button onClick={handlePayment} className="bg-tertiary font-bold text-septenary border-2 hover:text-tertiary hover:bg-orange px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
        Manage Payments
      </button>
    </div>
  </div>
</section>

      <section className="px-32 py-12 mb-8">
  {/* Video Section */}
  <div className="mb-12">
    <h2 className="text-primary font-bold text-4xl text-center">Learn How to Use BRAINDASH</h2>
  </div>
  <div className="flex justify-center">
    <div className="relative w-full max-w-[900px] pt-[56.25%]">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/DXTgLPZWk6w"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 px-32">
        <div className="flex justify-between items-center mb-4">
          <div>
            <img src="/images/logo.webp" alt="BRAINDASH" className="h-16 w-full" />
          </div>
          <div className="flex justify-between items-center mb-4">
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