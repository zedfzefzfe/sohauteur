import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyChooseMeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  shouldAnimate: boolean;
}

function Counter({ end, suffix = '', duration = 2, shouldAnimate }: CounterProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const newCount = Math.floor(easeProgress * end);

      if (newCount !== countRef.current) {
        countRef.current = newCount;
        setCount(newCount);
      }

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration, shouldAnimate]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function WhyChooseMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const wideRef = useRef<HTMLDivElement>(null);
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false);

  if (!whyChooseMeConfig.titleRegular && whyChooseMeConfig.stats.length === 0 && whyChooseMeConfig.featureCards.length === 0) return null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header — slide up
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.fromTo(
            headerRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Feature cards with images — clip-path reveal + inner scale
      const imageCards = cardsRef.current?.querySelectorAll('.feature-card-image');
      if (imageCards) {
        imageCards.forEach((card, i) => {
          const img = card.querySelector('img');

          ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            onEnter: () => {
              gsap.set(card, { opacity: 1 });
              gsap.fromTo(
                card,
                { clipPath: 'inset(100% 0 0 0)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 1.2,
                  ease: 'power4.inOut',
                  delay: i * 0.15,
                }
              );
              if (img) {
                gsap.fromTo(
                  img,
                  { scale: 1.35 },
                  { scale: 1.1, duration: 1.6, ease: 'power3.out', delay: i * 0.15 }
                );
              }
            },
            once: true,
          });

          // Parallax on card images
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -4 },
              {
                yPercent: 4,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
                },
              }
            );
          }
        });
      }

      // Stats card — slide up + fade
      const statsCard = cardsRef.current?.querySelector('.feature-card-stats');
      if (statsCard) {
        ScrollTrigger.create({
          trigger: statsCard,
          start: 'top 85%',
          onEnter: () => {
            gsap.fromTo(
              statsCard,
              { y: 80, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
            );
          },
          once: true,
        });
      }

      // Stats counter trigger
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 75%',
        onEnter: () => {
          setShouldAnimateStats(true);
        },
        once: true,
      });

      // Wide landscape — clip-path expand from center + inner scale + parallax
      const wideWrap = wideRef.current;
      const wideImg = wideWrap?.querySelector('img');
      if (wideWrap) {
        ScrollTrigger.create({
          trigger: wideWrap,
          start: 'top 82%',
          onEnter: () => {
            gsap.set(wideWrap, { opacity: 1 });
            gsap.fromTo(
              wideWrap,
              { clipPath: 'inset(15% 5% 15% 5%)' },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.4,
                ease: 'power4.inOut',
              }
            );
            if (wideImg) {
              gsap.fromTo(
                wideImg,
                { scale: 1.25 },
                { scale: 1.08, duration: 1.8, ease: 'power3.out' }
              );
            }
          },
          once: true,
        });

        // Wide image parallax
        if (wideImg) {
          gsap.fromTo(
            wideImg,
            { yPercent: -3 },
            {
              yPercent: 3,
              ease: 'none',
              scrollTrigger: {
                trigger: wideWrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      }

      // Text overlay on wide image — fade up
      const wideText = wideWrap?.querySelector('.wide-text-overlay');
      if (wideText) {
        ScrollTrigger.create({
          trigger: wideWrap,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              wideText,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.6 }
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
      id="about"
      className="relative w-full py-24 md:py-32 lg:pt-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-4 md:mb-6">
          {whyChooseMeConfig.subtitle && (
            <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-2">
              {whyChooseMeConfig.subtitle}
            </p>
          )}

          {/* main title with red accent divider */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-softblack tracking-tight mb-2">
            <span>{whyChooseMeConfig.titleRegular}</span>{' '}
            <span className="font-serif italic font-normal">
              {whyChooseMeConfig.titleItalic}
            </span>
          </h2>
          <div className="mx-auto w-12 h-[2px] bg-[#E21B23] mb-4" />
        </div>

        {/* Three Cards Row */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Feature Cards with Images */}
          {whyChooseMeConfig.featureCards.map((card, index) => (
            <div key={index} className="feature-card-image opacity-0 group">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-forest-dark">
                <img
                  src={card.image}
                  alt={card.imageAlt}
                  className="w-full h-full object-cover will-change-transform"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/90 font-sans font-semibold text-lg mb-2">
                    {card.title}
                  </p>
                  <p className="text-white/60 font-body text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Stats Card */}
          {whyChooseMeConfig.stats.length > 0 && (
            <div
              ref={statsRef}
              className="feature-card-stats opacity-0 bg-offwhite rounded-lg p-8 md:p-10 flex flex-col justify-between"
            >
              <div>
                {whyChooseMeConfig.statsLabel && (
                  <p className="text-softblack/50 text-sm font-body uppercase tracking-widest mb-8">
                    {whyChooseMeConfig.statsLabel}
                  </p>
                )}
                <div className="space-y-8">
                  {whyChooseMeConfig.stats.map((stat, index) => (
                    <div key={index} className="border-b border-softblack/10 pb-6 last:border-0">
                      <p className="text-4xl md:text-5xl font-sans font-bold text-softblack tracking-tight">
                        <Counter
                          end={stat.value}
                          suffix={stat.suffix}
                          shouldAnimate={shouldAnimateStats}
                        />
                      </p>
                      <p className="text-softblack/60 font-body text-sm mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* IRATA Certification — mirrored 2-column layout matching "Découvrez Notre Solution" */}
        <div ref={wideRef} className="mt-16 md:mt-24 opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* text column — left on desktop, bottom on mobile (order-2 → order-1) */}
            <div className="flex flex-col text-center md:text-left space-y-6 order-2 md:order-1">
              <p className="text-softblack/50 text-xs font-body uppercase tracking-[0.15em] font-semibold">
                Certification IRATA
              </p>
              <h2 className="text-5xl md:text-6xl font-sans font-bold text-softblack tracking-tight leading-[1.1]">
                Une Équipe de
                <br />
                <span className="font-serif italic font-light text-softblack/70">
                  Cordistes Certifiés IRATA
                </span>
              </h2>
              <p className="text-softblack/65 font-body text-lg leading-relaxed max-w-lg">
                Tous nos cordistes au Maroc sont certifiés IRATA (Industrial Rope Access Trade Association), la référence mondiale en matière de travaux sur cordes. Cette certification internationalement reconnue garantit le plus haut niveau de compétence, de sécurité et de professionnalisme sur chaque intervention de travail acrobatique.
              </p>
              <p className="text-softblack/60 font-body text-lg leading-relaxed max-w-lg">
                Avec plus de 12 ans d'expérience et 0 accident, notre équipe incarne l'excellence des travaux en hauteur à Casablanca et partout au Maroc.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#E21B23] text-white font-sans font-semibold text-base rounded-full shadow-lg hover:bg-[#c6191c] hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Découvrir Notre Équipe
                </a>
              </div>
            </div>

            {/* video column — right on desktop, top on mobile (order-1 → order-2) */}
            <div className="flex justify-center md:justify-start order-1 md:order-2">
              <div className="relative rounded-2xl shadow-xl overflow-hidden w-full sm:w-96 md:w-80 lg:w-96 aspect-[9/16]">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  controls
                  playsInline
                  preload="metadata"
                  poster="/hero-bg.jpg"
                  aria-label="Vidéo de présentation de notre équipe certifiée IRATA"
                >
                  <source src="/new.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
