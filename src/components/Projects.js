import { CodeIcon, ExternalLinkIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef } from "react";
import { projects } from "../data";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge, Button, SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const t = themeTokens(theme);
  const projectCard = theme === "light" ? "theme-project-card-light" : "theme-project-card-dark";
  const projectMedia = theme === "light" ? "theme-project-media-light" : "theme-project-media-dark";
  const projectTech = theme === "light" ? "theme-project-tech-light" : "theme-project-tech-dark";
  const techChip = theme === "light" ? "theme-tech-chip-light" : "theme-tech-chip-dark";

  useEffect(() => {
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
  }, []);

  return (
    <section ref={sectionRef} id="projects" className={`${t.mutedPage} section-shell px-6 py-20`}>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Selected work"
            title="My"
            highlight="Projects"
            description="A mix of production work, client systems, and hands-on builds across web apps, API-driven features, database-backed workflows, and responsive interfaces."
            icon={<CodeIcon className={`h-10 w-10 ${t.accent}`} />}
            theme={theme}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
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
                  {project.tag && <Badge theme={theme}>{project.tag}</Badge>}
                  <Badge theme={theme} className="theme-cream-soft">
                    {project.image ? "Live build" : "Client work"}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold leading-tight">{project.title}</h3>
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
      </div>
    </section>
  );
}
