import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import getThemeStyles from "../components/Theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MailIcon, PaperAirplaneIcon } from "@heroicons/react/solid";
import { Button, Card, SectionHeader, themeTokens } from "./ui";
// No package needed; uses fetch directly.

gsap.registerPlugin(ScrollTrigger);

const initial = { name: "", email: "", message: "" };
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const sectionRef = useRef(null);
  const detailsRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const { theme } = useTheme();
  const t = themeTokens(theme);

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" };

      gsap.fromTo(
        detailsRef.current,
        { x: -80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: "power2.out", scrollTrigger: st }
      );

      gsap.fromTo(
        formRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.3, ease: "power2.out", scrollTrigger: st }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Invalid email format";
    }
    if (!form.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("sending");

    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS_SERVICE_ID,
            template_id: EMAILJS_TEMPLATE_ID,
            user_id: EMAILJS_PUBLIC_KEY,
            template_params: {
              from_name: form.name,
              from_email: form.email,
              message: form.message,
              to_email: "pagdanganan.johnrenz@gmail.com",
            },
          }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        setStatus("success");
        setForm(initial);
      } catch (err) {
        console.error("EmailJS error:", err.message);
        setStatus("error");
      }
    } else {
      window.location.href = `mailto:pagdanganan.johnrenz@gmail.com?subject=${encodeURIComponent("Portfolio Contact from " + form.name)}&body=${encodeURIComponent(form.message + "\n\n---\nName: " + form.name + "\nEmail: " + form.email)}`;
      setStatus("success");
      setForm(initial);
    }
  }

  const inputClass = (field) =>
    `w-full rounded-md border px-3 py-3 text-base outline-none transition-colors duration-200 focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : t.input
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`${getThemeStyles(theme)} relative px-6 py-20`}
    >
      <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something"
            highlight="useful"
            theme={theme}
          />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card ref={detailsRef} theme={theme} className="p-6">
            <h2 className="mb-2 text-3xl font-bold">Get in touch</h2>
            <p className={`mb-6 text-sm leading-6 ${t.mutedText}`}>
              I am available for frontend roles, portfolio work, and web app builds.
            </p>
            <div className="grid gap-4">
              <div className="flex gap-3">
                <MailIcon className={`h-6 w-6 flex-shrink-0 ${t.accent}`} />
                <div>
                  <h3 className="text-sm font-bold">Email</h3>
                  <a href="mailto:pagdanganan.johnrenz@gmail.com" className={`mt-1 block break-all text-sm ${t.accent}`}>
                    pagdanganan.johnrenz@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Card>

          <Card
            as="form"
            ref={formRef}
            netlify
            name="contact"
            onSubmit={handleSubmit}
            theme={theme}
            className="p-6"
          >
            <h2 className="mb-2 text-3xl font-bold">Hire Me</h2>
            <p className={`mb-6 text-sm leading-6 ${t.mutedText}`}>
              Tell me what you need, what stack you're using, or where the feature currently needs support.
            </p>

            {status === "success" && (
              <div className={`mb-4 rounded-md border px-4 py-3 text-sm font-semibold ${theme === "light" ? "theme-alert-success-light" : "theme-alert-success-dark"}`}>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className={`mb-4 rounded-md border px-4 py-3 text-sm font-semibold ${theme === "light" ? "theme-alert-error-light" : "theme-alert-error-dark"}`}>
                Something went wrong. Please try again or email me directly.
              </div>
            )}

          <div className="relative mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass("name")}
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="relative mb-4">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className={inputClass("message")}
              rows={5}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
          </div>
          <Button
            theme={theme}
            type="submit"
            disabled={status === "sending"}
            className="mt-2 w-full"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
            {status === "sending" ? "Sending..." : "Submit"}
          </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
