import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";
import useMediaQuery from "../utils/useMediaQuery";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/solid";

export default function Navbar() {
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
  const [activeSection, setActiveSection] = useState("about");
  const { theme, toggleTheme } = useTheme();

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  const dlCV = () => {
    const link = document.createElement("a");
    link.href = "./CV.pdf";
    link.download = "Pagdanganan_JohnRenz - CV 2024.pdf";
    link.click();
  }

  const linkClass = (section) =>
    `nav-link text-lg ${theme === "light" ? "text-black" : "text-white"
    } ${activeSection === section ? "active" : ""}`;

  const headerStyle =
    theme === "light"
      ? { backgroundColor: "#e1e1e1", color: "#000000" }
      : { backgroundColor: "#252636", color: "#e5fffa" };

  return (
    <nav className={isAboveMediumScreens ? 'mb-14' : 'mb-20'}
    >
      <div style={headerStyle} className="fixed top-0 z-30 w-full py-3 shadow-md">
        <div className="mx-auto w-5/6 flex items-center justify-between ">
          <div className="flex items-center justify-between w-full gap-16">
            <a href="#">
              <img src="./logo.png" alt="Logo" className="logo" />
            </a>
            {isAboveMediumScreens ?
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-between gap-8 text-sm">
                  <a
                    href="#about"
                    className={linkClass("about")}
                    onClick={() => handleSetActive("about")}
                  >
                    About
                  </a>
                  <a
                    href="#projects"
                    className={linkClass("projects")}
                    onClick={() => handleSetActive("projects")}
                  >
                    Projects
                  </a>
                  <a
                    href="#skills"
                    className={linkClass("skills")}
                    onClick={() => handleSetActive("skills")}
                  >
                    Skills
                  </a>
                  <a
                    href="#contact"
                    className={linkClass("contact")}
                    onClick={() => handleSetActive("contact")}
                  >
                    Contact
                  </a>
                </div>
                <div className="flex justify-center items-center gap-8">
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />
                    <span className="slider"></span>
                  </label>
                  <button
                    className="w-full sm:w-auto text-lg bg-primary-300 hover:bg-primary-500 text-white py-2 px-4 sm:py-2 sm:px-6 rounded mb-2 sm:mb-0"
                    onClick={dlCV}
                  >
                    Download CV
                  </button>
                </div>

              </div>
              : (
                <div className="flex items-center justify-center gap-8">
                  <button
                    className="rounded-full bg-primary-100 p-2"
                    onClick={() => setIsMenuToggled(!isMenuToggled)}
                  >
                    <MenuAlt3Icon className="h-6 w-6 text-white" />
                  </button>
                </div>
              )}
          </div>

        </div>


      </div>
      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className={`${theme === 'dark' ? 'bg-primary-300' : 'bg-tertiary-200'} fixed right-0 bottom-0 z-40 h-full w-4/6 drop-shadow-xl`}>
          {/* CLOSE ICON */}
          <div className="flex justify-end p-12">
            <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
              <XIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="flex flex-col gap-8 items-center text-2xl">
            <a
              href="#about"
              className={linkClass("about")}
              onClick={() => handleSetActive("about")}
            >
              About
            </a>
            <a
              href="#projects"
              className={linkClass("projects")}
              onClick={() => handleSetActive("projects")}
            >
              Projects
            </a>
            <a
              href="#skills"
              className={linkClass("skills")}
              onClick={() => handleSetActive("skills")}
            >
              Skills
            </a>
            <a
              href="#contact"
              className={linkClass("contact")}
              onClick={() => handleSetActive("contact")}
            >
              Contact
            </a>
            <button
              className="sm:w-auto bg-primary-400 hover:bg-primary-500 text-white py-2 px-4 sm:py-2 sm:px-6 rounded mb-2 sm:mb-0 text-lg"
              onClick={dlCV}
            >
              Download CV
            </button>

            <label className="switch">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <span className="slider"></span>
            </label>

          </div>
        </div>
      )}
    </nav>
  );
}
