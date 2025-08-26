export enum Technology {
    Typescript, 
    Svelte, 
    Tailwind, 
    Javascript, 
    HTML, 
    CSS, 
    SCSS, 
    Bootstrap, 
    Firebase, 
    NodeJs, 
    AppsScript, 
    Python,
}

export function getLabel(technology: Technology): string {
    switch (technology) {
        case Technology.Svelte:
            return "Svelte";
        default:
            return "Unknown";
    }
}