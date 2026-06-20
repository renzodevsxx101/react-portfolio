import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import getThemeStyles from "../components/Theme";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// no package needed — uses fetch directly

gsap.registerPlugin(ScrollTrigger);

const initial = { name: "", email: "", message: "" };
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

export default function Contact() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const { theme } = useTheme();

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
        mapRef.current,
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
    `w-full bg-gray-500 rounded border text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${
      errors[field]
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-700 focus:border-indigo-500 focus:ring-indigo-900"
    }`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`${getThemeStyles(theme)} relative`}
    >
      <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <div ref={mapRef} className="lg:w-2/3 md:w-3/4 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          <iframe
            width="100%"
            height="100%"
            title="map"
            className="absolute inset-0"
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            style={{ filter: "opacity(0.7)" }}
            src="https://www.google.com/maps/embed/v1/place?q=Calumpit,+Bulacan,+Philippines&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
          />
          <div className="bg-gray-600 relative flex flex-wrap py-6 px-6 rounded shadow-md">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">ADDRESS</h2>
              <p className="mt-1 text-white">Calumpit, Bulacan, Philippines</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">EMAIL</h2>
              <a className="text-indigo-400 leading-relaxed">
                pagdanganan.johnrenz <br />@gmail.com
              </a>
            </div>
          </div>
        </div>

        <form
          ref={formRef}
          netlify
          name="contact"
          onSubmit={handleSubmit}
          className="lg:w-1/3 md:w-3/4 flex flex-col mr-auto md:ml-auto w-full md:py-8 mt-8 md:mt-0"
        >
          <h2 className="sm:text-4xl text-3xl mb-1 font-medium title-font">Hire Me</h2>

          {status === "success" && (
            <div className="bg-green-600 text-white px-4 py-3 rounded mb-4 text-sm">
              Message sent successfully! I'll get back to you soon.
            </div>
          )}
          {status === "error" && (
            <div className="bg-red-600 text-white px-4 py-3 rounded mb-4 text-sm">
              Something went wrong. Please try again or email me directly.
            </div>
          )}

          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm">Name</label>
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
            <label htmlFor="email" className="leading-7 text-sm">Email</label>
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
            <label htmlFor="message" className="leading-7 text-sm">Message</label>
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
          <button
            type="submit"
            disabled={status === "sending"}
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
}
