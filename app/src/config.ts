// Site Configuration
// Cordiste - Professional Rope Access Services

export interface SiteConfig {
  language: string;
  siteTitle: string;
  siteDescription: string;
}

export const siteConfig: SiteConfig = {
  language: "fr",
  siteTitle: "Cordiste Pro - Travaux d'Accès Difficiles",
  siteDescription: "Services professionnels de cordiste pour travaux en hauteur, maintenance industrielle et accès difficiles. Certification IRATA, sécurité garantie.",
};

// Hero Section
export interface HeroConfig {
  backgroundImage: string;
  backgroundImageAlt: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  /** optional path to a logo image placed in `public/` */
  brandLogo?: string;
  /** alt text used for the logo image; falls back to `brandName` */
  brandLogoAlt?: string;
  brandName: string;
  navLinks: { label: string; href: string }[];
}

export const heroConfig: HeroConfig = {
  backgroundImage: "/hero-bg.jpg",
  backgroundImageAlt: "Cordiste professionnel en action sur un chantier en hauteur",
  title: "Votre Experts en Hauteur",
  subtitle: "Travaux d'Accès Difficiles & Maintenance en Hauteur",
  ctaText: "Demander un Devis",
  ctaHref: "#contact",
  // set this to the filename you drop in public/
  brandLogo: "/logo.png",
  brandLogoAlt: "Cordiste Pro logo",
  brandName: "CORDISTE PRO",
  navLinks: [
    { label: "Accueil", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Réalisations", href: "#projects" },
    { label: "À Propos", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
};

// Intro Grid Section
export interface PortfolioImage {
  src: string;
  alt: string;
}

export interface IntroGridConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  portfolioImages: PortfolioImage[];
  accentText: string;
}

export const introGridConfig: IntroGridConfig = {
  titleLine1: "L'Excellence en",
  titleLine2: "Hauteur",
  description: "Depuis plus de 10 ans, nous mettons notre expertise du travail sur cordes au service de vos projets les plus ambitieux. De la maintenance industrielle aux travaux d'accès difficiles, notre équipe de cordistes certifiés IRATA garantit sécurité, précision et efficacité sur chaque intervention.",
  portfolioImages: [
    { src: "/portfolio-1.jpg", alt: "Technicien effectuant des travaux de maintenance sur façade" },
    { src: "/portfolio-2.jpg", alt: "Cordiste en inspection de structure industrielle" },
    { src: "/portfolio-3.jpg", alt: "Équipe de cordistes sur chantier complexe" },
    { src: "/portfolio-4.jpg", alt: "Travaux de nettoyage en hauteur sur immeuble" },
    { src: "/portfolio-5.jpg", alt: "Installation de filets de sécurité par cordiste" },
  ],
  accentText: " ",
};

// Featured Projects Section
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export interface FeaturedProjectsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  viewAllText: string;
  viewAllHref: string;
  viewProjectText: string;
  projects: Project[];
}

export const featuredProjectsConfig: FeaturedProjectsConfig = {
  subtitle: "Nos Réalisations",
  titleRegular: "Projets",
  titleItalic: "Marquants",
  viewAllText: "Obtenir une consultation",
  viewAllHref: "#contact",
  viewProjectText: "nous contactez",
  projects: [
    {
      id: 1,
      title: "Façades & Immeubles de Grande Hauteur",
      category: "Maintenance Industrielle",
      year: "",
      image: "/port.jpeg",
      description: "Nous proposons des solutions complètes d’accès sur cordes pour les façades et bâtiments en hauteur. Nos équipes interviennent pour le nettoyage de façades en verre, pierre ou béton, la peinture extérieure résistante aux intempéries, la réparation des fissures et les travaux d’étanchéité. Nous réalisons également l’installation de façades vitrées et métalliques, la pose d’enseignes et d’éclairages en hauteur ainsi que la maintenance des toitures et des zones difficiles d’accès, garantissant sécurité et qualité d’exécution.",
    },
    {
      id: 2,
      title: "Maintenance Industrielle",
      category: "Sécurité & Protection",
      year: "",
      image: "/project-2.jpg",
      description: "Nous accompagnons les sites industriels avec des services spécialisés en travaux en hauteur. Nos prestations incluent l’installation et la maintenance de tuyauteries industrielles, l’entretien de silos, cyclones et tours, ainsi que la maintenance des cheminées et systèmes d’extraction. Nous assurons le traitement anticorrosion, la peinture des structures métalliques, la maintenance des réservoirs et stations énergétiques, ainsi que l’installation d’équipements industriels. Nos inspections techniques et notre maintenance préventive contribuent à la performance et à la durabilité des installations.",
    },
    {
      id: 3,
      title: "Ports & Énergie",
      category: "Accès Difficiles",
      year: "",
      image: "/project-33.jpg",
      description: "Nous intervenons dans les environnements marins et énergétiques avec des solutions adaptées aux conditions exigeantes. Nos services comprennent la maintenance et la réparation d’infrastructures portuaires, le traitement anticorrosion de navires et yachts, ainsi que l’installation d’équipements marins. Nous réalisons également l’installation et la maintenance d’éoliennes, l’entretien des pylônes électriques et des infrastructures énergétiques, ainsi que la mise en place de réseaux électriques et télécom dans les zones isolées.",
    },
    {
      id: 4,
      title: "Ponts & Protection des Infrastructures",
      category: "Énergie Renouvelable",
      year: "",
      image: "/project-46.jpg",
      description: "Nous assurons la maintenance et la sécurisation des ponts et structures en béton ou métalliques. Nos équipes effectuent le traitement des joints et fissures, l’installation de systèmes de protection contre les chutes de pierres, ainsi que la stabilisation des falaises et des pentes. Nous posons également des câbles et filets en acier et intervenons en terrains complexes et montagneux, garantissant la sécurité des infrastructures et des usagers.",
    },
    {
      id: 5,
      title: "Stades & Grandes Infrastructures",
      category: "Inspection des Infrastructures",
      year: "",
      image: "/project-44.jpg",
      description: "Nous proposons des services de maintenance et d’inspection pour les grandes installations telles que les stades, barrages et infrastructures industrielles. Nos interventions incluent le nettoyage en hauteur, la maintenance des systèmes d’éclairage et des panneaux publicitaires, l’inspection structurelle et le diagnostic technique. Nous installons également des systèmes de sécurité et assurons des interventions d’urgence afin de garantir la continuité et la sécurité des installations.",
    },
  ],
};

// Services Section
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ServicesConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2Italic: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  subtitle: "Nos Services",
  titleLine1: "Solutions d'Accès",
  titleLine2Italic: "Professionnelles",
  description: "Nous proposons une gamme complète de services de travaux sur cordes, adaptés à tous types de projets en hauteur et d'accès difficiles. Notre expertise technique et notre équipement de pointe garantissent des interventions sûres et efficaces.",
  services: [
    {
      iconName: "Camera",
      title: "Inspection & Contrôle",
      description: "Inspection visuelle et photographique de structures, façades, ouvrages d'art et installations industrielles en hauteur.",
    },
    {
      iconName: "Diamond",
      title: "Maintenance Préventive",
      description: "Entretien régulier et maintenance préventive de vos infrastructures pour garantir leur durabilité et sécurité.",
    },
    {
      iconName: "Users",
      title: "Travaux de Rénovation",
      description: "Rénovation complète de façades, peinture en hauteur, réparation de structures et travaux d'étanchéité.",
    },
    {
      iconName: "Sparkles",
      title: "Nettoyage & Dépollution",
      description: "Nettoyage de vitres, façades, enseignes, cheminées et désamiantage par techniques d'accès sur cordes.",
    },
  ],
};

