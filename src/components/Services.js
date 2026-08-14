import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { FaBriefcase, FaCode, FaDatabase, FaMobileAlt, FaPaintBrush, FaPlug } from "react-icons/fa";
import LineGradient from "../components/LineGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, SectionHeader, themeTokens } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: FaCode, title: "Frontend Development", copy: "Building responsive interfaces, reusable components, routed pages, forms, dashboards, and user-facing product features." },
  { icon: FaPaintBrush, title: "Interface Implementation", copy: "Translating designs and requirements into clean, readable interfaces with attention to usability and accessibility." },
  { icon: FaMobileAlt, title: "Responsive Web Design", copy: "Creating mobile-first layouts that stay readable, usable, and polished across screen sizes." },
  { icon: FaPlug, title: "API Integration", copy: "Connecting frontend features to APIs, handling service responses, and supporting data-driven application flows." },
  { icon: FaDatabase, title: "Databases and CRUD Basics", copy: "Hands-on foundation with database-backed features and create, read, update, and delete workflows." },
  { icon: FaBriefcase, title: "Role Availability", copy: "Seeking frontend roles, while also open to junior full-stack or junior software roles." },
];

const quickFacts = [
  ["3+", "Years experience"],
  ["15+", "Projects built"],
  ["Bulacan, PH", "Location"],
];

const aboutGalleryImages = [
  { src: "static/img/casual.JPG", alt: "John Renz casual photo" },
  { src: "static/img/me.jpeg", alt: "John Renz profile photo" },
  { src: "static/img/casual2.JPG", alt: "John Renz casual portrait" },
  { src: "static/img/grad.JPG", alt: "John Renz graduation photo" },
];

const Services = () => {
    const { theme } = useTheme();
    const t = themeTokens(theme);
    const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const descRef = useRef(null);
    const subHeaderRef = useRef(null);
    const cardsRef = useRef([]);
    const activeGalleryImage = aboutGalleryImages[activeGalleryIndex];

    const showPreviousGalleryImage = () => {
      setActiveGalleryIndex((current) =>
        current === 0 ? aboutGalleryImages.length - 1 : current - 1
      );
    };

    const showNextGalleryImage = () => {
      setActiveGalleryIndex((current) => (current + 1) % aboutGalleryImages.length);
    };

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

    useEffect(() => {
      if (aboutGalleryImages.length < 2) return undefined;

      const interval = setInterval(() => {
        setActiveGalleryIndex((current) => (current + 1) % aboutGalleryImages.length);
      }, 3600);

      return () => clearInterval(interval);
    }, []);

    return (
        <section ref={sectionRef} id="services" className={`${t.mutedPage} section-shell mx-auto px-5 py-14 sm:px-16 sm:py-20`}>
          <div className="relative z-10 mx-auto max-w-7xl">
            <div ref={headerRef}>
              <SectionHeader
                descriptionRef={descRef}
                titleClassName="text-focus-in"
                eyebrow="About me"
                description="I'm John Renz Pagdanganan, a web developer with 3 years of experience building responsive interfaces and product features. My main strength is frontend development, and I also have working knowledge of API integration, backend basics, databases, and CRUD flows."
                theme={theme}
              />
            </div>
            <div className="mx-auto mb-10 max-w-3xl">
              <div className="mb-5 overflow-hidden">
                <div className="relative aspect-video overflow-hidden rounded-md">
                  <div key={activeGalleryImage.src} className="tech-stack-slide h-full w-full">
                    <img
                      src={activeGalleryImage.src}
                      alt={activeGalleryImage.alt}
                      className="about-gallery-image"
                    />
                  </div>
                  {aboutGalleryImages.length > 1 && (
                    <div>
                      <button
                        type="button"
                        onClick={showPreviousGalleryImage}
                        className={`absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border ${t.card}`}
                        aria-label="Show previous gallery image"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={showNextGalleryImage}
                        className={`absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border ${t.card}`}
                        aria-label="Show next gallery image"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  {aboutGalleryImages.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setActiveGalleryIndex(index)}
                      className={`h-2.5 w-2.5 rounded-full border transition ${index === activeGalleryIndex ? t.accentBg : t.badge}`}
                      aria-label={`Show gallery image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className={`rounded-lg border p-5 ${t.softCard}`}>
                <p className="text-sm font-bold">Availability</p>
                <p className={`mt-3 text-sm leading-6 ${t.mutedText}`}>
                  Open to frontend roles, and also ready for junior full-stack or junior software opportunities where I can grow across product features, APIs, and data-backed workflows.
                </p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {quickFacts.map(([value, label]) => (
                    <div key={label} className="text-center">
                      <p className="text-lg font-bold leading-tight">{value}</p>
                      <p className={`mt-1 text-[11px] font-semibold uppercase ${t.subtleText}`}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div ref={subHeaderRef} className="mb-6 flex flex-col items-center text-center sm:mb-8">
              <p className="mb-2 text-2xl font-bold sm:text-3xl">
                What <span className={t.warm}>I do</span>
              </p>
              <LineGradient width="w-32" />
            </div>
            <div className='grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3'>
                {services.map((s, i) => (
                  <Card key={i} ref={(el) => (cardsRef.current[i] = el)} theme={theme} className={`group flex min-h-[260px] flex-col items-center p-6 text-center transition duration-300 hover:-translate-y-1 sm:items-start sm:text-left ${t.hoverBorder}`}>
                    <div className={`${t.accentSoft} mb-6 flex h-14 w-14 items-center justify-center self-center rounded-md border`}>
                      <s.icon className={`h-8 w-8 ${t.accent}`} aria-hidden="true" />
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
