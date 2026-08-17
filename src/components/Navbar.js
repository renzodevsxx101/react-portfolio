import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";
import useMediaQuery from "../utils/useMediaQuery";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/solid";
import ToggleButton from "./ToggleButton";
import { Button, themeTokens } from "./ui";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

function LogoMark({ theme }) {
  return (
    <span className={`brand-logo ${theme === "light" ? "brand-logo-light" : "brand-logo-dark"}`} aria-hidden="true">
      <svg className="brand-logo-glyph" viewBox="0 0 72 48" role="presentation" focusable="false">
        <path className="brand-logo-frame" d="M19 14 8 24l11 10" />
        <path className="brand-logo-frame" d="M53 14 64 24 53 34" />
        <path className="brand-logo-frame" d="M42 10 30 38" />
        <path className="brand-logo-mono" d="M25 15h10c5 0 8 3 8 7s-3 7-8 7H25" />
        <path className="brand-logo-mono" d="M25 15v18" />
        <path className="brand-logo-mono" d="M39 29l7 6" />
      </svg>
      <span className="brand-logo-accent" />
    </span>
  );
}

export default function Navbar() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [activeSection, setActiveSection] = useState("about");
  const { theme } = useTheme();
  const t = themeTokens(theme);

  const handleSetActive = (section) => {
    setActiveSection(section);
    setIsMenuToggled(false);
  };

  const linkClass = (section) =>
    `nav-link rounded-md px-3 py-2 text-sm font-semibold transition ${
      activeSection === section
        ? t.badge
        : `${t.mutedText} ${t.hoverAccent}`
    }`;

  return (
    <nav>
      <div className={`fixed top-0 z-30 w-full border-b backdrop-blur-xl ${t.nav}`}>
        <div className="mx-auto flex w-11/12 max-w-7xl items-center justify-between py-3">
          <div className="flex w-full items-center justify-between gap-8">
            <a href="#about" className="flex items-center gap-3" onClick={() => handleSetActive("about")} aria-label="John Renz home">
              <LogoMark theme={theme} />
            </a>
            {isAboveMediumScreens ?
              <div className="flex items-center justify-end gap-6">
                <div className={`flex items-center rounded-lg border p-1 ${t.softCard}`}>
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
                <div className="flex items-center gap-3">
                  <ToggleButton />
                  <Button theme={theme} as="a" href="#contact" onClick={() => handleSetActive("contact")} className="h-10 px-4">
                    Hire me
                  </Button>
                </div>
              </div>
              : (
                <div className="flex items-center justify-center gap-3">
                  <ToggleButton />
                  <button
                    className={`rounded-md border p-2 ${t.card}`}
                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                    aria-label="Open menu"
                  >
                    <MenuAlt3Icon className={`h-6 w-6 ${t.accent}`} />
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
      {!isAboveMediumScreens && isMenuToggled && (
        <div className={`fixed right-0 bottom-0 z-40 h-full w-4/5 max-w-sm border-l p-6 drop-shadow-2xl tilt-in-right-1 ${t.mutedPage}`}>
          <div className="mb-10 flex items-center justify-between">
            <p className={`text-sm font-bold uppercase ${t.accent}`}>Menu</p>
            <button onClick={() => setIsMenuToggled(!isMenuToggled)} aria-label="Close menu">
              <XIcon className={`h-6 w-6 ${t.mutedText}`} />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {links.map(([section, label]) => (
              <a
                key={section}
                href={`#${section}`}
                className={`${linkClass(section)} text-base`}
                onClick={() => handleSetActive(section)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
