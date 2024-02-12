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
      {/* The container should be a flex container with direction column on small screens */}
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between md:justify-start">
        {/* Logo and Toggle Switch are now in their own flex containers that will stack on small screens */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <a href="#" className="inline-block">
            <img src="./logo.png" alt="Logo" className="logo" />
          </a>
        </div>
        <nav className="w-full md:w-auto md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700 flex flex-wrap items-center text-base justify-center">
          {/* Links remain unchanged */}
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
        <div className="flex justify-center md:justify-end w-full md:w-auto">
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
    </header>
  );
}
