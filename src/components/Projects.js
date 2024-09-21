import { CodeIcon } from "@heroicons/react/solid";
import React from "react";
import { projects } from "../data";
import { useTheme } from "../context/ThemeContext";

export default function Projects() {
  const { theme } = useTheme(); // Use the theme

  const Style =
    theme === "light"
      ? { backgroundColor: "#DED0B6", color: "#000000" }
      : { backgroundColor: "#474F7A", color: "#ffffff" };
  return (
    <section id="projects" style={Style}>
      <div className="container px-5 py-10 mx-auto text-center lg:px-40">
        <div className="flex flex-col w-full mb-20">
          <CodeIcon className="mx-auto inline-block w-10 mb-4" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4">
            My Projects
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            These are my projects, where I've gained hands-on experience and
            worked on various coding challenges.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
  {projects.map((project) => (
    <a
      href={project.link}
      key={project.image}
      className="sm:w-1/2 w-100 p-4"
    >
      <div className="flex relative">
        <img
          alt="gallery"
          className="absolute inset-0 w-100 h-64 object-cover object-center"
          src={project.image}
        />
        <div className="px-8 py-10 h-64 relative z-10 w-100 border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
          <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
            {project.subtitle}
          </h2>
          <h1 className="title-font text-lg font-medium text-white mb-3">
            {project.title}
          </h1>
          <p className="leading-relaxed text-white">{project.description}</p>
          <a
            href={project.link}
            className="mt-4 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Preview
          </a>
        </div>
      </div>
    </a>
  ))}
</div>

      </div>
    </section>
  );
}
