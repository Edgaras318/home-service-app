import React from "react";
import styles from "./VerticalCategoriesSection.module.scss";
import VerticalCategoryCard from "@/components/VerticalCategoryCard/VerticalCategoryCard";
import { Category } from "@/types/categories";
import Spinner from "@/components/Spinner/Spinner";
import { useCategories } from "@/hooks/useCategories";

const VerticalCategoriesSection: React.FC = () => {
    const { data: categories, error, isLoading, invalidateCategories } = useCategories();

    // Loading state
    if (isLoading) return <Spinner />;

    // Error handling
    if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
                <button onClick={invalidateCategories}>Retry</button>
            </div>
        );
    }

    // Render categories
    const renderCategories = () => {
        if (!categories || categories.length === 0) {
            return <p>No categories available.</p>;
        }

        return categories.map((category: Category) =>
            category?.name && category._id ? (
                <VerticalCategoryCard key={category._id} category={category} />
            ) : (
                <p key={category._id}>Category data is incomplete.</p>
            )
        );
    };

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categories</h2>
            <div>{renderCategories()}</div>
        </section>
    );
};

export default VerticalCategoriesSection;
