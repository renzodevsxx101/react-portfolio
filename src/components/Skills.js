import { ChipIcon } from "@heroicons/react/solid";
import React from "react";
import Skill from '../components/Skill';
import { useTheme } from "../context/ThemeContext";

export default function Skills() {
    const { theme } = useTheme();

    const aboutStyle = theme === "light"
        ? { backgroundColor: "#FEFAF6", color: "#000000" }
        : { backgroundColor: "#EFECEC", color: "#000000" };

    const skills = [
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg", alt: "React", title: "React" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg", alt: "HTML 5", title: "HTML 5" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg", alt: "CSS 3", title: "CSS 3" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-plain-wordmark.svg", title: "Tailwind CSS" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original-wordmark.svg", alt: "GitHub", title: "GitHub" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg", alt: "NPM", title: "NPM" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg", alt: "NodeJS", title: "Node JS" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", alt: "TypeScript", title: "TypeScript" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original-wordmark.svg", alt: "Bootstrap", title: "Bootstrap" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original-wordmark.svg", title: "Git" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", title: "AWS" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original-wordmark.svg", title: "Docker" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", title: "MongoDB" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg", title: "Sass" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original-wordmark.svg", title: "jQuery" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg", title: "Material UI" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", title: "Java" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg", title: "JSON" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg", title: "Postman" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg", title: "Oracle" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqldeveloper/sqldeveloper-original.svg", title: "SQL Developer" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", title: "Spring" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", title: "MySQL" },
        { source: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original-wordmark.svg", title: "Jira" }
    ];



    return (
        <section style={aboutStyle} id="skills" className="skills">
            <div className="px-5 py-10 flex flex-col justify-center mx-auto">
                <div className="text-center mb-10">
                    <ChipIcon className="w-10 inline-block mb-4" />
                    <h1 className="sm:text-4xl text-3xl font-medium title-font mb-4">
                        Skills &amp; Technologies
                    </h1>
                    <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                        Here are the skills and technologies I'm proficient in.
                    </p>
                </div>
                <div className="skillsGrid">
                    {skills.map((skill, index) => (
                        <Skill key={index} {...skill} />
                    ))}
                </div>
            </div>
        </section>
    );
}
