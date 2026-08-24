import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMediaQuery from "../utils/useMediaQuery";
import { Badge, Button, Card, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const techStackGroups = [
  {
    category: "Frontend",
    techs: ["HTML", "CSS", "JavaScript", "React", "Vue", "Tailwind CSS", "Bootstrap", "jQuery", "REST API"],
  },
  {
    category: "Backend",
    techs: ["Laravel", "Spring Boot", "Node.js"],
  },
  {
    category: "Databases",
    techs: ["Oracle SQL", "MySQL", "phpMyAdmin"],
  },
  {
    category: "Tools",
    techs: ["Git", "GitHub", "Jira", "Figma", "Agile/Scrum", "CI/CD"],
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { theme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const t = themeTokens(theme);
  const activeTechGroup = techStackGroups[activeTechIndex];

  const aboutDetails = (
    <div className="mt-6 max-w-lg">
      <p className={`text-sm leading-relaxed sm:text-base ${t.subtleText}`}>
        I build web interfaces that bridge design and function — turning UI concepts into intuitive solutions that solve real client problems.
      </p>
      <div className="mt-5 flex flex-row items-center gap-3">
        <Button
          as="a"
          href="/about"
          theme={theme}
          variant="outline"
          className="whitespace-nowrap px-4 text-xs sm:px-5 sm:text-sm"
        >
          About Me
          <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Button>
        <a
          href="https://www.linkedin.com/in/john-renz-pagdanganan-08b525217"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5 ${theme === "light" ? "border-surface-200 text-surface-600 hover:bg-surface-50 hover:text-surface-900" : "border-surface-700 text-surface-400 hover:bg-surface-800 hover:text-surface-200"}`}
          aria-label="LinkedIn"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a
          href="https://github.com/renzodevsxx101"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 hover:-translate-y-0.5 ${theme === "light" ? "border-surface-200 text-surface-600 hover:bg-surface-50 hover:text-surface-900" : "border-surface-700 text-surface-400 hover:bg-surface-800 hover:text-surface-200"}`}
          aria-label="GitHub"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </div>
    </div>
  );

  const techStackCard = (
    <Card theme={theme} className="w-full max-w-[400px] p-4 lg:min-h-[100%]">
      <div className="flex items-center justify-between gap-3">
        <p className="font-heading text-sm font-semibold">Core Tech Stacks</p>
        <div className="flex gap-1" aria-label="Tech stack slides">
          {techStackGroups.map((group, index) => (
            <button
              key={group.category}
              type="button"
              onClick={() => setActiveTechIndex(index)}
              className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${index === activeTechIndex ? "w-5 bg-primary-500" : "bg-surface-300"}`}
              aria-label={`Show ${group.category} stack`}
            />
          ))}
        </div>
      </div>
      <div key={activeTechGroup.category} className={`tech-stack-slide mt-3 min-h-[160px] rounded-lg p-3 ${t.softCard} border ${t.border}`}>
        <p className={`text-[10px] font-bold uppercase tracking-widest ${t.subtleText}`}>{activeTechGroup.category}</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {activeTechGroup.techs.map((tech) => (
            <Badge key={tech} theme={theme} className="rounded-md px-2 py-1 text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIndex((current) => (current + 1) % techStackGroups.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} id="about" className={`${t.page} section-shell px-5 py-20 sm:px-6 sm:py-24 lg:px-12`}>
      <div ref={contentRef} className="relative z-10 mx-auto max-w-6xl">
        {isDesktop ? (
          <div className="flex w-full items-start gap-0">
            <div className="flex w-1/2 flex-col items-start pr-8 text-left">
              <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Hi, I'm <span className={t.accent}>John Renz.</span>
              </h1>
              <p className={`mt-4 text-lg font-medium sm:text-xl ${t.mutedText}`}>
                Front-End Developer & Junior Full-Stack Engineer
              </p>
              <div className="mt-4">
                {aboutDetails}
              </div>
              <div className="mt-6">
                {techStackCard}
              </div>
            </div>
            <div className="relative flex w-1/2 flex-shrink-0 flex-col items-center justify-center pl-8">
              <div className="hero-floating-frame">
                <img
                  className="hero-plain-image hero-plain-image-desktop"
                  alt="John Renz Pagdanganan"
                  src="static/img/casual.JPG"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center text-center">
              <h1 className="font-heading max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Hi, I'm <span className={t.accent}>John Renz.</span>
              </h1>
              <p className={`mt-4 text-lg font-medium sm:text-xl ${t.mutedText}`}>
                Front-End Developer & Junior Full-Stack Engineer
              </p>
            </div>
            <div className="relative flex w-full max-w-[300px] flex-col items-center justify-center sm:max-w-[340px]">
              <div className="hero-floating-frame">
                <img
                  className="hero-plain-image"
                  alt="John Renz Pagdanganan"
                  src="static/img/casual2.JPG"
                />
              </div>
              <div className="mt-5 w-full">
                {aboutDetails}
              </div>
              <div className="mt-5 w-full">
                {techStackCard}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
