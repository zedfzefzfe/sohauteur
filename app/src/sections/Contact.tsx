import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';
import { contactConfig } from '../config';
import { MessageCircle, Send, Phone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
const formRef = useRef<HTMLDivElement>(null);  const imageRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!contactConfig.formHeadline) return null;

  useEffect(() => {
    // initialize EmailJS with your public key
    emailjs.init('X6VzaYLSuLrBDAZL1');

    const ctx = gsap.context(() => {
      // Header — slide up
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

      // Form — slide in from left
      ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            formRef.current,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });

      // Image — slide in from right with scale
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { x: 40, opacity: 0, scale: 0.95 },
            { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }
          );
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      time: new Date().toLocaleString('fr-FR'),
    };

    emailjs
      .send(
        'service_oz4wgt8',          // your service ID
        'template_86gr9d9',          // your template ID
        templateParams,
        'X6VzaYLSuLrBDAZL1'         // your public key
      )
      .then(
        () => {
          setSubmitted(true);
          setError(null);
          setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', service: '', message: '' });
          }, 3000);
        },
        (err) => {
          console.error('EmailJS error:', err);
          setError('Une erreur est survenue, veuillez réessayer.');
        }
      );
  };

  const whatsappUrl = `https://wa.me/${contactConfig.whatsappNumber.replace(/[^\d+]/g, '')}?text=Bonjour, je souhaite obtenir plus d'informations sur vos services d'accès sur cordes.`;

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0b0b0b] to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 opacity-0">
          {contactConfig.subtitle && (
            <p className="text-[#E21B23] text-sm font-body uppercase tracking-widest mb-4 font-semibold">
              {contactConfig.subtitle}
            </p>
          )}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white tracking-tight mb-6">
            {contactConfig.titleRegular}{' '}
            <span className="font-serif italic font-normal text-white/70">
              {contactConfig.titleItalic}
            </span>
          </h2>
          <p className="text-white/60 font-body text-lg max-w-2xl">
            {contactConfig.description}
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Left Column - Form */}
          <div
            ref={formRef}
            className="opacity-0 flex flex-col justify-start"
          >
            <div className="mb-12">
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4 tracking-tight">
                {contactConfig.formHeadline}
              </h3>
              <div className="h-1 w-16 bg-gradient-to-r from-[#E21B23] to-transparent rounded-full" />
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-8 flex-1">
              {/* Name Field */}
              <div className="relative">
                <label htmlFor="name" className="block text-white/90 font-body text-sm font-medium mb-3">
                  {contactConfig.fields.name.label} <span className="text-[#E21B23]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={contactConfig.fields.name.placeholder}
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/40 font-body text-base focus:outline-none focus:border-[#E21B23] transition-colors duration-300 pb-3"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <label htmlFor="email" className="block text-white/90 font-body text-sm font-medium mb-3">
                  {contactConfig.fields.email.label} <span className="text-[#E21B23]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={contactConfig.fields.email.placeholder}
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/40 font-body text-base focus:outline-none focus:border-[#E21B23] transition-colors duration-300 pb-3"
                />
              </div>

              {/* Phone Field */}
              <div className="relative">
                <label htmlFor="phone" className="block text-white/90 font-body text-sm font-medium mb-3">
                  {contactConfig.fields.phone.label} <span className="text-[#E21B23]">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={contactConfig.fields.phone.placeholder}
                  required
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/40 font-body text-base focus:outline-none focus:border-[#E21B23] transition-colors duration-300 pb-3"
                />
              </div>

              {/* Service Dropdown */}
              <div className="relative">
                <label htmlFor="service" className="block text-white/90 font-body text-sm font-medium mb-3">
                  {contactConfig.fields.service.label}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/40 font-body text-base focus:outline-none focus:border-[#E21B23] transition-colors duration-300 pb-3 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0b0b0b] text-white">
                    {contactConfig.fields.service.placeholder}
                  </option>
                  {contactConfig.serviceOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#0b0b0b] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
                {/* Custom dropdown arrow */}
                <svg
                  className="absolute right-0 top-11 w-5 h-5 text-white/40 pointer-events-none"
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

              {/* Message Textarea */}
              <div className="relative">
                <label htmlFor="message" className="block text-white/90 font-body text-sm font-medium mb-3">
                  {contactConfig.fields.message.label}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={contactConfig.fields.message.placeholder}
                  rows={4}
                  className="w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-white/40 font-body text-base focus:outline-none focus:border-[#E21B23] transition-colors duration-300 pb-3 resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#E21B23] text-white font-sans font-semibold text-base rounded-full hover:bg-[#c6191c] transition-all duration-300 hover:gap-4 group shadow-lg hover:shadow-xl hover:shadow-[#E21B23]/30"
                >
                  {contactConfig.buttonText}
                  <Send className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Success / Error Message */}
                {submitted && (
                  <p className="text-[#E21B23] font-body text-sm mt-4 animate-pulse">
                    ✓ Message envoyé avec succès !
                  </p>
                )}
                {error && (
                  <p className="text-red-400 font-body text-sm mt-4">
                    {error}
                  </p>
                )}
              </div>

              {/* WhatsApp Quick Contact */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-white/60 font-body text-sm mb-3">
                  {contactConfig.whatsappText}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#E21B23] hover:text-white font-sans font-semibold text-sm transition-colors duration-300 group"
                  >
                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    WhatsApp
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  {/* Phone Call Button */}
                  <a
                    href={`tel:${contactConfig.whatsappNumber.replace(/[^\d+]/g, '')}`}
                    className="inline-flex items-center gap-2 text-[#E21B23] hover:text-white font-sans font-semibold text-sm transition-colors duration-300 group"
                  >
                    <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Appel
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Image */}
          <div
            ref={imageRef}
            className="opacity-0 relative h-full min-h-[500px] md:min-h-[700px] rounded-2xl overflow-hidden group"
          >
            {/* Image Container */}
            <div className="absolute inset-0 bg-white/5">
              <img
                src={contactConfig.contactImage}
                alt={contactConfig.contactImageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Image Text Overlay (optional) */}
            <div className="absolute inset-0 flex flex-col items-end justify-end p-8">
              <div className="text-right">
                <p className="text-white/40 font-body text-sm uppercase tracking-widest mb-2">Nos Experts</p>
                <h3 className="text-white font-sans font-bold text-2xl md:text-3xl leading-tight">
                  Toujours <br /> à Votre Hauteur
                </h3>
              </div>
            </div>

            {/* Accent Bar */}
            <div className="absolute top-0 right-0 w-1 h-24 bg-gradient-to-b from-[#E21B23] to-transparent rounded-full" />
          </div>
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </section>
  );
}
