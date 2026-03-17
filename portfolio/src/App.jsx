import React, { useEffect } from "react";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import SEO from './Components/SEO/SEO';
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import About from "./Components/AboutPage/About";
import ContactSection from "./Components/ContactSection/ContactSection";
import Skills from "./Components/Skills/Skills";
import ProjectGallery from "./Components/ProjectGallery/ProjectGallery";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import HeroSection from "./Components/HeroSection/HeroSection";
import Chatbot from "./Components/Chatbot/Chatbot";
import AnnouncementBanner from "./Components/AnnouncementBanner/AnnouncementBanner";

function App() {
  useEffect(() => {
    // Remove the hash from the URL (if present)
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }
    // Scroll to the very top
    window.scrollTo(0, 0);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-black dark:bg-gray-900 transition-colors duration-300">
            <SEO />
            <Header />
            <main>
              <section id="HeroSection">
                <HeroSection />
              </section>

              <section id="about">
                <About />
              </section>
              <section id="skills">
                <Skills />
              </section>
              <section id="projects">
                <ProjectGallery />
              </section>
              <section id="contact">
                <ContactSection />
              </section>
            </main>
            <Footer />
            <Chatbot />
            <ScrollToTop />
            <AnnouncementBanner />
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#374151",
                  color: "#fff",
                },
                success: {
                  iconTheme: {
                    primary: "#10B981",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#fff",
                  },
                },
              }}
            />
          </div>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
