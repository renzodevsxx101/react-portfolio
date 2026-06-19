import React from 'react';
import { useTheme } from "../context/ThemeContext";

const ToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className={`relative flex items-center w-14 h-8 ${theme === "dark" ? "bg-gray-200" : "bg-gray-400"} rounded-full shadow-md dark:bg-gray-700 transition-colors duration-300 focus:outline-none`}
        >
            {/* Toggle Slider */}
            <span
                className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${theme === "dark" ? "translate-x-6" : "translate-x-1"
                    }`}
            >
                {/* Moon Icon (Dark Mode) */}
                {theme === "dark" && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-black shadow-lg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.752 15.002A9.718 9.718 0 0 1 18 16.5 9.75 9.75 0 0 1 8.25 6.75a9.718 9.718 0 0 1 1.498-3.752 9.007 9.007 0 1 0 12.004 12.004Z"
                        />
                    </svg>
                )}
                {/* Sun Icon (Light Mode) */}
                {theme === "light" && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 text-yellow-500"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v1.5M12 19.5V21m7.95-11.25H21m-17.95 0H3m14.148-6.148l1.06 1.06M6.792 18.208l-1.06-1.06m14.148 0-1.06 1.06M6.792 6.792l1.06 1.06M12 6.75a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Z"
                        />
                    </svg>
                )}
            </span>
        </button>
    )
}

export default ToggleButton
