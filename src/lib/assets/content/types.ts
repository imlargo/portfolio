
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