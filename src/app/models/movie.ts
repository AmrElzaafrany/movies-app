import { Category } from "./category";

export interface Movie {
    id?: number;
    name: string;
    image: string;
    description: string;
    category_id: Category;
    
}