import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";
import useMediaQuery from "../utils/useMediaQuery";
import { MenuAlt3Icon, XIcon } from "@heroicons/react/solid";
import ToggleButton from "./ToggleButton";

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
      ? { backgroundColor: "#d0d0d0", color: "#000000" }
      : { backgroundColor: "#010026", color: "#e5fffa" };

  return (
    <nav className={isAboveMediumScreens ? 'mb-14' : 'mb-20'}
    >
      <div style={headerStyle} className="fixed top-0 z-30 w-full py-3">
        <div className="mx-auto w-5/6 flex items-center justify-between ">
          <div className="flex items-center justify-between w-full gap-16">
            <a href="#">
              <img style={{ width: "5rem" }} src="./logo.png" alt="Logo" className="logo" />
            </a>
            {isAboveMediumScreens ?
              <div className="flex items-center justify-between w-full bg-gradient-violet">
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
                <div className="flex justify-center items-center gap-6">
                  <ToggleButton />
                  <button
                    className="flex gap-2 items-center justify-center w-full sm:w-auto text-lg  bg-blue-800 border-opacity-0 text-white hover:bg-blue-600 py-2 px-2 sm:py-2 sm:px-3 rounded mb-2 sm:mb-0"
                    onClick={dlCV}
                  >
                    <img style={{ width: "1.25rem" }} src="./dl.svg" alt="download" />
                    Download CV
                  </button>
                </div>

              </div>
              : (
                <div className="flex items-center justify-center gap-8">
                  <button
                    className="rounded-full bg-primary-400 p-2"
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
              className="flex items-center justify-center gap-3 sm:w-auto  bg-blue-800 border-opacity-0 text-white hover:bg-blue-600 py-2 px-4 sm:py-2 sm:px-3 rounded mb-2 sm:mb-0 text-lg"
              onClick={dlCV}
            >
              <img style={{ width: "1.25rem" }} src="./dl.svg" alt="download" />
              Download CV
            </button>
            <ToggleButton />
          </div>
        </div>
      )}
    </nav>
  );
}
