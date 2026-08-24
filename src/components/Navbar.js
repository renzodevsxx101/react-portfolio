import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import useMediaQuery from "../utils/useMediaQuery";
import { themeTokens, Button } from "./ui";
import ToggleButton from "./ToggleButton";

const links = [
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["about", "About"],
  ["contact", "Contact"],
];

function LogoMark() {
  return (
    <span className="font-heading text-xl font-bold tracking-tight">
      <span className="text-primary-500 dark:text-primary-400">J</span>
      <span className="text-surface-900 dark:text-surface-50">RP</span>
    </span>
  );
}

export default function Navbar() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [activeSection, setActiveSection] = useState("about");
  const { theme } = useTheme();
  const t = themeTokens(theme);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience", "projects", "skills", "contact", "about"];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMenuToggled(false);
  };

  const linkClass = (section) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
      activeSection === section
        ? theme === "light"
          ? "bg-surface-900 text-white"
          : "bg-white text-surface-900"
        : `${t.mutedText} ${t.hoverAccent}`
    }`;

  return (
    <nav>
      {/* Floating pill navbar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-3xl">
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-2.5 backdrop-blur-xl ${t.nav} shadow-lg shadow-black/5 dark:shadow-black/20`}
        >
          <a
            href="#hero"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleSetActive("hero")}
            aria-label="John Renz home"
          >
            <LogoMark />
          </a>

          {isAboveMediumScreens ? (
            <div className="flex items-center gap-1">
              {links.map(([section, label]) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={linkClass(section)}
                  onClick={() => handleSetActive(section)}
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}

          <div className="flex items-center gap-2">
            <ToggleButton />
            {isAboveMediumScreens ? (
              <Button theme={theme} as="a" href="#contact" onClick={() => handleSetActive("contact")} className="h-9 px-4 text-xs rounded-full">
                Contact Me
              </Button>
            ) : (
              <button
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 ${t.softCard} ${t.mutedText} ${t.hoverAccent} cursor-pointer`}
                onClick={() => setIsMenuToggled(!isMenuToggled)}
                aria-label="Open menu"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {isMenuToggled ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuToggled(false)}
          />
          <div
            className={`fixed right-4 top-20 z-50 w-56 rounded-2xl border p-3 shadow-xl ${t.nav} ${
              theme === "light" ? "animate-fade-in" : "animate-fade-in"
            }`}
          >
            <div className="flex flex-col gap-1">
              {links.map(([section, label]) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`${linkClass(section)} text-sm`}
                  onClick={() => handleSetActive(section)}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className={`mt-2 border-t ${t.border} pt-2`}>
              <Button theme={theme} as="a" href="#contact" onClick={() => handleSetActive("contact")} className="w-full h-9 text-xs rounded-full">
                Hire me
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
