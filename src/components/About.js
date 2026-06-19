import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import getThemeStyles from "../components/Theme";


const dlCV = () => {
  const link = document.createElement("a");
  link.href = "./CV2.pdf";
  link.download = "Pagdanganan_JohnRenz - CV 2026.pdf";
  link.click();
}

export default function About() {
  
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState("");
  const words = [
    "A Junior Front-End Developer based in Bulacan, Philippines.",
    "Passionate in creating amazing web apps ;) ",
    "Let's connect!"
  ];
  let part = "";
  let i = 0;
  let offset = 0;
  const len = words.length;
  let forwards = true;
  let skip_count = 0;
  const skip_delay = 15;
  const speed = 120;

  const wordflick = () => {
    setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count === skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset === 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count === 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      setTypedText(part);
    }, speed);
  };

  useEffect(() => {
    wordflick();
  }, []);

  return (
    <section className={`${getThemeStyles(theme)} px-8 lg:pl-32 lg:pr-14 pt-10 md:pt-20 lg:pt-10 ${theme === "light" ? "" : "about-bg" }`} id="about">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="flex-grow md:w-1/2 lg:pr-24 md:mb-16 flex flex-col mb-16 items-center lg:items-start text-center lg:text-left">
        <h2 className="title-font sm:text-2xl text-sm font-medium">Hello there,</h2>
        <h2 className="title-font sm:text-4xl text-xl font-bold">I'm <span className="text-purple-700 font-bold">John Renz!</span></h2>
          <h1 className="title-font sm:text-2xl text-2xl mb-4 font-normal">
            <span className="flex word mb-4">{typedText}</span>
          </h1>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-3">
            <a
              href="#contact"
              className={`${theme === "light" ? "bg-purple-600 text-white hover:bg-purple-700" : "hover:bg-purple-800 hover:text-white font-medium border text-purple-600 border-purple-600"} py-2 px-6 rounded transition-all duration-300`}
            >
              Contact Me
            </a>
            <button
              className={`${theme === "light" ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-800 hover:bg-blue-600"} text-white py-2 px-6 rounded transition-all duration-300 flex items-center justify-center gap-2`}
              onClick={dlCV}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </button>
          </div>
        </div>
      <div className="lg:max-w-lg lg:w-full w-full">
          <img
            className="object-cover object-center"
            alt="hero"
            src="me.png"
            style={{
              filter:
                theme === "dark"
                  ? "drop-shadow(0 0 15px rgba(169, 169, 169, 0.5))"
                  : "drop-shadow(0 0 30px rgba(0, 0, 0, 0.8))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
