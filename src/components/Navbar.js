import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import "../styles/Navbar.css";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSetActive = (section) => {
    setActiveSection(section);
  };

  const linkClass = (section) =>
    `nav-link mr-5 text-lg ${
      theme === "light" ? "text-black" : "text-white"
    } font-semibold ${activeSection === section ? "active" : ""}`;

  const headerStyle =
    theme === "light"
      ? { backgroundColor: "#CCC8AA", color: "#000000" }
      : { backgroundColor: "#607274", color: "#ffffff" };

  return (
    <header
      style={headerStyle}
      className="mx-auto md:sticky top-0 z-10 shadow-md"
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href="#">
          <img src="./logo.png" alt="Logo" className="logo" />
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
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
        </nav>
        <label className="switch flex items-center mr-8 justify-center">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "dark"}
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
}
