import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import {ArrowRightIcon} from "@heroicons/react/solid";
import gsap from "gsap";
import { themeTokens, Button } from "./ui";

const stats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "11+", label: "Satisfied Clients" },
  { value: "3+", label: "Years Experience" },
];

export default function Hero() {
  const { theme } = useTheme();
  const t = themeTokens(theme);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        contentRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
      );

      tl.fromTo(
        statsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`section-shell flex items-center px-6 pt-28 pb-16 sm:px-8 lg:px-12`}
    >
      <div className="mx-auto w-full max-w-6xl text-center">
        <div ref={contentRef} className="flex flex-col items-center">

          <h1 className={`font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl pt-2 ${t.warm}`}>
            John Renz
            <br />
            <span className="text-primary-500 dark:text-primary-400">Pagdanganan</span>
          </h1>

          <div className="mt-10 max-w-2xl">
            <p className={`mt-4 text-base leading-relaxed sm:text-lg ${t.subtleText}`}>
                I'm a Front-End Developer and Junior Full-Stack Engineer with 3 years of experience building responsive, user-friendly web applications. Experienced in developing and maintaining web applications for both local and international clients.            </p>
          </div>

          <div className="mt-4 mb-5 flex flex-wrap items-center justify-center gap-4">
            <Button
              as="a"
              href="#projects"
              theme={theme}
              variant="primary"
              className="px-6"
            >
              View Projects
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button
              as="a"
              href="/about"
              theme={theme}
              variant="secondary"
              className="px-6"
            >
              View Services
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={statsRef} className={`mt-20 flex flex-wrap items-center justify-center gap-8 border-t ${t.border} pt-10 sm:gap-12`}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className={`font-heading text-3xl font-bold sm:text-4xl ${t.warm}`}>{stat.value}</p>
              <p className={`mt-1 text-sm font-medium ${t.subtleText}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
