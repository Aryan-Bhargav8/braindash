import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const AppFooter = () => {
  return (
    <footer className="bg-primary text-white py-6 px-32">
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
      <p className="text-center text-tertiary">© 2024 BRAINDASH. All rights reserved.</p>
    </footer>
  );
};

export default AppFooter;
