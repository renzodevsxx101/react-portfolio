import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import getThemeStyles from "../components/Theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DownloadIcon, MailIcon } from "@heroicons/react/solid";
import useMediaQuery from "../utils/useMediaQuery";
import { Badge, Button, Card, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);


const dlCV = () => {
  const link = document.createElement("a");
  link.href = "./CV3.pdf";
  link.download = "Pagdanganan_JohnRenz - CV 2026.pdf";
  link.click();
}

const techStackGroups = [
  {
    category: "Frontend",
    techs: ["HTML", "CSS", "JavaScript", "AJAX", "jQuery", "React", "React Router", "Axios", "Vue", "Vue Router", "Pinia", "Bootstrap", "Tailwind CSS", "REST API", "Third-party API Integration"],
  },
  {
    category: "Backend",
    techs: ["Laravel", "Spring Boot"],
  },
  {
    category: "Databases",
    techs: ["Oracle SQL", "MySQL", "Oracle Database", "HeidiSQL", "phpMyAdmin"],
  },
  {
    category: "Workflow",
    techs: ["Agile/Scrum", "SDLC", "Exposure to CI/CD Pipelines"],
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const { theme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [activeTechIndex, setActiveTechIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const t = themeTokens(theme);
  const activeTechGroup = techStackGroups[activeTechIndex];
  const actionButtons = (
    <div className="flex w-full flex-row items-center justify-center gap-2 sm:gap-3 lg:justify-start">
      <Button theme={theme} as="a" href="#contact" className="whitespace-nowrap px-3 text-xs sm:px-5 sm:text-sm">
        <MailIcon className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
        Contact Me
      </Button>
      <Button theme={theme} variant="outline" onClick={dlCV} className="whitespace-nowrap px-3 text-xs sm:px-5 sm:text-sm">
        <DownloadIcon className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
        Download CV
      </Button>
    </div>
  );
  const techStackCard = (
    <Card theme={theme} className="w-full max-w-[420px] p-5 text-left lg:min-h-[100%]">
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
      <div key={activeTechGroup.category} className={`tech-stack-slide mt-4 min-h-[190px] rounded-md border p-4 ${t.softCard}`}>
        <p className={`text-xs font-bold uppercase ${t.subtleText}`}>{activeTechGroup.category}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {activeTechGroup.techs.map((tech) => (
            <Badge key={tech} theme={theme} className="rounded-md px-2.5 py-1.5 text-[11px]">
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
    const words = [
      "Front-End Developer based in Bulacan, Philippines.",
      "Open to front-end or junior full-stack roles.",
    ];
    let wordIndex = 0;
    let offset = 0;
    let forwards = true;
    let pauseCount = 0;
    const pauseDelay = 15;

    const interval = setInterval(() => {
      const word = words[wordIndex];

      if (forwards && offset >= word.length) {
        pauseCount += 1;
        if (pauseCount === pauseDelay) {
          forwards = false;
          pauseCount = 0;
        }
      } else if (!forwards && offset === 0) {
        forwards = true;
        wordIndex = (wordIndex + 1) % words.length;
      }

      if (pauseCount === 0) {
        offset += forwards ? 1 : -1;
      }

      setTypedText(word.substring(0, offset));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechIndex((current) => (current + 1) % techStackGroups.length);
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className={`${getThemeStyles(theme)} section-shell px-5 pt-20 pb-14 sm:px-6 sm:pt-24 sm:pb-20 lg:px-12 lg:pt-28`} id="about">
      <div ref={contentRef} className="relative z-10 mx-auto max-w-7xl">
        {isDesktop ? (
          <div className="flex w-full items-start gap-0">
            <div className="flex w-1/2 flex-col items-start pr-8 text-left">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Hi, I'm <span className={t.warm}>John Renz.</span>
              </h1>
              <p className={`mt-4 text-lg font-semibold sm:text-xl ${t.accent}`}>
                <span className="word inline-flex min-h-[1.75rem]">{typedText}</span>
              </p>
              <div className="mt-5">
                {actionButtons}
              </div>
              <div className="mt-5">
                {techStackCard}
              </div>
            </div>
            <div className="relative flex w-1/2 flex-shrink-0 flex-col items-center justify-center pl-8">
              <div className="hero-floating-frame">
                <img
                  className="hero-plain-image hero-plain-image-desktop"
                  alt="John Renz Pagdanganan"
                  src="static/img/pic-lightened.png"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center text-center">
              <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
                Hi, I'm <span className={t.warm}>John Renz.</span>
              </h1>
              <p className={`mt-4 text-lg font-semibold sm:text-xl ${t.accent}`}>
                <span className="word inline-flex min-h-[1.75rem]">{typedText}</span>
              </p>
            </div>
            <div className="relative flex w-full max-w-[300px] flex-col items-center justify-center sm:max-w-[380px]">
              <div className="hero-floating-frame">
                <img
                  className="hero-plain-image"
                  alt="John Renz Pagdanganan"
                  src="static/img/pic-lightened.png"
                />
              </div>
              <div className="mt-5">
                {actionButtons}
              </div>
              <div className="mt-5">
                {techStackCard}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
