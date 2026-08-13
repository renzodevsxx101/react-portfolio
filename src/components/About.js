import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import getThemeStyles from "../components/Theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DownloadIcon, MailIcon, SparklesIcon } from "@heroicons/react/solid";
import { Badge, Button, Card, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);


const dlCV = () => {
  const link = document.createElement("a");
  link.href = "./CV2.pdf";
  link.download = "Pagdanganan_JohnRenz - CV 2026.pdf";
  link.click();
}

const techStackGroups = [
  {
    category: "Frontend",
    techs: ["HTML", "CSS", "JavaScript", "AJAX", "jQuery", "React", "React Router", "Axios", "Vue", "Vue Router", "Pinia", "Bootstrap", "Tailwind"],
  },
  {
    category: "Backend",
    techs: ["Laravel", "Spring Boot"],
  },
  {
    category: "Databases",
    techs: ["Oracle SQL", "MySQL", "Oracle Database"],
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { theme } = useTheme();
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const t = themeTokens(theme);
  const activeTechGroup = techStackGroups[activeTechIndex];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
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
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className={`${getThemeStyles(theme)} section-shell px-5 pt-20 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-12 lg:pt-28`} id="about">
      <div ref={contentRef} className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex w-full flex-col items-center text-center lg:max-w-3xl lg:items-start lg:text-left lg:pr-10">
          <Badge theme={theme} className="mb-4">
            <SparklesIcon className="mr-2 h-4 w-4" />
            Frontend development, open to junior full-stack or junior software roles
          </Badge>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Building clean frontend experiences and practical web application features.
          </h1>
          <p className={`mt-4 text-lg font-semibold sm:text-xl ${t.accent}`}>
            Web Developer based in Bulacan, Philippines, open to junior full-stack or junior software roles.
          </p>
          <p className={`mt-3 max-w-2xl text-base leading-7 sm:mt-4 sm:text-lg ${t.mutedText}`}>
            I'm John Renz Pagdanganan, a web developer from Bulacan with experience building responsive interfaces, integrating APIs, and supporting database-backed CRUD workflows. My main strength is frontend development, and I am also open to junior full-stack or junior software roles.
          </p>
          <div className="hidden lg:mt-6 lg:flex lg:items-start lg:gap-3">
            <Button theme={theme} as="a" href="#contact">
              <MailIcon className="h-5 w-5" />
              Contact Me
            </Button>
            <Button theme={theme} variant="outline" onClick={dlCV}>
              <DownloadIcon className="h-5 w-5" />
              Download CV
            </Button>
          </div>
          <div className="hidden lg:mt-8 lg:grid lg:w-full lg:max-w-2xl lg:grid-cols-2 lg:gap-3">
            {[
              ["3+", "Years exp."],
              ["15+", "Projects"],
            ].map(([value, label]) => (
              <Card key={label} theme={theme} className="p-4 text-center">
                <p className="text-2xl font-bold">{value}</p>
                <p className={`mt-1 text-xs font-semibold uppercase ${t.subtleText}`}>{label}</p>
              </Card>
            ))}
            <Card theme={theme} className="col-span-2 p-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold">Tech Stack Expertise</p>
                <div className="flex gap-1.5" aria-label="Tech stack slides">
                  {techStackGroups.map((group, index) => (
                    <button
                      key={group.category}
                      type="button"
                      onClick={() => setActiveTechIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full border transition ${index === activeTechIndex ? t.accentBg : t.badge}`}
                      aria-label={`Show ${group.category} stack`}
                    />
                  ))}
                </div>
              </div>
              <div key={activeTechGroup.category} className={`tech-stack-slide mt-3 min-h-[132px] rounded-md border p-3 ${t.softCard}`}>
                <p className={`text-xs font-bold uppercase ${t.subtleText}`}>{activeTechGroup.category}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeTechGroup.techs.map((tech) => (
                    <span key={tech} className={`${t.badge} inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-semibold`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="relative flex w-full max-w-[320px] flex-shrink-0 justify-center sm:max-w-md lg:ml-auto lg:max-w-[460px] lg:justify-end xl:max-w-[500px]">
          <div className={`w-full rounded-lg border p-3 ${theme === "light" ? "hero-portrait-light" : "theme-card-dark"}`}>
            <div className={`overflow-hidden rounded-md ${theme === "light" ? "hero-portrait-media-light" : "theme-page-dark"}`}>
              <img
                className="mx-auto h-auto w-full object-cover object-center"
                alt="John Renz Pagdanganan"
                src="me.png"
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold">John Renz</p>
                <p className={`text-xs ${t.subtleText}`}>Web Developer</p>
              </div>
              <Badge theme={theme}>Bulacan, PH</Badge>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center text-center lg:hidden">
          <div className="mt-2 flex flex-col items-center gap-3 sm:mt-6 sm:flex-row">
            <Button theme={theme} as="a" href="#contact">
              <MailIcon className="h-5 w-5" />
              Contact Me
            </Button>
            <Button theme={theme} variant="outline" onClick={dlCV}>
              <DownloadIcon className="h-5 w-5" />
              Download CV
            </Button>
          </div>
          <div className="mt-6 grid w-full max-w-2xl grid-cols-2 gap-3 sm:mt-8">
            {[
              ["3+", "Years exp."],
              ["15+", "Projects"],
            ].map(([value, label]) => (
              <Card key={label} theme={theme} className="p-4 text-center">
                <p className="text-2xl font-bold">{value}</p>
                <p className={`mt-1 text-xs font-semibold uppercase ${t.subtleText}`}>{label}</p>
              </Card>
            ))}
            <Card theme={theme} className="col-span-2 p-4 text-left">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-bold">Tech Stack Expertise</p>
                <div className="flex gap-1.5" aria-label="Tech stack slides">
                  {techStackGroups.map((group, index) => (
                    <button
                      key={group.category}
                      type="button"
                      onClick={() => setActiveTechIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full border transition ${index === activeTechIndex ? t.accentBg : t.badge}`}
                      aria-label={`Show ${group.category} stack`}
                    />
                  ))}
                </div>
              </div>
              <div key={activeTechGroup.category} className={`tech-stack-slide mt-3 min-h-[132px] rounded-md border p-3 ${t.softCard}`}>
                <p className={`text-xs font-bold uppercase ${t.subtleText}`}>{activeTechGroup.category}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeTechGroup.techs.map((tech) => (
                    <span key={tech} className={`${t.badge} inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-semibold`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
