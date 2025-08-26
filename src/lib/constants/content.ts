export type Experience = {
    role: string;
    date: string;
    stack: string;
    company: string;
    description: string;
}

export const experience: Experience[] = [
    {
        role: "Estudiante Auxiliar / Desarrollador de software",
        date: "Enero de 2024 - Actualidad",
        stack: "Typescript, Svelte, Tailwind, Javascript, HTML, CSS, SCSS, Bootstrap, Firebase, NodeJs, APIs, Apps Script",
        company: "Universidad Nacional de Colombia",
        description:
            "Colaboración con diversas áreas para adaptar soluciones a sus necesidades. Entre los logros destacan la estandarización de datos, reducción significativa del tiempo en procesos y mejora de la coordinación y experiencia de los usuarios."
    },
    {
        role: "Estudiante Auxiliar / Desarrollador de software",
        date: "Noviembre de 2023 - Diciembre 2023",
        stack: "Javascript, Python, Apps Script",
        company: "Universidad Nacional de Colombia",
        description:
            "Identificación y resolución de problemas mediante Apps Script y Python para automatizar tareas repetitivas, incrementando la eficiencia operativa y reduciendo el trabajo manual. La automatización de procesos administrativos internos resultó en una significativa reducción de la carga de trabajo manual y mejora de la productividad del equipo y optimizando los flujos de trabajo."
    }
];
