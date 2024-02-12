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
    `nav-link text-lg ${
      theme === "light" ? "text-black" : "text-white"
    } font-semibold ${activeSection === section ? "active" : ""}`;

  const headerStyle =
    theme === "light"
      ? { backgroundColor: "#CCC8AA", color: "#000000" }
      : { backgroundColor: "#607274", color: "#ffffff" };

  return (
    <header
      style={headerStyle}
      className="mx-auto sticky top-0 z-10 shadow-md"
    >
      <div className="container mx-auto flex flex-wrap items-center  justify-between p-5">
        <nav className="w-full md:w-auto flex flex-wrap items-center justify-center  md:justify-start gap-5">
        <div className="flex justify-center items-center w-full md:w-auto">
          <a href="#" className="inline-block">
            <img src="./logo.png" alt="Logo" className="logo" />
          </a>
        </div>
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
        <div className="flex justify-center items-center w-full md:w-auto">
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
