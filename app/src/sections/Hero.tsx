import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroConfig } from '../config';
import { Menu, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaContainerRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef<number>(0);
  

  if (!heroConfig.backgroundImage && heroConfig.navLinks.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const triggers: ScrollTrigger[] = [];

      // Navbar fade in
      gsap.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 2.2, ease: 'power3.out', delay: 0.1 }
      );

      // Hero title slide in from left
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 2.8, ease: 'power3.out', delay: 0.5 }
      );

      // CTA buttons slide in from bottom
      gsap.fromTo(
        ctaContainerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 2.8, ease: 'power3.out', delay: 1.2 }
      );

      // Fade in content (subtitle)
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3, ease: 'power3.out', delay: 0.3 }
      );

      // Parallax effect for background
      const bgTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const bg = sectionRef.current?.querySelector('.hero-bg') as HTMLElement;
          if (bg) {
            gsap.set(bg, { yPercent: self.progress * 30 });
          }
        },
      });
      triggers.push(bgTrigger);

      // Fade out content on scroll
      const contentTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '50% top',
        scrub: 1,
        onUpdate: (self) => {
          if (contentRef.current) {
            gsap.set(contentRef.current, { opacity: 1 - self.progress });
          }
        },
      });
      triggers.push(contentTrigger);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-hide navbar on scroll down, show on scroll up with GSAP animation
  useEffect(() => {
    lastScrollY.current = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // If scrolling down and passed threshold -> hide
          if (currentY > lastScrollY.current && currentY > 100) {
            if (navVisible) {
              setNavVisible(false);
              gsap.to(navRef.current, {
                yPercent: -100,
                duration: 0.4,
                ease: 'power2.inOut',
              });
            }
          } else {
            if (!navVisible) {
              setNavVisible(true);
              gsap.to(navRef.current, {
                yPercent: 0,
                duration: 0.4,
                ease: 'power2.inOut',
              });
            }
          }
          lastScrollY.current = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [navVisible]);

  // Ensure navbar is visible when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) setNavVisible(true);
  }, [mobileMenuOpen]);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="hero-bg absolute inset-0 w-full h-full will-change-transform"
        style={{
          backgroundImage: `url(${heroConfig.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark overlay (neutral, slightly tinted) for text readability */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Fixed Navbar */}
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-2 transform-gpu ${
          isScrolled
            ? 'bg-forest-dark/95 backdrop-blur-md shadow-lg py-2'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo (image or text fallback) */}
          <div className={`flex items-center flex-shrink-0 font-sans font-bold text-xl tracking-tight transition-colors duration-300 ${
            isScrolled ? 'text-white' : 'text-white'
          }`}>
            {heroConfig.brandLogo ? (
              <img
                src={heroConfig.brandLogo}
                alt={heroConfig.brandLogoAlt || heroConfig.brandName}
                className="h-36 w-auto md:h-40 flex-shrink-0" // keep size but prevent compression
              />
            ) : (
              heroConfig.brandName
            )}
          </div>

          {/* Desktop Navigation */}
          {heroConfig.navLinks.length > 0 && (
            <div className="hidden md:flex items-center gap-6">
              {heroConfig.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`nav-link text-sm font-body transition-colors duration-300 ${
                    isScrolled
                      ? 'text-white/80 hover:text-[#E21B23]'
                      : 'text-white/80 hover:text-[#E21B23]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop CTA Button (brand red for consistency) */}
          <a
            href={heroConfig.ctaHref}
            className={`hidden md:inline-flex items-center px-6 py-3 font-sans font-semibold text-sm tracking-tight rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isScrolled
                ? 'bg-[#E21B23] text-white hover:bg-[#c6191c]'
                : 'bg-[#E21B23] text-white hover:bg-[#c6191c]'
            }`}
          >
            {heroConfig.ctaText}
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-forest-dark/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 flex flex-col gap-3">
              {heroConfig.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="nav-link text-white/80 text-base font-body hover:text-[#E21B23] transition-colors duration-300 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={heroConfig.ctaHref}
                className="inline-flex items-center justify-center px-6 py-2 bg-[#E21B23] text-white font-sans font-semibold text-sm tracking-tight rounded-full shadow-md mt-3 hover:bg-[#c6191c] hover:shadow-lg transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {heroConfig.ctaText}
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 md:px-12 pt-24 will-change-transform"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <h1
            ref={titleRef}
            className="font-sans font-extrabold text-white text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight md:leading-[1.05] mb-6"
          >
            {heroConfig.title}
          </h1>

          {/* Subtitle */}
          <p className="font-serif italic text-white/90 text-xl md:text-2xl lg:text-3xl mb-10 tracking-wide">
            {heroConfig.subtitle}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaContainerRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* primary hero button red */}
            <a
              href={heroConfig.ctaHref}
              className="inline-flex items-center px-8 py-4 bg-[#E21B23] text-white font-sans font-semibold text-base rounded-full hover:bg-[#c6191c] transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {heroConfig.ctaText}
            </a>
            {/* secondary hero button transparent */}
            <a
              href="#services"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-sans font-semibold text-base rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-300"
            >
              Nos Services
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#E21B23]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Certifiés IRATA</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#E21B23]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>12+ Ans d'Expérience</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#E21B23]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>0 Accident</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-white/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
