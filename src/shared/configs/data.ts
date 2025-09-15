import { Project, Video } from "@/shared/types";

// Sample projects data
export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Brand Identity for Tech Startup",
    description:
      "Complete brand identity design including logo, color palette, typography, and brand guidelines for a modern tech startup.",
    image: "/images/project1.jpg",
    category: "Brand Identity",
    tags: ["Logo Design", "Brand Guidelines", "Typography"],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "E-commerce Website Design",
    description:
      "Modern, responsive e-commerce website design with focus on user experience and conversion optimization.",
    image: "/images/project2.jpg",
    category: "Web Design",
    tags: ["UI/UX", "E-commerce", "Responsive Design"],
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    id: "3",
    title: "Mobile App Interface",
    description:
      "Clean and intuitive mobile app interface design with modern aesthetics and smooth user interactions.",
    image: "/images/project3.jpg",
    category: "Mobile Design",
    tags: ["Mobile UI", "App Design", "User Experience"],
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "4",
    title: "Print Design Collection",
    description:
      "Creative print design collection including business cards, flyers, and promotional materials.",
    image: "/images/project4.jpg",
    category: "Print Design",
    tags: ["Print", "Marketing", "Typography"],
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2023-12-20"),
  },
  {
    id: "5",
    title: "Photography Portfolio",
    description:
      "Professional photography portfolio showcasing various styles and techniques.",
    image: "/images/project5.jpg",
    category: "Photography",
    tags: ["Portrait", "Commercial", "Creative"],
    createdAt: new Date("2023-12-15"),
    updatedAt: new Date("2023-12-15"),
  },
  {
    id: "6",
    title: "Social Media Campaign",
    description:
      "Comprehensive social media campaign design with consistent visual identity across all platforms.",
    image: "/images/project6.jpg",
    category: "Social Media",
    tags: ["Social Media", "Campaign", "Digital Marketing"],
    createdAt: new Date("2023-12-10"),
    updatedAt: new Date("2023-12-10"),
  },
];

// Sample videos data
export const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Design Process Walkthrough",
    description:
      "A detailed walkthrough of my design process from concept to final delivery.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    title: "Brand Identity Creation",
    description:
      "Step-by-step process of creating a complete brand identity from scratch.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    title: "UI/UX Design Tips",
    description:
      "Essential tips and tricks for creating better user interfaces and experiences.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    createdAt: new Date("2024-01-10"),
  },
];

// Local storage helpers
export const getProjects = (): Project[] => {
  if (typeof window === "undefined") return sampleProjects;
  const stored = localStorage.getItem("portfolio-projects");
  return stored ? JSON.parse(stored) : sampleProjects;
};

export const saveProjects = (projects: Project[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolio-projects", JSON.stringify(projects));
};

export const getVideos = (): Video[] => {
  if (typeof window === "undefined") return sampleVideos;
  const stored = localStorage.getItem("portfolio-videos");
  return stored ? JSON.parse(stored) : sampleVideos;
};

export const saveVideos = (videos: Video[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolio-videos", JSON.stringify(videos));
};
