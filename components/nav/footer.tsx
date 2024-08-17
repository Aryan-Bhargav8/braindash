import React from 'react';
import {FaFacebookF, FaInstagram, FaTwitter} from "react-icons/fa";

const AppFooter = () => {
  return (
    <footer className="bg-primary text-white py-6 px-6 sm:px-8 lg:px-32 text-center mt-12 border-2 border-primary ">
      <div className="container mx-auto">
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