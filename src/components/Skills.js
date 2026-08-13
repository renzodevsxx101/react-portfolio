import { ChipIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef } from "react";
import Skill from "../components/Skill";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg", alt: "React", title: "React" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg", alt: "HTML 5", title: "HTML 5" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg", alt: "CSS 3", title: "CSS 3" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain-wordmark.svg", title: "Tailwind CSS" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg", alt: "GitHub", title: "GitHub" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original-wordmark.svg", title: "GitLab" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bitbucket/bitbucket-original-wordmark.svg", title: "Bitbucket" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", alt: "NPM", title: "NPM" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg", alt: "NodeJS", title: "Node JS" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript", title: "TypeScript" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg", alt: "Bootstrap", title: "Bootstrap" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg", title: "Git" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg", title: "Sass" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", title: "JavaScript" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original-wordmark.svg", title: "jQuery" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg", title: "Material UI" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", title: "Java" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg", title: "JSON" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", title: "Postman" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original-wordmark.svg", title: "Vue JS" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain-wordmark.svg", title: "Axios" },
  { title: "AJAX" },
  { title: "React Router" },
  { title: "Vue Router" },
  { title: "Pinia" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original-wordmark.svg", title: "Laravel" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/thymeleaf/thymeleaf-original-wordmark.svg", title: "Thymeleaf" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vagrant/vagrant-original-wordmark.svg", title: "Vagrant" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg", title: "Oracle Database" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg", title: "Oracle SQL" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", title: "Spring Boot" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", title: "MySQL" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original-wordmark.svg", title: "Jira" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", title: "Figma" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg", title: "Adobe XD" },
  { source: "https://cdn.simpleicons.org/anthropic", title: "Claude Code" },
  { source: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238B5CF6'%3E%3Cpath d='M12 2l10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E", title: "Antigravity" },
  { source: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238B5CF6'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z'/%3E%3C/svg%3E", title: "Codex" },
];

const expertise = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "AJAX", "jQuery", "React", "React Router", "Axios", "Vue", "Vue Router", "Pinia", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Backend",
    items: ["Laravel", "Spring Boot"],
  },
  {
    title: "Databases",
    items: ["Oracle SQL", "MySQL", "Oracle Database"],
  },
];

export default function Skills() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const expertiseRef = useRef(null);
  const gridRef = useRef(null);
  const t = themeTokens(theme);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" };

      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power2.out", scrollTrigger: st }
      );

      gsap.fromTo(
        expertiseRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out",
          scrollTrigger: st }
      );

      gsap.fromTo(
        gridRef.current.children,
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: "power2.out",
          scrollTrigger: st }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className={`${t.page} px-6 py-20`}>
      <div className="mx-auto flex max-w-7xl flex-col justify-center">
        <div ref={headerRef}>
          <SectionHeader
            eyebrow="Toolkit"
            title="Skills &"
            highlight="Technologies"
            description="The tools I use to build, maintain, test, and collaborate on modern web applications."
            icon={<ChipIcon className={`h-10 w-10 ${t.accent}`} />}
            theme={theme}
          />
        </div>

        <div ref={expertiseRef} className="mb-8 grid gap-4 md:grid-cols-3">
          {expertise.map((group) => (
            <div key={group.title} className={`rounded-lg border p-5 ${t.card}`}>
              <h3 className="text-lg font-bold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className={`${t.badge} inline-flex items-center rounded-md border px-3 py-1.5 text-xs font-semibold`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill, index) => (
            <div key={skill.title || index}>
              <Skill {...skill} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
