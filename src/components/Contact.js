import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { Button, Card, SectionHeader, themeTokens } from "./ui";

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
  const [status, setStatus] = useState("idle");

  const { theme } = useTheme();
  const t = themeTokens(theme);

  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 4000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" };

      gsap.fromTo(
        detailsRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: st }
      );

      gsap.fromTo(
        formRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.out", scrollTrigger: st }
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
    `w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all duration-200 ${
      errors[field]
        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
        : t.input
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`${t.page} relative px-6 py-20`}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something"
          highlight="useful"
          theme={theme}
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card
            as="form"
            ref={formRef}
            netlify
            name="contact"
            onSubmit={handleSubmit}
            theme={theme}
            className="p-6"
          >
            <h2 className="font-heading mb-2 text-2xl font-semibold">Hire Me</h2>
            <p className={`mb-5 text-sm leading-relaxed ${t.mutedText}`}>
              Tell me what you need, what stack you're using, or where the feature currently needs support.
            </p>

            {status === "success" && (
              <div className={`mb-4 rounded-lg border px-4 py-3 text-sm font-medium ${theme === "light" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-emerald-800 bg-emerald-900/30 text-emerald-400"}`}>
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className={`mb-4 rounded-lg border px-4 py-3 text-sm font-medium ${theme === "light" ? "border-red-200 bg-red-50 text-red-700" : "border-red-800 bg-red-900/30 text-red-400"}`}>
                Something went wrong. Please try again or email me directly.
              </div>
            )}

            <div className="relative mb-3">
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Name</label>
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
            <div className="relative mb-3">
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
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
            <div className="relative mb-3">
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                className={inputClass("message")}
                rows={4}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </div>
            <Button
              theme={theme}
              type="submit"
              disabled={status === "sending"}
              className="mt-2 w-full"
            >
              <PaperAirplaneIcon className="h-4 w-4" />
              {status === "sending" ? "Sending..." : "Submit"}
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