// Why Choose Me Section
export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface FeatureCard {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
}

export interface WhyChooseMeConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  statsLabel: string;
  stats: StatItem[];
  featureCards: FeatureCard[];
  wideImage: string;
  wideImageAlt: string;
  wideTitle: string;
  wideDescription: string;
}

export const whyChooseMeConfig: WhyChooseMeConfig = {
  subtitle: "Pourquoi Nous Choisir",
  titleRegular: "Notre",
  titleItalic: "Expertise",
  statsLabel: "En Chiffres",
  stats: [
    { value: 12, suffix: "+", label: "Années d'Expérience" },
    { value: 850, suffix: "+", label: "Projets Réalisés" },
    { value: 100, suffix: "%", label: "Certifiés IRATA" },
    { value: 0, suffix: "", label: "Accidents" },
  ],
  featureCards: [
    {
      image: "/feature-1.jpg",
      imageAlt: "Technicien cordiste certifié en équipement complet",
      title: "Experts en travaux sur cordes",
      description: "Nos équipes sont formées aux techniques d’accès difficile et utilisent du matériel professionnel certifié.",
    },
    {
      image: "/feature-2.jpg",
      imageAlt: "Équipement de sécurité professionnel",
      title: "Équipement Premium",
      description: "Nous utilisons uniquement du matériel certifié CE et EN, régulièrement contrôlé et entretenu pour une sécurité maximale.",
    },
  ],
  wideImage: "/wide-imag.jpg",
  wideImageAlt: "Vue panoramique d'une équipe de cordistes sur un chantier majeur",
  wideTitle: "Sécurité Avant Tout",
  wideDescription: "Chaque intervention fait l'objet d'une étude de risque détaillée et d'un plan de sécurité adapté. Notre priorité absolue : ramener chaque membre de l'équipe sain et sauf.",
};

