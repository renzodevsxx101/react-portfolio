import { ArrowLeftIcon, ArrowRightIcon, CodeIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge, Button, SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_PER_PAGE = 4;

const tabs = [
  { key: "personal", label: "Personal" },
  { key: "client", label: "Client" },
];

export default function Projects({ showAll = false }) {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const t = themeTokens(theme);
  const projectCard = theme === "light" ? "theme-project-card-light" : "theme-project-card-dark";
  const projectMedia = theme === "light" ? "theme-project-media-light" : "theme-project-media-dark";
  const projectTech = theme === "light" ? "theme-project-tech-light" : "theme-project-tech-dark";
  const techChip = theme === "light" ? "theme-tech-chip-light" : "theme-tech-chip-dark";
  const [activeTab, setActiveTab] = useState("personal");

  const filteredProjects = projects.filter((p) => p.type === activeTab);
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, PROJECTS_PER_PAGE);

  useEffect(() => {
    if (showAll) {
      window.scrollTo(0, 0);
    }
  }, [showAll]);

  useEffect(() => {
    cardsRef.current = [];
    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      };

      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power2.out", scrollTrigger: st }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.08,
            ease: "power2.out",
            scrollTrigger: st,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section ref={sectionRef} id="projects" className={`${t.mutedPage} section-shell px-6 ${showAll ? "pb-20 pt-4 sm:pt-6" : "py-20"}`}>
      <div className="relative z-10 mx-auto max-w-7xl pb-16">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Selected work"
            title="My"
            highlight="Projects"
            icon={<CodeIcon className={`h-10 w-10 ${t.accent}`} />}
            theme={theme}
          />
        </div>

        {showAll && (
          <div className="mb-6 flex justify-start">
            <Button theme={theme} as={Link} to="/" variant="ghost" className="gap-2 px-3 text-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        )}

        <div className="mb-10 flex justify-center">
          <div className={`inline-flex gap-1 rounded-lg border p-1 ${t.softCard}`}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-md px-5 py-2 text-sm font-semibold transition ${
                  activeTab === tab.key ? t.accentBg : t.mutedText
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "client" && (
          <p className={`mb-6 text-center text-xs font-semibold uppercase tracking-wide ${t.mutedText}`}>
            Note: <span className={`${t.accent}`}>Confidential</span> — project names and previews are hidden
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <article
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`flex h-full flex-col overflow-hidden rounded-lg border ${projectCard} transition duration-300 hover:-translate-y-1 ${t.hoverBorder}`}
            >
              {project.image && (
                <div className={`${projectMedia} aspect-video overflow-hidden border-b p-3`}>
                  <img
                    alt={project.title}
                    className="h-full w-full rounded-md object-cover shadow-sm transition duration-500 hover:scale-105"
                    src={project.image}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="mb-5 flex flex-wrap gap-2">
                  <Badge theme={theme} className="theme-cream-soft">
                    {project.type === "personal" ? "Personal" : "Client"}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold leading-tight">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <div className={`${projectTech} mt-4 flex flex-wrap gap-2 rounded-md border`}>
                    {project.subtitle.split(",").map((tech) => (
                      <span
                        key={`${project.title}-${tech.trim()}`}
                        className={`${techChip} inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-semibold leading-tight`}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <p className={`mt-4 flex-1 text-base leading-7 ${t.mutedText}`}>
                  {project.description}
                </p>
                {project.link && (
                  <Button
                    theme={theme}
                    as="a"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    className="mt-6 self-start"
                  >
                    <ExternalLinkIcon className="h-5 w-5" />
                    Preview
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>

        {!showAll && filteredProjects.length > PROJECTS_PER_PAGE && (
          <div className="mt-6 flex justify-center">
            <Button theme={theme} as={Link} to="/projects">
              View More Projects
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
