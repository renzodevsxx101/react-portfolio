import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { FaBriefcase, FaCode, FaDatabase, FaMobileAlt, FaPaintBrush, FaPlug } from "react-icons/fa";
import LineGradient from "../components/LineGradient";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, SectionHeader, themeTokens } from "./ui";
import { Button } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: FaCode, title: "Frontend Development", copy: "Building responsive interfaces, reusable components, routed pages, forms, dashboards, and user-facing product features.", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop" },
  { icon: FaPaintBrush, title: "UI/UX Design Implementation", copy: "Translating designs and requirements into clean, readable interfaces with attention to usability and accessibility.", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=250&fit=crop" },
  { icon: FaMobileAlt, title: "Responsive Web Design", copy: "Creating mobile-first layouts that stay readable, usable, and polished across screen sizes.", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop" },
  { icon: FaPlug, title: "API Integration", copy: "Connecting frontend features to APIs, handling service responses, and supporting data-driven application flows.", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop" },
  { icon: FaDatabase, title: "Databases", copy: "Hands-on foundation with database-backed features and create, read, update, and delete workflows.", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop" },
  { icon: FaBriefcase, title: "Role Availability", copy: "Seeking frontend roles, while also open to junior full-stack or junior software roles.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop" },
];

const aboutGalleryImages = [
  { src: "static/img/casual.JPG", alt: "John Renz casual photo" },
  { src: "static/img/casual2.JPG", alt: "John Renz casual portrait" },
  { src: "static/img/grad.JPG", alt: "John Renz graduation photo" },
];

const AboutMePage = () => {
  const { theme } = useTheme();
  const t = themeTokens(theme);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const descRef = useRef(null);
  const subHeaderRef = useRef(null);
  const cardsRef = useRef([]);
  const scrollRef = useRef(null);
  const activeGalleryImage = aboutGalleryImages[activeGalleryIndex];

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

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const maxScroll = container.scrollWidth - container.clientWidth;

    const interval = setInterval(() => {
      scrollAmount += 1;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 1, behavior: "auto" });
      }
    }, 20);

    const pauseOnHover = () => clearInterval(interval);
    container.addEventListener("mouseenter", pauseOnHover);

    return () => {
      clearInterval(interval);
      container.removeEventListener("mouseenter", pauseOnHover);
    };
  }, []);

  return (
    <section ref={sectionRef} id="about-me-detail" className={`${t.mutedPage} section-shell mx-auto px-5 pb-14 pt-2 sm:px-16 sm:pb-20 sm:pt-4`}>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-6">
          <Button
            as="a"
            href="/"
            theme={theme}
            variant="ghost"
            className="gap-2 px-3 text-sm"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
        <div ref={headerRef}>
          <SectionHeader
            descriptionRef={descRef}
            titleClassName="text-focus-in"
            eyebrow="About me"
            description="Front-End Developer and Junior Full-Stack Engineer with 3 years of experience building responsive, user-friendly web applications. Experienced in developing and maintaining web applications for both local and international clients."
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
        </div>
        <div ref={subHeaderRef} className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <p className="font-heading mb-2 text-2xl font-bold sm:text-3xl">
            What <span className={t.accent}>I do</span>
          </p>
          <LineGradient width="w-32" />
        </div>
        <div ref={scrollRef} className='services-scroll flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory sm:pb-6'>
            {services.map((s, i) => (
              <Card key={i} ref={(el) => (cardsRef.current[i] = el)} theme={theme} className={`group flex w-[280px] flex-shrink-0 flex-col items-center overflow-hidden p-0 text-center transition duration-300 hover:-translate-y-1 sm:w-[320px] ${t.hoverBorder} snap-start`}>
                {s.image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <img src={s.image} alt={s.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="flex flex-1 flex-col items-center p-6 text-center">
                  <div className={`${t.accentSoft} mb-6 flex h-14 w-14 items-center justify-center self-center rounded-md border`}>
                    <s.icon className={`h-8 w-8 ${t.accent}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className={`mt-3 flex-1 text-sm leading-6 ${t.mutedText}`}>{s.copy}</p>
                </div>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMePage;
