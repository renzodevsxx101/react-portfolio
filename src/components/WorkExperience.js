import { BriefcaseIcon } from "@heroicons/react/solid";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { Badge, Card, SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Bootstrap Developer (Front-End)",
    company: "ThinkBIT Solutions Phils Inc",
    period: "Jan 2025 - Present",
    description: [
      "Participate in planning and provide input to work estimations.",
      "Develop components according to specifications and established standards.",
      "Debug and troubleshoot front-end issues across responsive web applications.",
      "Collaborate with UI/UX designers, backend developers, and Business Analysts to translate wireframes, APIs, and requirements into functional web applications.",
      "Participate in Agile Scrum activities including daily stand-ups, sprint reviews, and retrospectives.",
    ],
  },
  {
    title: "Junior Developer",
    company: "Computer Professionals Inc.",
    period: "Sept 2023 - Dec 2025",
    description: [
      "Developed responsive and interactive web interfaces.",
      "Optimized front-end performance for speed and scalability.",
      "Collaborated with UI/UX designers, backend developers, and Systems Analysts to ship functional web applications.",
      "Maintained code quality through version control and practical documentation.",
      "Conducted manual unit testing to support reliable feature delivery.",
    ],
  },
  {
    title: "Design Engineering Intern",
    company: "Planning and Development Office - BulSU",
    period: "Jun 2022 - Aug 2022",
    description: [
      "Developed detailed CAD designs and layouts for auxiliary systems.",
      "Collaborated with the design engineering team to align project objectives and address design challenges.",
      "Revised base plans and performed design estimations to improve project accuracy and feasibility.",
      "Created and compiled comprehensive project reports.",
      "Converted DWG files to PDF format for documentation purposes.",
      "Conducted site visits and inspections.",
    ],
  },
];

function TimelineItem({ exp, index, isLast, theme }) {
  const dotRef = useRef(null);
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const itemRef = useRef(null);
  const t = themeTokens(theme);
  const isLight = theme === "light";

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      dotRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.7)" }
    );

    if (!isLast && lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 0.9, ease: "power2.out" },
        "-=0.3"
      );
    }

    tl.fromTo(
      cardRef.current,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [isLast]);

  return (
    <div ref={itemRef} className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
      {!isLast && (
        <div
          ref={lineRef}
          className={`absolute left-[19px] top-10 h-full w-0.5 ${t.warmBg}`}
        />
      )}
      <div className="relative z-10 flex-shrink-0">
        <div
          ref={dotRef}
          className={`flex h-10 w-10 items-center justify-center rounded-full ${t.accentBg} ring-4 ${isLight ? "ring-white" : "theme-sahara-ring"}`}
        >
          <span className={`text-sm font-bold ${isLight ? "text-white" : "text-black"}`}>{index + 1}</span>
        </div>
      </div>
      <Card ref={cardRef} theme={theme} className="flex-1 p-5 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 text-left sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-bold">{exp.title}</h3>
            <p className={`mt-1 font-semibold ${t.accent}`}>{exp.company}</p>
          </div>
          <Badge theme={theme} className="self-start whitespace-nowrap">{exp.period}</Badge>
        </div>
        <ul className={`space-y-2 text-left text-sm leading-6 ${t.mutedText}`}>
          {exp.description.map((item) => (
            <li key={item} className="flex gap-3">
              <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${t.warmBg}`} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default function WorkExperience() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const t = themeTokens(theme);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
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

  return (
    <section ref={sectionRef} id="experience" className={`${t.page} px-6 py-20`}>
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Experience"
            title="Work"
            highlight="Experience"
            description="A timeline of my professional journey and key contributions."
            icon={<BriefcaseIcon className={`h-10 w-10 ${t.accent}`} />}
            theme={theme}
          />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={exp.title}
              exp={exp}
              index={index}
              isLast={index === experiences.length - 1}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
