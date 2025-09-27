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

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface AdminSettings {
  siteTitle: string;
  siteDescription: string;
  headerText: string;
  footerText: string;
  socialLinks: {
    instagram?: string;
    dribbble?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}
