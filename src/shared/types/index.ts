export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url?: string;
  youtubeUrl?: string;
  thumbnail?: string;
  createdAt: Date;
}

export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  header: string;
  footer: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminSettings {
  theme: Theme;
  siteTitle: string;
  siteDescription: string;
  socialLinks: {
    instagram?: string;
    dribbble?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}
