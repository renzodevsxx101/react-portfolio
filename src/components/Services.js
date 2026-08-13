import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import frontend from "../assets/img/frontend.png"
import responsive from "../assets/img/responsive.png"
import design from "../assets/img/design.png"
import optimization from "../assets/img/optimization.png"
import LineGradient from "../components/LineGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { img: frontend, alt: "frontend development", title: "Frontend Development", copy: "Building responsive interfaces, reusable components, routed pages, forms, dashboards, and user-facing product features." },
  { img: design, alt: "interface", title: "Interface Implementation", copy: "Translating designs and requirements into clean, readable interfaces with attention to usability and accessibility." },
  { img: responsive, alt: "responsive", title: "Responsive Web Design", copy: "Creating mobile-first layouts that stay readable, usable, and polished across screen sizes." },
  { img: optimization, alt: "api integration", title: "API Integration", copy: "Connecting frontend features to APIs, handling service responses, and supporting data-driven application flows." },
  { img: responsive, alt: "database", title: "Databases and CRUD Basics", copy: "Hands-on foundation with database-backed features and create, read, update, and delete workflows." },
  { img: optimization, alt: "software roles", title: "Role Availability", copy: "Seeking frontend roles, while also open to junior full-stack or junior software roles." },
];

const Services = () => {
    const { theme } = useTheme();
    const t = themeTokens(theme);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const descRef = useRef(null);
    const subHeaderRef = useRef(null);
    const cardsRef = useRef([]);

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
          )
          .fromTo(
            subHeaderRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          );

          cardsRef.current.forEach((card) => {
            tl.fromTo(
              card,
              { y: 36, opacity: 0, scale: 0.96 },
              { y: 0, opacity: 1, scale: 1, duration: 0.38, ease: "power2.out" },
              "-=0.2"
            );
          });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className={`${t.mutedPage} section-shell mx-auto px-5 py-14 sm:px-16 sm:py-20`}>
          <div className="relative z-10 mx-auto max-w-7xl">
            <div ref={headerRef}>
              <SectionHeader
                eyebrow="About me"
                title="Frontend development with"
                highlight="room to grow full-stack"
                description="Web developer with 3 years of web development experience building responsive interfaces and product features. My main strength is frontend development, and I also have working knowledge of API integration, backend basics, databases, and CRUD flows. I am open to junior full-stack or junior software roles."
                theme={theme}
              />
            </div>
            <div ref={subHeaderRef} className="mb-6 flex justify-center sm:mb-8">
              <LineGradient width="w-32" />
            </div>
            <div className='grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {services.map((s, i) => (
                  <Card key={i} ref={(el) => (cardsRef.current[i] = el)} theme={theme} className={`group flex min-h-[260px] flex-col items-center p-6 text-center transition duration-300 hover:-translate-y-1 sm:items-start sm:text-left ${t.hoverBorder}`}>
                    <div className={`${t.accentSoft} mb-6 flex h-14 w-14 items-center justify-center rounded-md border`}>
                      <img src={s.img} alt={s.alt} className='h-9 w-9 object-contain' />
                    </div>
                    <h3 className="text-xl font-bold">{s.title}</h3>
                    <p className={`mt-3 flex-1 text-sm leading-6 ${t.mutedText}`}>{s.copy}</p>
                  </Card>
                ))}
            </div>
          </div>
        </section>
    );
};

export default Services
