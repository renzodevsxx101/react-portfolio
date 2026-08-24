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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: st }
      );

      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.06,
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
      <div className="relative z-10 mx-auto max-w-6xl pb-16">
        {showAll && (
          <div className="mb-6 flex justify-start">
            <Button theme={theme} as={Link} to="/" variant="ghost" className="gap-2 px-3 text-sm">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        )}
        <div ref={headerRef}>
          <SectionHeader
            // eyebrow="Selected work"
            title="My"
            highlight="Projects"
            icon={<CodeIcon className={`h-8 w-8 ${t.accent}`} />}
            theme={theme}
          />
        </div>

        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className={`inline-flex gap-1 rounded-full border p-1 ${t.softCard}`}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key ? t.accentBg : t.mutedText
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {!showAll && (
            <Button theme={theme} as={Link} to="/projects" variant="primary" className="gap-2 px-4 text-sm whitespace-nowrap">
              View All
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          )}
        </div>

        {activeTab === "client" && (
          <p className={`mb-6 text-center text-[11px] font-semibold uppercase tracking-widest ${t.subtleText}`}>
            Note: <span className={`${t.accent}`}>Confidential</span> — project names and previews are hidden
          </p>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <article
              key={project.title}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`flex h-full flex-col overflow-hidden rounded-xl border ${projectCard} transition-all duration-300 hover:-translate-y-0.5 ${t.hoverBorder}`}
            >
              {project.image && (
                <div className={`${projectMedia} aspect-video overflow-hidden border-b p-2`}>
                  <img
                    alt={project.title}
                    className="h-full w-full rounded-lg object-cover transition-transform duration-500 hover:scale-105"
                    src={project.image}
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <Badge theme={theme}>
                    {project.type === "personal" ? "Personal" : "Client"}
                  </Badge>
                </div>
                <h3 className="font-heading text-xl font-semibold leading-tight">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <div className={`${projectTech} mt-3 flex flex-wrap gap-1.5`}>
                    {project.subtitle.split(",").map((tech) => (
                      <span
                        key={`${project.title}-${tech.trim()}`}
                        className={`${techChip} inline-flex items-center rounded-md border px-2 py-1 text-[10px] font-medium leading-tight`}
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <p className={`mt-3 flex-1 text-sm leading-relaxed ${t.mutedText}`}>
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
                    className="mt-4 self-start"
                  >
                    <ExternalLinkIcon className="h-4 w-4" />
                    Preview
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
