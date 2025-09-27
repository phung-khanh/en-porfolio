import { Project, Video } from "@/shared/types";

// Sample projects data for seeding
export const sampleProjects = [
  {
    title: "Brand Identity for Tech Startup",
    description:
      "Complete brand identity design including logo, color palette, typography, and brand guidelines for a modern tech startup.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    category: "Brand Identity",
    tags: ["Logo Design", "Brand Guidelines", "Typography"],
    featured: true,
  },
  {
    title: "E-commerce Website Design",
    description:
      "Modern, responsive e-commerce website design with focus on user experience and conversion optimization.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Web Design",
    tags: ["UI/UX", "E-commerce", "Responsive Design"],
    featured: true,
  },
  {
    title: "Mobile App Interface",
    description:
      "Clean and intuitive mobile app interface design with modern aesthetics and smooth user interactions.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Mobile Design",
    tags: ["Mobile UI", "App Design", "User Experience"],
    featured: false,
  },
  {
    title: "Print Design Collection",
    description:
      "Creative print design collection including business cards, flyers, and promotional materials.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    category: "Print Design",
    tags: ["Print", "Marketing", "Typography"],
    featured: false,
  },
  {
    title: "Photography Portfolio",
    description:
      "Professional photography portfolio showcasing various styles and techniques.",
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
    category: "Photography",
    tags: ["Portrait", "Commercial", "Creative"],
    featured: true,
  },
  {
    title: "Social Media Campaign",
    description:
      "Comprehensive social media campaign design with consistent visual identity across all platforms.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    category: "Social Media",
    tags: ["Social Media", "Campaign", "Digital Marketing"],
    featured: false,
  },
];

// Sample videos data for seeding
export const sampleVideos = [
  {
    title: "Design Process Walkthrough",
    description:
      "A detailed walkthrough of my design process from concept to final delivery.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "Brand Identity Creation",
    description:
      "Step-by-step process of creating a complete brand identity from scratch.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    title: "UI/UX Design Tips",
    description:
      "Essential tips and tricks for creating better user interfaces and experiences.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
];

// Local storage helpers (deprecated - now using database)
export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("portfolio-projects");
  return stored ? JSON.parse(stored) : [];
};

export const saveProjects = (projects: Project[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolio-projects", JSON.stringify(projects));
};

export const getVideos = (): Video[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("portfolio-videos");
  return stored ? JSON.parse(stored) : [];
};

export const saveVideos = (videos: Video[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolio-videos", JSON.stringify(videos));
};
