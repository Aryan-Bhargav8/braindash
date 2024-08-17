import React from 'react';
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";

const AppFooter = () => {
  return (
    <footer className="bg-primary text-white py-6 px-6 sm:px-8 lg:px-32 text-center mt-12 border-2 border-primary ">
      <div className="container mx-auto">
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
            {Icon: FaFacebookF, url: 'https://www.facebook.com'},
            {Icon: FaTwitter, url: 'https://www.twitter.com'},
            {Icon: FaInstagram, url: 'https://www.instagram.com'},
          ].map(({Icon, url}) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
              <Icon className="text-primary hover:text-senary"/>
            </a>
          ))}
        </div>
        <p className="text-sm mt-4">
          &copy; 2023 All rights reserved.
        </p>
        
      </div>
    </footer>
  );
};

export default AppFooter;
