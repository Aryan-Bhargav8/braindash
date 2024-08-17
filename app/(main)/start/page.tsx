'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Start() {
  const router = useRouter();

  const handleCards = async () => {
    router.push('/cards');
  };

  const handlePayment = async () => {
    router.push('/payment');
  };

  return (
    <div className="bg-tertiary font-sans">
      <Head>
        <title>BRAINDASH - Start</title>
        <meta name="description" content="Get started with BRAINDASH flashcards" />
      </Head>

      {/* Hero Section */}
      <section className="h-[calc(100vh-4rem)] bg-gradient-to-r from-yellow-400 to-orange-400 flex flex-col md:flex-row px-32">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="text-center max-w-3xl px-4 md:px-0">
            <h1 className="text-primary text-3xl sm:text-6xl font-bold text-white mb-8 text-center">
              Introducing our state-of-the-art flashcard app
            </h1>
            <p className="text-senary text-xl text-center mb-8">
              The ultimate tool to elevate your learning journey. Whether you&apos;re a student tackling a challenging course, a professional seeking to expand your expertise, or a lifelong learner driven by curiosity, our platform is designed to empower you every step of the way.
            </p>
            <button onClick={handleCards} className="bg-[#F2F4F3] font-bold text-orange border-2 hover:text-tertiary hover:bg-septenary px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
              Create Cards
            </button>
          </div>
        </div>
      </section>

      {/* Start Page Content */}
      <section className="py-20 px-8 md:px-16 lg:px-32">
        <div className="mb-12">
          <h2 className="text-primary font-bold text-4xl text-center">Getting Started with BRAINDASH</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-orange p-8 rounded-lg">
            <h3 className="text-[#F2F4F3] font-bold text-2xl mb-4">Create Flashcards</h3>
            <p className="text-[#F2F4F3] text-lg mb-8">
              Start creating your own flashcards by clicking the &quot;Cards&quot; button in the navigation menu. You can add questions, answers, and tags to your cards.
            </p>
            <button onClick={handleCards} className="bg-[#F2F4F3] font-bold text-orange border-2 hover:text-tertiary hover:bg-septenary px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
              Create Cards
            </button>
          </div>
          <div className="bg-septenary p-8 rounded-lg">
            <h3 className="text-tertiary font-bold text-2xl mb-4">Manage Payments</h3>
            <p className="text-tertiary text-lg mb-8">
              To access advanced features, you can upgrade your account by clicking the &quot;Payment&quot; button in the navigation menu.
            </p>
            <button onClick={handlePayment} className="bg-tertiary font-bold text-septenary border-2 hover:text-tertiary hover:bg-orange px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300">
              Manage Payments
            </button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="px-32 py-12 mb-8">
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

    </div>
  );
}