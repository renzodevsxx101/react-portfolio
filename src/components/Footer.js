// Footer.js
import React, { useEffect, useState } from 'react';
import { useTheme } from "../context/ThemeContext";
import { themeTokens } from "./ui";


const Footer = () => {
  const { theme } = useTheme();
  const t = themeTokens(theme);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`${t.page} border-t ${theme === "light" ? "border-gray-300" : "theme-sahara-border"} px-6 py-8`}>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <p className="font-bold">John Renz Pagdanganan</p>
          <p className={`mt-1 text-sm ${t.subtleText}`}>&copy; JRP {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
        <div className="flex justify-center gap-3">
          <a
            href="https://www.facebook.com/johnrenz.losabio"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition duration-300 hover:-translate-y-1 ${theme === "light" ? `theme-soft-light theme-accent-text ${t.hoverAccent}` : `theme-sahara-border theme-sahara-icon ${t.hoverAccent}`}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/john-renz-pagdanganan-08b525217"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition duration-300 hover:-translate-y-1 ${theme === "light" ? `theme-soft-light theme-accent-text ${t.hoverAccent}` : `theme-sahara-border theme-sahara-icon ${t.hoverAccent}`}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/renzodevsxx101"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex h-10 w-10 items-center justify-center rounded-md border transition duration-300 hover:-translate-y-1 ${theme === "light" ? `theme-soft-light theme-accent-text ${t.hoverAccent}` : `theme-sahara-border theme-sahara-icon ${t.hoverAccent}`}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          </a>
        </div>
      </div>
      <button
        type="button"
        onClick={scrollToTop}
        className={`back-to-top-button fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-md border shadow-lg transition duration-300 hover:-translate-y-1 ${showBackToTop ? "back-to-top-visible" : "back-to-top-hidden"} ${theme === "light" ? `theme-card-light theme-accent-text ${t.hoverAccent}` : `theme-card-dark theme-sahara-icon ${t.hoverAccent}`}`}
        aria-label="Back to top"
        title="Back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0-6 6m6-6 6 6" />
        </svg>
      </button>
    </footer>
  );
}

export default Footer;
