import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// register plugin once at module load
gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (videoRef.current) {
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              videoRef.current,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
            );
          },
          once: true,
        });
      }

      if (textRef.current) {
        ScrollTrigger.create({
          trigger: textRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              textRef.current,
              { y: 60, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
          },
          once: true,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* video column */}
          <div ref={videoRef} className="flex justify-center md:justify-start order-1 md:order-1">
            <div className="relative rounded-2xl shadow-xl overflow-hidden w-full sm:w-96 md:w-80 lg:w-96">
              <video
                className="w-full h-auto aspect-[9/16]"
                autoPlay
                muted
                loop
                controls
                loading="lazy"
              >
                <source src="/video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* text column */}
          <div
            ref={textRef}
            className="flex flex-col text-center md:text-left space-y-6 order-2 md:order-2"
          >
            <p className="text-softblack/50 text-xs font-body uppercase tracking-[0.15em] font-semibold">
              À Découvrir
            </p>
            <h2 className="text-5xl md:text-6xl font-sans font-bold text-softblack tracking-tight leading-[1.1]">
              Découvrez Notre
              <br />
              <span className="font-serif italic font-light text-softblack/70">
                Solution
              </span>
            </h2>
            <p className="text-softblack/65 font-body text-lg leading-relaxed max-w-lg">
              Une démonstration complète de nos services et de l'impact que nous pouvons avoir sur vos projets. Regardez comment nous transformons les défis en opportunités avec expertise et professionnalisme.
            </p>
            <p className="text-softblack/60 font-body text-lg leading-relaxed max-w-lg">
              Nos équipes certifiées interviennent dans les environnements les plus exigeants, garantissant sécurité, qualité et efficacité sur chaque intervention.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#E21B23] text-white font-sans font-semibold text-base rounded-full shadow-lg hover:bg-[#c6191c] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Demander une consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
