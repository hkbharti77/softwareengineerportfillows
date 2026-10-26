export type TabType = 'work' | 'engineering' | 'experience' | 'blog' | 'pricing' | 'about' | 'contact' | 'privacy' | 'terms' | 'cookies';

export type ProjectCategory = 'all' | 'generative-ai' | 'distributed-systems' | 'full-stack';

export interface ProjectItem {
  id: string;
  projectNumber: string;
  categoryTag: string;
  category: ProjectCategory;
  title: string;
  description: string;
  architecturePoints: { label: string; value: string; color: string }[];
  metrics: { label: string; value: string; subtext: string; color?: string }[];
  figCaption: string;
  imageSrc: string;
  imageAlt: string;
}

export interface VoiceStepData {
  step: number;
  label: string;
  timing: string;
  title: string;
  shortDesc: string;
  badge: string;
  inspectorTitle: string;
  inspectorDesc: string;
  duration: string;
  latency: string;
  loss: string;
}

export interface InquestFormData {
  name: string;
  email: string;
  inquiryType: 'Full-time Role' | 'AI System Build' | 'Advisory & Consultation';
  message: string;
  ndaRequired: boolean;
  consent: boolean;
}

export type BlogCategory = string;

export interface DispatchArticle {
  id: string;
  slug: string;
  slugId?: string;
  issueNumber?: string;
  category: string;
  categoryLabel?: string;
  channel?: string;
  title: string;
  seoTitle?: string;
  subtitle?: string;
  date: string;
  createdAt?: string;
  readTime: string;
  readingTimeMinutes?: number;
  excerpt: string;
  content?: string | string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  tags: string[];
  tag?: string;
  author?: string;
  isFeatured?: boolean;
  imageUrl?: string;
  coverImage?: string;
  coverImageAlt?: string;
  pdfUrl?: string;
  pdfName?: string;
  ogImageUrl?: string;
  prevPost?: { slug: string; title: string } | null;
  nextPost?: { slug: string; title: string } | null;
}

export interface PricingTier {
  id: string;
  tierNumber: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  commitment: string;
  isPopular?: boolean;
  deliverables: string[];
  idealFor: string;
  turnaround: string;
  ctaText: string;
}
