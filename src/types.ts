export type TabType = 'work' | 'engineering' | 'experience' | 'about' | 'contact';

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
