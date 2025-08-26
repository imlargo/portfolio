export enum Technology {
    Svelte
}

export function getLabel(technology: Technology): string {
    switch (technology) {
        case Technology.Svelte:
            return "Svelte";
        default:
            return "Unknown";
    }
}