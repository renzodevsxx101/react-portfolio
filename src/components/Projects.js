import { CodeIcon } from "@heroicons/react/solid";
import React from "react";
import { projects } from "../data";
import { useTheme } from "../context/ThemeContext";
import { motion } from "framer-motion";
import LineGradient from "../components/LineGradient";


export default function Projects() {
  const { theme } = useTheme();

  const Style =
    theme === "light"
      ? { backgroundColor: "#e6e6ea", color: "#000000" }
      : { backgroundColor: "#6A0DAD", color: "#ffffff" };
  return (
    <section id="projects" style={Style}>
      <div className="px-5 py-10 mx-auto text-center lg:px-40">
        <motion.div className="flex flex-col w-full mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}>
          <CodeIcon className="mx-auto inline-block w-10 mb-4" />
          <p className="sm:text-4xl text-3xl font-semibold title-font mb-2">
             My<span className={ `${theme === 'light' ? 'text-purple-600': 'text-yellow-400'}` }> Projects</span>
          </p>
          <div className="flex justify-center mb-4">
            <LineGradient width="w-2/12" />
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            These are my projects, where I've gained hands-on experience and
            worked on various coding challenges.
          </p>
        </motion.div>

        <div
          className="flex flex-wrap -m-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.image}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              className="sm:w-1/2 w-full p-4 "
            >
              <div className="flex relative mb-2 ">
                <img
                  alt="gallery"
                  className="absolute inset-0 w-full h-72 object-cover object-center"
                  src={project.image}
                />
                <div className="px-8 py-10 h-72 relative w-full border-4 border-gray-800 bg-gray-900 opacity-0 hover:opacity-100">
                  <h2 className="tracking-widest text-sm title-font font-medium text-green-400 mb-1">
                    {project.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed text-white">
                    {project.description}
                  </p>
                  <button className="button">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
