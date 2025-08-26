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
        case Technology.Tailwind:
            return "Tailwind CSS";
        case Technology.Javascript:
            return "JavaScript";
        case Technology.HTML:
            return "HTML";
        case Technology.CSS:
            return "CSS";
        case Technology.SCSS:
            return "SCSS";
        case Technology.Bootstrap:
            return "Bootstrap";
        case Technology.Firebase:
            return "Firebase";
        case Technology.NodeJs:
            return "Node.js";
        case Technology.AppsScript:
            return "Google Apps Script";
        case Technology.Python:
            return "Python";
        default:
            return "Unknown";
    }
}