// CategoriesSection.tsx
import React from 'react';
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import styles from './CategoriesSection.module.scss';
import { categories } from "@/const/categories";

type Category = {
    id: string;
    icon: () => JSX.Element; // Assuming icon is a function returning a JSX Element
    title: string;
    color: string;
}

const CategoriesSection: React.FC = () => {
    return (
        <section>
            <div className={styles.service}>
                {categories.map((category: Category) => (
                    <CategoryCard
                        key={category.id}
                        icon={category.icon()}
                        title={category.title}
                        color={category.color}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
