import { useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { Hero } from './sections/Hero';
import { IntroGrid } from './sections/IntroGrid';
import { Services } from './sections/Services';
import { VideoSection } from './sections/VideoSection';
import { WhyChooseMe } from './sections/WhyChooseMe';
import { FeaturedProjects } from './sections/FeaturedProjects';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { siteConfig } from './config';
import './App.css';

function App() {
  // Initialize Lenis smooth scroll
  useLenis();

  useEffect(() => {
    if (siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', siteConfig.siteDescription);
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Hero Section - Parallax Layering */}
      <Hero />

      {/* Intro & Masonry Grid - White Section */}
      <IntroGrid />

      {/* Services - Dark Section */}
      <Services />

      {/* Video section added after services */}
      <VideoSection />

      {/* Why Choose Me & Stats - White Section */}
      <WhyChooseMe />

      {/* Featured Projects - Dark Section */}
      <FeaturedProjects />

      {/* Testimonials Carousel - White Section */}
      <Testimonials />

      {/* FAQ Accordion - Dark Section */}
      <FAQ />

      {/* Contact Section - Black Section */}
      <Contact />

      {/* Footer - White Section with Massive Typography */}
      <Footer />
    </main>
  );
}

export default App;
