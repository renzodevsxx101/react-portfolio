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
  const { theme } = useTheme();

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

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
                    href="#services"
                    className={linkClass("services")}
                    onClick={() => handleSetActive("services")}
                  >
                    Services
                  </a>
                  <a
                    href="#experience"
                    className={linkClass("experience")}
                    onClick={() => handleSetActive("experience")}
                  >
                    Experience
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
        <div className={`${theme === 'dark' ? 'bg-primary-300' : 'bg-tertiary-200'} fixed right-0 bottom-0 z-40 h-full w-4/6 drop-shadow-xl tilt-in-right-1`}>
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
              href="#services"
              className={linkClass("services")}
              onClick={() => handleSetActive("services")}
            >
              Services
            </a>
            <a
              href="#experience"
              className={linkClass("experience")}
              onClick={() => handleSetActive("experience")}
            >
              Experience
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
            <ToggleButton />
          </div>
        </div>
      )}
    </nav>
  );
}
