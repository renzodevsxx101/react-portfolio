// src/App.js
import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Footer from "./components/Footer";
import Services from "./components/Services";


export default function App() {
  return (
    <ThemeProvider>
      <main className="font-sans">
        <Navbar />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
