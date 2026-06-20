import { BriefcaseIcon } from "@heroicons/react/solid";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../context/ThemeContext";
import LineGradient from "../components/LineGradient";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: "Bootstrap Developer (Front-End)",
    company: "ThinkBIT Solutions Phils Inc",
    period: "Jan 2025 - Present",
    description:
      `Participation in planning and providing input to work estimations.
Development of components according to the specifications received and established standards; delivery of timely components with proper quality.
Conducted debugging and troubleshooting of front-end issues.
Collaborated with UI/UX designers, backend developers, and Business Analysts to translate wireframes, APIs and requirements into functional web applications
Built responsive web applications using a mobile-first approach with cross-browser compatibility
Participated in Agile Scrum activities including daily stand-ups, sprint reviews, and retrospectives`,
  },
  {
    title: "Junior Developer",
    company: "Computer Professionals Inc.",
    period: "Sept  2023 -  Dec 2025",
    description:
      `Developed responsive and interactive web interfaces
Optimized front-end performance for maximum speed and scalability.
Collaborated with UI/UX designers, backend developers, and Systems Analysts to translate wireframes, APIs and requirements into functional web applications
Conducted debugging and troubleshooting of front-end issues
Optimized front-end performance for maximum speed and scalability
Maintained code quality through version control systems
Conducted manual unit testing to achieve 90% code coverage and maintained detailed documentation for future development.`,
  },
  {
    title: "Design Engineering Intern",
    company: "Planning and Development Office - BulSU",
    period: "Jun 2022 - Aug 2022",
    description:
      `Developed detailed CAD designs and layouts for auxiliary systems.
• Collaborated with the design engineering team to align project objectives and address design challenges.
• Revised base plans and performed design estimations to improve project accuracy and feasibility.
• Created and compiled comprehensive project reports.
• Converted DWG files to PDF format for documentation purposes.
• Conducted site visits and inspections.`,
  },
];

function TimelineItem({ exp, index, isLast, theme }) {
  const dotRef = useRef(null);
  const lineRef = useRef(null);
  const cardRef = useRef(null);
  const itemRef = useRef(null);

  const isLight = theme === "light";

  const dotClasses = isLight
    ? "bg-purple-600 ring-white"
    : "bg-purple-500 ring-gray-900";

  const lineClasses = isLight ? "bg-gray-400" : "bg-gray-600";

  const cardClasses = isLight
    ? "bg-white/60 border-gray-300"
    : "bg-white/10 border-gray-700";

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
  }, [isLast, isLight]);

  return (
    <div ref={itemRef} className="relative flex gap-6 pb-12 last:pb-0">
      {!isLast && (
        <div ref={lineRef} className={`absolute left-[19px] top-10 w-0.5 h-full ${lineClasses}`} />
      )}
      <div className="flex-shrink-0 relative z-10">
        <div ref={dotRef} className={`w-10 h-10 rounded-full ${dotClasses} flex items-center justify-center ring-4`}>
          <span className="text-white text-sm font-bold">{index + 1}</span>
        </div>
      </div>
      <div ref={cardRef} className={`flex-1 text-left rounded-xl p-6 border ${cardClasses}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h3 className="text-xl font-semibold">{exp.title}</h3>
          <span className="text-sm opacity-70">{exp.period}</span>
        </div>
        <p className="text-purple-500 font-medium mb-2">{exp.company}</p>
        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
        {exp.description.split("\n").filter(Boolean).map((item, i) => (
          <li key={i}>{item.replace(/^[•\s]+/, "")}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default function WorkExperience() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  const sectionStyle =
    theme === "light"
      ? { backgroundColor: "#d0d0d0", color: "#000000" }
      : { backgroundColor: "#010026", color: "#ffffff" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" style={sectionStyle}>
      <div className="px-5 py-10 mx-auto text-center lg:px-40">
        <div ref={headerRef} className="flex flex-col w-full mb-20">
          <BriefcaseIcon className="mx-auto inline-block w-10 mb-4" />
          <p className="sm:text-4xl text-3xl font-semibold title-font mb-2">
            Work <span className="text-purple-600">Experience</span>
          </p>
          <div className="flex justify-center mb-4">
            <LineGradient width="w-2/12" />
          </div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            A timeline of my professional journey and key contributions.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
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
