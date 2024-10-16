import {Category} from "@/types/categories";

export type Business = {
    _id: string;
    name: string;
    description: string;
    category: Category;
    contactPerson: string;
    address: string;
    email: string;
    photos: string[];
};
