// VerticalCategoriesSection.tsx
import React from "react";
import styles from "./VerticalCategoriesSection.module.scss";
import VerticalCategoryCard from "@/components/VerticalCategoryCard/VerticalCategoryCard";
import { categories } from "@/const/categories";

type Category = {
  id: number;
  icon: () => JSX.Element; // Assuming the icon is a function that returns a JSX element
  title: string;
  color: string;
};

const VerticalCategoriesSection: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.categoriesList}>
        {categories.map((category: Category) => (
          <VerticalCategoryCard
            key={category.id}
            icon={category.icon()}
            title={category.title}
            color={category.color}
          />
        ))}
      </div>
    </div>
  );
};

export default VerticalCategoriesSection;