// Testimonials Section
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface TestimonialsConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  subtitle: "Témoignages Clients",
  titleRegular: "Ils Nous",
  titleItalic: "Font Confiance",
  testimonials: [
    {
      id: 1,
      name: "Marie Dubois",
      role: "Directrice des Opérations, Tour Horizon",
      image: "",
      quote: "Cordiste Pro a réalisé l'inspection complète de notre tour en un temps record. Leur professionnalisme et leur rigueur sont exemplaires. Je les recommande sans hésitation.",
    },
    {
      id: 2,
      name: "Pierre Martin",
      role: "Chef de Chantier, Génie Civil France",
      image: "",
      quote: "Une équipe compétente et réactive. Ils ont su s'adapter aux contraintes de notre chantier sur le pont historique avec une grande flexibilité. Travail impeccable.",
    },
    {
      id: 3,
      name: "Sophie Laurent",
      role: "Responsable Maintenance, Énergie Verte",
      image: "",
      quote: "Interventions régulières sur nos parcs éoliens offshore. Leur expertise des conditions maritimes difficiles est un atout majeur pour nos opérations de maintenance.",
    },
    {
      id: 4,
      name: "Jean Bernard",
      role: "Directeur Technique, Industrie Plus",
      image: "",
      quote: "Rapidité d'intervention et respect des normes de sécurité. Cordiste Pro est devenu notre partenaire privilégié pour tous les travaux en hauteur.",
    },
    {
      id: 5,
      name: "Claire Moreau",
      role: "Chef de Projet, Construction Urbaine",
      image: "",
      quote: "Cordiste Pro a su répondre à nos besoins spécifiques sur le chantier du centre commercial. Leur approche professionnelle et leur rigueur ont permis de mener à bien des interventions complexes.",
    },
  ],
};

// FAQ Section
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  ctaText: string;
  ctaButtonText: string;
  ctaHref: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  subtitle: "Questions Fréquentes",
  titleRegular: "Vos",
  titleItalic: "Interrogations",
  ctaText: "Vous avez d'autres questions ?",
  ctaButtonText: "Contactez-Nous",
  ctaHref: "#contact",
  faqs: [
    {
      id: "faq-1",
      question: "Qu'est-ce que la certification IRATA ?",
      answer: "IRATA (Industrial Rope Access Trade Association) est l'organisation internationale de référence pour le travail sur cordes industrielle. Nos techniciens sont certifiés aux niveaux 1, 2 ou 3, garantissant des compétences validées et une formation continue aux meilleures pratiques de sécurité.",
    },
    {
      id: "faq-2",
      question: "Quels types de travaux pouvez-vous réaliser ?",
      answer: "Nous intervenons sur tous types de travaux en hauteur : inspection et contrôle, maintenance préventive et curative, nettoyage de façades et vitres, rénovation, pose de filets de sécurité, désamiantage, travaux sur éoliennes, cheminées industrielles, et bien d'autres applications.",
    },
    {
      id: "faq-3",
      question: "Comment garantissez-vous la sécurité sur vos chantiers ?",
      answer: "La sécurité est notre priorité absolue. Chaque intervention commence par une étude de risque détaillée. Nous utilisons exclusivement du matériel certifié et contrôlé régulièrement. Tous nos cordistes sont équipés de harnais, longes et matériel de protection individuelle aux normes les plus strictes.",
    },
    {
      id: "faq-4",
      question: "Quelle est votre zone d'intervention ?",
      answer: "Nous intervenons sur tout le territoire français et à l'international. Notre équipe est mobile et peut se déplacer rapidement sur vos chantiers, y compris dans des zones difficiles d'accès ou à l'étranger pour des projets spécifiques.",
    },
    {
      id: "faq-5",
      question: "Comment obtenir un devis pour mon projet ?",
      answer: "Contactez-nous par téléphone ou email avec les détails de votre projet. Nous étudierons vos besoins et vous fournirons un devis détaillé sous 48h. Pour les projets complexes, une visite sur site peut être nécessaire pour évaluer précisément les contraintes d'accès.",
    },
  ],
};

