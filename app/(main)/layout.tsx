import React from 'react';
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";
import NavBar from "@/components/nav/nav-bar";
import AppFooter from "@/components/nav/footer";

const Layout = (
  { children }: { children: React.ReactNode }
) => {
  return (
    <div className="bg-tertiary font-sans min-h-screen flex flex-col">
      {/* Header */}
      <NavBar />

      {children}

      {/* Footer */}
      <AppFooter/>
    </div>
  );
};

export default Layout;