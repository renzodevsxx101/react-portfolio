import { BriefcaseIcon, ChevronDownIcon } from "@heroicons/react/solid";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import { Card, SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Bootstrap Developer (Front-End)",
    company: "ThinkBIT Solutions Phils Inc",
    logo: "https://thinkbitsolutions.com/wp-content/uploads/2025/06/logo.png",
    period: "Jan 2025 - Present",
    duration: "Current",
    tags: ["Vue.js",  "jQuery", "AJAX", "SASS/SCSS", "Bootstrap", "Tailwind CSS","MySQL", "Laravel", "Spring Boot", "RESTful API Integration", "Agile/Scrum", "Unit Testing", "CI/CD Pipelines"],
    description: [
      "Participate in planning and provide input to work estimations.",
      "Develop components according to specifications and established standards.",
      "Debug and troubleshoot front-end issues across responsive web applications.",
      "Write and run unit tests to validate component behavior and support stable releases.",
      "Collaborate with UI/UX designers, backend developers, and Business Analysts to translate wireframes, APIs, and requirements into functional web applications.",
      "Participate in Agile Scrum activities including daily stand-ups, sprint reviews, and retrospectives.",
    ],
  },
  {
    title: "Junior Developer",
    company: "Computer Professionals Inc.",
    logo: "/static/img/cpi-logo.jpg",
    period: "Sept 2023 - Dec 2024",
    duration: "1 yr 4 mos",
    tags: ["React.js", "SCSS", "jQuery", "Oracle SQL", "Spring Boot", "RESTful API Integration", "Bootstrap", "AJAX", "Responsive Web Design", "Agile"],
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
    logo: "/static/img/bulsu-logo.webp",
    period: "Jun 2022 - Aug 2022",
    duration: "3 mos",
    tags: ["AutoCAD", "CAD Design", "Documentation", "Site Inspection"],
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

function ExperienceCard({ exp, index, isLast, theme, isExpanded, onToggle }) {
  const cardRef = useRef(null);
  const itemRef = useRef(null);
  const t = themeTokens(theme);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      cardRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={itemRef} className="relative flex gap-5 pb-8 last:pb-0 sm:gap-6">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className={`relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 ${t.softCard} sm:h-16 sm:w-16`} style={{ borderColor: isExpanded ? "var(--tw-accent, #D97706)" : undefined }}>
          <img
            src={exp.logo}
            alt={`${exp.company} logo`}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("exp-logo-fallback");
            }}
          />
          <span className={`absolute hidden text-lg font-bold ${t.accent}`}>{exp.company.charAt(0)}</span>
        </div>
        {/* Line */}
        {!isLast && (
          <div className={`w-0.5 flex-1 ${t.softCard}`} />
        )}
      </div>

      {/* Card */}
      <Card ref={cardRef} theme={theme} className="flex-1 overflow-hidden">
          <div
            className="flex w-full cursor-pointer flex-col gap-3 p-5 text-left sm:flex-row sm:items-start sm:justify-between sm:p-6"
            onClick={onToggle}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onToggle(); }}
          >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold sm:text-xl">{exp.title}</h3>
            </div>
            <p className={`mt-1 font-semibold ${t.accent}`}>{exp.company}</p>
            <p className={`mt-2 text-xs font-medium uppercase tracking-wide ${t.mutedText}`}>{exp.period}</p>

            {/* Tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className={`inline-block rounded-full px-3 py-1 text-[11px] font-medium ${t.softCard} ${t.mutedText}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

            <div className="flex items-center gap-2 self-start sm:flex-col sm:items-end sm:gap-1.5">
              {exp.duration && (
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${t.accentBg}`}>
                  {exp.duration}
                </span>
              )}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggle(); }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${t.softCard} ${t.mutedText} hover:opacity-80`}
              >
                View Details
                <ChevronDownIcon
                  className={`h-4 w-4 flex-shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </div>

        <div
          className="px-5 sm:px-6"
          style={{
            maxHeight: isExpanded ? "600px" : "0px",
            opacity: isExpanded ? 1 : 0,
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease, padding 0.35s ease",
            paddingBottom: isExpanded ? "1.5rem" : "0px",
          }}
        >
          <div className={`border-t ${t.border} mb-4`} />
          <ul className={`space-y-2.5 text-left text-sm leading-6 ${t.mutedText}`}>
            {exp.description.map((item) => (
              <li key={item} className="flex gap-3">
                <span className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${t.warmBg}`} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default function WorkExperience() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const t = themeTokens(theme);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

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
    <section ref={sectionRef} id="experience" className={`${t.mutedPage} px-6 py-20`}>
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Experience"
            title="Work"
            highlight="Experience"
            icon={<BriefcaseIcon className={`h-10 w-10 ${t.accent}`} />}
            theme={theme}
          />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.title}
              exp={exp}
              index={index}
              isLast={index === experiences.length - 1}
              theme={theme}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
