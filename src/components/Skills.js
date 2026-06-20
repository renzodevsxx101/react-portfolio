import { ChipIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef } from "react";
import Skill from "../components/Skill";
import LineGradient from "../components/LineGradient";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", title: "Vanilla JS" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original-wordmark.svg", title: "jQuery" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg", title: "Material UI" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", title: "Java" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg", title: "JSON" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", title: "Postman" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original-wordmark.svg", title: "Vue JS" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain-wordmark.svg", title: "Axios" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original-wordmark.svg", title: "Laravel" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/thymeleaf/thymeleaf-original-wordmark.svg", title: "Thymeleaf" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vagrant/vagrant-original-wordmark.svg", title: "Vagrant" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg", title: "Oracle" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg", title: "SQL Developer" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", title: "Spring" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", title: "MySQL" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original-wordmark.svg", title: "Jira" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", title: "Figma" },
  { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-original.svg", title: "Adobe XD" },
  { source: "https://cdn.simpleicons.org/anthropic", title: "Claude Code" },
  { source: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238B5CF6'%3E%3Cpath d='M12 2l10 5-10 5L2 7zM2 17l10 5 10-5M2 12l10 5 10-5'/%3E%3C/svg%3E", title: "Antigravity" },
  { source: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238B5CF6'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z'/%3E%3C/svg%3E", title: "Codex" },
];

export default function Skills() {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const aboutStyle =
    theme === "light"
      ? { backgroundColor: "#d0d0d0", color: "#000000" }
      : { backgroundColor: "rgb(1, 0, 38)", color: "#ffffff" };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" };

      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.3, ease: "power2.out", scrollTrigger: st }
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
    <section ref={sectionRef} style={aboutStyle} id="skills" className="skills">
      <div className="px-5 py-10 flex flex-col justify-center mx-auto">
        <div ref={headerRef} className="text-center mb-10">
          <ChipIcon className="w-10 inline-block mb-4" />
          <p className="sm:text-4xl text-3xl font-semibold title-font mb-2">
            Skills &amp;<span className="text-purple-600"> Technologies</span>
          </p>
          <div className="flex justify-center mb-4">
            <LineGradient width="w-2/12" />
          </div>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Here are the skills and technologies I'm proficient in.
          </p>
        </div>

        <div ref={gridRef} className="skillsGrid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center mx-auto">
          {skills.map((skill, index) => (
            <div key={index}>
              <Skill {...skill} theme={theme} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
