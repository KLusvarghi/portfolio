export type BlogPost = {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  tags: string[]
  image?: string | null
}

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription?: string[];
  image?: string | null;
  tags: string[];
  github: string;
  demo: string | null;
  categories?: string[];
  startDate: string; // Format: "YYYY" or "YYYY-MM"
  endDate: string | null; // null if ongoing, or "YYYY" or "YYYY-MM"
};


export type WorkExperience = {
  title: string;
  company: string;
  period: string;
  location: string;
  description?: string;
  technologies?: string[];
  responsibilities?: string[];
  achievements?: string[];
};

export type Language = {
  name: string;
  level: string;
  certificate?: string;
};


export type Education = {
  institution: string;
  degree: string;
  period: string;
  mode: string;
  grade?: string;
};

export type ResumeData = {
  personalInfo: {
    name: string;
    title: string;
    extendedTitle: string;
    email: string;
    location: string;
    linkedin: string;
    github: string | null;
    instagram?: string;
    cv: string;
    phone?: string;
    photo?: string;
    yearsOfExperience: string;
    teamLeadExperience: string;
  };
  shortSummary: string;
  summary: string[];
  skills: {
    languages: string[];
    architecture: string[];
    cloud: string[];
    data: string[];
    quality: string[];
  };
  experience: WorkExperience[];
  education: Education[];
};
