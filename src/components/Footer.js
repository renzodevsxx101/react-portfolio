// Footer.js
import React from 'react';
import { useTheme } from "../context/ThemeContext";


const Footer = () => {
    const { theme } = useTheme();

    const Style =
    theme === "light"
      ? { backgroundColor: "#EADBC8", color: "#000000" }
      : { backgroundColor: "#445069", color: "#ffffff" };
      
  return (
    <footer style={Style} className='py-4'>
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; JRP {new Date().getFullYear()}. All Rights Reserved.</p>
        <div className="mt-4">
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-300 mx-4">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a 
            href="https://www.linkedin.com/in/john-renz-pagdanganan-08b525217" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-700 hover:text-blue-500 mx-4">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
          <a 
            href="https://github.com/renzodevsxx101"
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-800 hover:text-gray-9 00 mx-4">
            <i className="fab fa-github fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
