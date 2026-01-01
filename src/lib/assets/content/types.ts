import type { Technology } from "./technology";

export type Experience = {
    role: string;
    date: string;
    stack: Technology[];
    company: string;
    description: string;
};

export type Project = {
    image?: string;
    title: string;
    description: string;
    technologies: Technology[];
    url?: string;
    github?: string;
};

export type Content = {
    name: string;
    
    hero: {
        badge: string;
        title: string;
        description: string;
    };

    experience: {
        title: string;
        description: string;

        items: Experience[];
    };

    work: {
        title: string;
        description: string;

        projects: Project[];
        work: Project[];
    };

    skills: {
        title: string;
        description: string;
        technologies: Record<string, Technology[]>;
    }
}