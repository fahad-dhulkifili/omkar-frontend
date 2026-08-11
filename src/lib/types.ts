// ─── Strapi v5 response wrappers ───

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ─── Strapi base fields (v5 flattened) ───

interface StrapiBaseFields {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  locale?: string;
}

// ─── Media ───

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia extends StrapiBaseFields {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

// ─── Original components ───

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon?: StrapiMedia | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  photo?: StrapiMedia | null;
  linkedinUrl?: string;
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
}

export interface SocialLink {
  id: number;
  platform: "linkedin" | "twitter" | "facebook" | "instagram" | "youtube";
  url: string;
}

// ─── New components ───

export interface TimelineItem {
  id: number;
  period: string;
  heading: string;
  description: string;
}

export interface ProcessStep {
  id: number;
  stepNumber: number;
  heading: string;
  description: string;
}

export interface Industry {
  id: number;
  name: string;
}

export interface Certification {
  id: number;
  label: string;
  code?: string;
}

export interface Office {
  id: number;
  name: string;
  address: string;
  email?: string;
  website?: string;
  isPrimary: boolean;
}

export interface Registration {
  id: number;
  label: string;
  value: string;
}

export interface MDQuote {
  id: number;
  quote: string;
  authorName: string;
  authorRole: string;
  authorPhoto?: StrapiMedia | null;
}

export interface ClientEntry {
  id: number;
  text: string;
}

export interface Role {
  id: number;
  name: string;
}

// ─── Page types ───

export interface HomePage extends StrapiBaseFields {
  heroTitle: string;
  titleHighlight?: string;
  heroSubtitle?: string;
  tagline?: string;
  heroImage?: StrapiMedia | null;
  heroCTAText?: string;
  heroCTALink?: string;
  eyebrowBrands?: string[];
  certifications: Certification[];
  servicesHeading?: string;
  servicesSubheading?: string;
  featuredServices: ServiceItem[];
  stats: StatItem[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export interface AboutPage extends StrapiBaseFields {
  heading: string;
  story: string;
  storyImage?: StrapiMedia | null;
  mission?: string;
  vision?: string;
  teamHeading?: string;
  teamMembers: TeamMember[];
  timeline: TimelineItem[];
  mdQuote?: MDQuote | null;
  stats: StatItem[];
}

export interface ServicesPage extends StrapiBaseFields {
  heading: string;
  introduction?: string;
  services: ServiceItem[];
}

export interface ProcessPage extends StrapiBaseFields {
  heading: string;
  headingHighlight?: string;
  introduction?: string;
  steps: ProcessStep[];
  trainingHeading?: string;
  trainingSubheading?: string;
  trainingDescription?: string;
  trainingImages: StrapiMedia[];
  trainingTags?: string[];
  industries: Industry[];
}

export interface ContactPage extends StrapiBaseFields {
  heading: string;
  description?: string;
  email: string;
  phone?: string;
  address?: string;
  mapEmbedUrl?: string;
  offices: Office[];
  registrations: Registration[];
  socialLinks: SocialLink[];
}

export interface ClientSector extends StrapiBaseFields {
  tag: string;
  name: string;
  clients: ClientEntry[];
  rolesDeployed: Role[];
  order: number;
}

// ─── Service Pillar structure ───

export interface ServiceBullet {
  id: number;
  text: string;
}

export interface SubService {
  id: number;
  title: string;
  description?: string;
  bullets: ServiceBullet[];
}

export interface ServicePillar extends StrapiBaseFields {
  name: string;
  slug: string;
  tagline?: string;
  introduction?: string;
  h1Header?: string;
  metaDescription?: string;
  heroImage?: StrapiMedia | null;
  subServices: SubService[];
  order: number;
}
