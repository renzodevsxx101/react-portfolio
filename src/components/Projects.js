import { CodeIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef } from "react";
import { projects } from "../data";
import { useTheme } from "../context/ThemeContext";
import LineGradient from "../components/LineGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  const Style =
    theme === "light"
      ? { backgroundColor: "#d0d0d0", color: "#000000" }
      : { backgroundColor: "#010026", color: "#ffffff" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" };

      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power2.out", scrollTrigger: st }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, delay: i * 0.25, ease: "power2.out",
            scrollTrigger: st }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" style={Style}>
      <div className="px-5 py-10 mx-auto text-center lg:px-40">
        <div ref={headerRef} className="flex flex-col w-full mb-20">
          <CodeIcon className="mx-auto inline-block w-10 mb-4" />
          <p className="sm:text-4xl text-3xl font-semibold title-font mb-2">
            My <span className="text-purple-600">Projects</span>
          </p>
          <div className="flex justify-center mb-4">
            <LineGradient width="w-2/12" />
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            These are my projects, where I've gained hands-on experience and
            worked on various coding challenges.
          </p>
        </div>

        <div className="flex flex-wrap -m-4">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className="sm:w-1/2 w-full p-4"
            >
              {project.image ? (
                <div className="relative mb-2 rounded-lg overflow-hidden border-4 border-gray-800">
                  <img
                    alt="gallery"
                    className="w-full object-contain bg-gray-800"
                    src={project.image}
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-center opacity-0 hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: "rgba(17,24,39,0.95)" }}>
                    <h2 className="tracking-widest text-sm title-font font-medium text-purple-500 mb-1">
                      {project.subtitle}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-white mb-3">
                      {project.title}
                    </h1>
                    <p className="leading-relaxed text-white text-sm">
                      {project.description}
                    </p>
                    {project.link && (
                      <a href={project.link} className="border-2 border-purple-500 mt-2 self-center flex items-center justify-center gap-2 rounded px-4 py-2 hover:bg-purple-500 hover:text-white transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5" style={{ position: "static", margin: 0 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                        </svg>
                        <span>Preview</span>
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-2 rounded-lg border-4 border-gray-800 bg-gray-900 p-6 flex flex-col justify-center" style={{ minHeight: "280px" }}>
                  <h2 className="tracking-widest text-sm title-font font-medium text-purple-500 mb-1">
                    {project.subtitle}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-white mb-3">
                    {project.title}
                  </h1>
                  <p className="leading-relaxed text-white text-sm">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
