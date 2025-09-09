type ResourceType = "Category" | "Shortcut" | "software";
type ResourceSlug = "categories" | "shortcuts" | "software"

export interface Resource{
    "@id": string;
    "@type": ResourceType;
    id: number;
}

export interface Collection<T>{
    "@id": string;
    "@type": "hydra:collection";
    id: number;
    "hydra:member": T[];
}

export interface Category extends Resource {
    "@type": "Category";
    "name": string;
}

export interface Software extends Resource {
    "@type": "software";
    "name": string;
}

export interface Shortcut extends Resource {
    "@type": "Shortcut";
    "title": string;
    "windows": string;
    "macos": string;
    "linux": string;
    "context": string;
    "description": string;
    "software": Software;
    "Categories": Category[];
}


export async function getCategory(id: number): Promise<Category> {
    const response = await fetch('https://shortcuts.api.pierre-jehan.com/categories/'+id)
    const data: Category = await response.json();
    return data;
}

export async function getCategories(): Promise<Category[]> {
    const response = await fetch('https://shortcuts.api.pierre-jehan.com/categories')
    const data: Collection<Category> = await response.json();
    return data["hydra:member"];
}

export async function getCollection<T>(slug:ResourceSlug ): Promise<T[]> {
    const response = await fetch('https://shortcuts.api.pierre-jehan.com/'+ slug)
    const data: Collection<T> = await response.json();
    return data["hydra:member"];
}

export function getResource<T>(slug: ResourceSlug ) {
    return getCollection<T>(slug);
}