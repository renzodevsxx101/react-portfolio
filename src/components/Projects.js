import { CodeIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { projects } from "../data";
import { useTheme } from "../context/ThemeContext";
import LineGradient from "../components/LineGradient";

export default function Projects() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const Style =
    theme === "light"
      ? { backgroundColor: "#e6e6ea", color: "#000000" }
      : { backgroundColor: "#010026", color: "#ffffff" };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("projects");
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="projects" style={Style}>
      <div className="px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <CodeIcon className="mx-auto inline-block w-10 mb-4 tracking-in-expand" />
          <p className="sm:text-4xl text-3xl font-semibold title-font mb-2 tracking-in-expand ">
            My{" "}
            <span
              className="text-purple-600" 
            >
              Projects
            </span>
          </p>
          <div className="flex justify-center mb-4">
            <LineGradient width="w-2/12" />
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base tracking-in-expand">
            These are my projects, where I've gained hands-on experience and
            worked on various coding challenges.
          </p>
        </div>

        <div className="flex flex-wrap -m-4">
          {projects.map((project, index) => (
            <div
              key={project.image}
              className={`sm:w-1/2 w-full p-4 animate__animated animate__fadeInUp`}
              style={{
                animationDelay: `${(index + 1) * 0.3}s`,
              }}
            >
              <div className="flex relative mb-2">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-72 object-cover object-center"
                  src={project.image}
                />
                <div className="px-8 py-10 h-72 relative w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-purple-500 mb-1">
                    {project.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed text-white">
                    {project.description}
                  </p>
                  <button className="button border-2 border-purple-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      ></path>
                    </svg>
                    <div className="text">
                      <a href={project.link}>Preview</a>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
