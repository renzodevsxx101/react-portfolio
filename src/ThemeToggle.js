import React from "react";
import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className={`toggle-switch ${theme}`} onClick={toggleTheme}>
      <div className="slider"></div>
      <div className={`slider-icon ${theme}`}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </div>
    </label>
  );
}