// Contact Section
export interface ContactService {
  value: string;
  label: string;
}

export interface ContactConfig {
  subtitle: string;
  titleRegular: string;
  titleItalic: string;
  description: string;
  formHeadline: string;
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    service: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  serviceOptions: ContactService[];
  buttonText: string;
  whatsappText: string;
  whatsappNumber: string;
  contactImage: string;
  contactImageAlt: string;
}

export const contactConfig: ContactConfig = {
  subtitle: "Parlons de Votre Projet",
  titleRegular: "Commençons",
  titleItalic: "Ensemble",
  description: "Votre vision mérite une exécution sûre et professionnelle. Contactez nos experts en accès sur cordes dès aujourd'hui.",
  formHeadline: "Construisons l’avenir ensemble.",
  fields: {
    name: { label: "Nom", placeholder: "Votre nom complet" },
    email: { label: "Email", placeholder: "votre@email.com" },
    phone: { label: "Téléphone", placeholder: "+212 6 XX XX XX XX" },
    service: { label: "Sélectionner un service", placeholder: "Quel service vous intéresse ?" },
    message: { label: "Message", placeholder: "Décrivez votre projet..." },
  },
  serviceOptions: [
    { value: "facade-cleaning", label: "Nettoyage de façade" },
    { value: "window-cleaning", label: "Nettoyage de vitres en hauteur" },
    { value: "waterproofing", label: "Étanchéité" },
    { value: "painting", label: "Peinture en hauteur" },
    { value: "industrial-maintenance", label: "Maintenance industrielle" },
    { value: "inspection", label: "Inspection et contrôle" },
    { value: "rope-work", label: "Travaux spécialisés sur cordes" },
  ],
  buttonText: "Envoyer le Message",
  whatsappText: "Ou contactez-nous rapidement via",
  whatsappNumber: "+212608616061",
  contactImage: "/cordiste-working.jpg",
  contactImageAlt: "Cordiste professionnel en action sur un chantier en hauteur",
};

// Footer Section
export interface SocialLink {
  iconName: string;
  href: string;
  label: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  logoText: string;
  contactLabel: string;
  email: string;
  locationText: string;
  locationHref?: string;
  navigationLabel: string;
  navLinks: FooterLink[];
  socialLabel: string;
  socialLinks: SocialLink[];
  tagline: string;
  copyright: string;
  bottomLinks: FooterLink[];
}

export const footerConfig: FooterConfig = {
  logoText: "CORDISTE",
  contactLabel: "Contactez-Nous",
  email: "contactsoshauteur@gmail.com",
  locationText: "Tanger,Boukhlef El Irfan.",
  navigationLabel: "Navigation",
  navLinks: [
    { label: "Accueil", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Réalisations", href: "#projects" },
    { label: "À Propos", href: "#why-choose" },
    { label: "FAQ", href: "#faq" },
  ],
  socialLabel: "Suivez-Nous",
  socialLinks: [
    { iconName: "Instagram", href: "https://www.instagram.com/soshauteur/", label: "Instagram" },
    { iconName: "Linkedin", href: "https://linkedin.com", label: "LinkedIn" },
    { iconName: "Mail", href: "mailto:contactsoshauteur@gmail.com", label: "Email" },
  ],
  tagline: "Sécurité & Excellence\nen Hauteur depuis 2012",
  locationHref: "https://maps.app.goo.gl/eNY95M8tBevUSxxQA?g_st=aw",
  copyright: "© 2026 Sos Hauteur. Tous droits réservés.",
  bottomLinks: [
    { label: "Mentions Légales", href: "#" },
    { label: "Politique de Confidentialité", href: "#" },
  ],
};
