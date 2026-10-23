export type TabType = 'work' | 'engineering' | 'experience' | 'blog' | 'pricing' | 'about' | 'contact';

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
}

export type BlogCategory = 'all' | 'voice-ai' | 'distributed' | 'rag-search' | 'architecture';

export interface DispatchArticle {
  id: string;
  issueNumber: string;
  category: BlogCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
  tags: string[];
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
