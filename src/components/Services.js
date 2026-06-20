import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import frontend from "../assets/img/frontend.png"
import responsive from "../assets/img/responsive.png"
import design from "../assets/img/design.png"
import optimization from "../assets/img/optimization.png"
import LineGradient from "../components/LineGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { img: frontend, alt: "frontend", title: "Front-End Development" },
  { img: design, alt: "design", title: "Custom Web Design" },
  { img: responsive, alt: "responsive", title: "Responsive Web Design" },
  { img: optimization, alt: "optimization", title: "Website Optimization" },
];

const Services = () => {
    const { theme } = useTheme();
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const descRef = useRef(null);
    const subHeaderRef = useRef(null);
    const cardsRef = useRef([]);

    const Style =
        theme === "light"
            ? { backgroundColor: "#d0d0d0", color: "#000000" }
            : { backgroundColor: "#010026", color: "#ffffff" };

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
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
          )
          .fromTo(
            descRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            "-=0.4"
          )
          .fromTo(
            subHeaderRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
            "-=0.4"
          );

          cardsRef.current.forEach((card) => {
            tl.fromTo(
              card,
              { y: 80, opacity: 0, scale: 0.9 },
              { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
              "+=0.1"
            );
          });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" style={Style} className="max-w-full mx-auto relative z-0 sm:px-16 px-6 sm:py-16 py-10">
            <div ref={headerRef} className="flex flex-col w-full mb-6">
                <p className="sm:text-4xl text-3xl text-center font-semibold title-font mb-2">
                    About
                    <span className="text-purple-600"> Me
                    </span>
                </p>
                <div className="flex justify-center mb-4">
                    <LineGradient width="w-1/12" />
                </div>
            </div>
            <p ref={descRef} className="lg:w-2/3 mx-auto leading-relaxed text-base text-center mb-20">Front-End Developer with 3 years of experience building responsive, accessible web applications. Skilled in translating UI/UX designs into clean, efficient code with cross-browser compatibility and mobile-first design. Collaborative team player in agile environments working closely with designers,  project managers, QAs, and backend developers.
            </p>
            <div ref={subHeaderRef} className="flex flex-col w-full">
                <p className="sm:text-4xl text-3xl text-center font-semibold title-font mb-2">
                    What{" "}
                    <span className="text-purple-600">I do?</span>
                </p>
                <div className="flex justify-center">
                    <LineGradient width="w-1/12" />
                </div>
            </div>
            <div className='mt-16 lg:flex-row flex flex-col gap-10'>
                {services.map((s, i) => (
                  <div key={i} ref={(el) => (cardsRef.current[i] = el)} className='lg:min-w-[250px] w-full'>
                    <div className='w-full p-[1px] rounded-[20px] shadow-card border-gradient-purple'>
                      <div className={`${theme === "light" ? "bg-tertiary-300" : "bg-primary-400"} rounded-xl py-5 px-10 min-h-[280px] flex justify-evenly items-center flex-col`}>
                        <img src={s.img} alt={s.alt} className='w-16 h-16 object-contain' />
                        <h3 className={`${theme === "light" ? "text-gray-900" : "text-white"} text-[20px] text-center font-bold`}>
                          {s.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </section>
    );
};

export default Services
