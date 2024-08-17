"use client";

import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

const NavBar = () => {
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



  const handleSignIn = () => {
    router.push('/sign-in');
    setIsMenuOpen(false);
  };
  return (
    <header
      className="bg-quaternary text-primary border-2 border-primary py-6 px-4 sm:px-6 lg:px-12 mt-12 mb-12 mx-4 sm:mx-8 lg:mx-32 rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img src="/images/logo.webp" alt="Logo" className="h-10 sm:h-12 lg:h-16"/>
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
                <button onClick={handleSignIn}
                        className="bg-primary font-bold text-tertiary border-2 hover:text-primary hover:bg-secondary px-6 py-3 rounded-lg hover:scale-105">
                  Sign In
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton/>
              </SignedIn>
            </li>
          </ul>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
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
                  <button onClick={handleSignIn}
                          className="block px-4 py-2 text-primary hover:bg-secondary hover:text-tertiary w-full text-left">
                    Sign In
                  </button>
                </SignedOut>
                <SignedIn>
                  <div className="px-4 py-2">
                    <UserButton/>
                  </div>
                </SignedIn>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;