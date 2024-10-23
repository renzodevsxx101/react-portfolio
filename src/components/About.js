import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import getThemeStyles from "../components/Theme";

export default function About() {
  const { theme } = useTheme();
  const [typedText, setTypedText] = useState("");
  const words = [
    "Hi, I'm John Renz !",
    "A Junior Front-End Developer based in the Philippines.",
    "Passionate in creating amazing web apps ;) ",
  ];
  let part = "";
  let i = 0;
  let offset = 0;
  const len = words.length;
  let forwards = true;
  let skip_count = 0;
  const skip_delay = 15;
  const speed = 70;

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
    <section className={`${getThemeStyles(theme)} px-20 py-10`} id="about">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col items-start text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-2xl mb-4 font-medium">
            <span className="flex word mb-4 font-mono">{typedText}</span>
          </h1>
          <div className="flex flex-col items-center sm:flex-row sm:justify-center">
            <a
              href="#contact"
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 sm:py-2 sm:px-6 rounded mb-2 sm:mb-0"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto ml-0 sm:ml-4 bg-green-600 hover:bg-green-800 text-white py-2 px-4 sm:py-2 sm:px-6 rounded"
            >
              View My Projects
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 relative">
          <img
            className="object-cover object-center rounded-full"
            alt="hero"
            src="pic.png"
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
