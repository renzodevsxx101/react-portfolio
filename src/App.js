// src/App.js
import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import About from "./components/About";
import AboutMePage from "./components/AboutMePage";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import WorkExperience from "./components/WorkExperience";
import Footer from "./components/Footer";
import Services from "./components/Services";

function AppRoutes() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <Fragment>
      {isHome && <Navbar />}
      <Switch>
        <Route path="/projects">
          <Projects showAll />
        </Route>
        <Route path="/about">
          <AboutMePage />
        </Route>
        <Route path="/">
          <div>
            <About />
            <Services />
            <WorkExperience />
            <Projects />
            <Skills />
            <Contact />
          </div>
        </Route>
      </Switch>
      <Footer />
    </Fragment>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <main className="font-sans">
          <AppRoutes />
        </main>
      </Router>
    </ThemeProvider>
  );
}
