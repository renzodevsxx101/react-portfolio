import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowRightIcon } from "@heroicons/react/solid";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeader, Button, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const { theme } = useTheme();
    const t = themeTokens(theme);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });

          tl.fromTo(
            headerRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
          )
          .fromTo(
            descRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" },
            "-=0.22"
          );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about-me" className={`${t.mutedPage} section-shell mx-auto px-5 py-14 sm:px-16 sm:py-20`}>
          <div className="relative z-10 mx-auto max-w-7xl">
            <div ref={headerRef}>
              <SectionHeader
                descriptionRef={descRef}
                titleClassName="text-focus-in"
                eyebrow="About me"
                description="Front-End Developer and Junior Full-Stack Engineer with 3 years of experience building responsive, user-friendly web applications. Experienced in developing and maintaining web applications for both local and international clients."
                theme={theme}
              />
            </div>
            <div className="text-center">
              <Button
                as="a"
                href="/about"
                theme={theme}
                variant="outline"
                className="whitespace-nowrap px-6 text-sm"
              >
                View More
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
    );
};

export default Services;
