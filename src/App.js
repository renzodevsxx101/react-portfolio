// src/App.js
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <main className="font-sans">
        <Navbar />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
