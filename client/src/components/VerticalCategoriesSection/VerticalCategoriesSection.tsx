import React from "react";
import styles from "./VerticalCategoriesSection.module.scss";
import VerticalCategoryCard from "@/components/VerticalCategoryCard/VerticalCategoryCard";
import { Category } from "@/types/categories";
import Spinner from "@/components/Spinner/Spinner";
import { useCategories } from "@/hooks/useCategories";

const VerticalCategoriesSection: React.FC = () => {
    const { data: categories, error, isLoading, refetch, invalidateCategories } = useCategories();

    if (isLoading) return <Spinner />;
    if (error) return (
        <div>
            <p>Error: {error.message}</p>
            <button onClick={() => invalidateCategories()}>Retry</button> {/* Invalidate to refetch data */}
        </div>
    );

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>Categories</h2>
            <div>
                {categories.length === 0 ? (
                    <p>No categories available.</p>
                ) : (
                    categories.map((category: Category) =>
                        category?.name && category._id ? (
                            <VerticalCategoryCard key={category._id} category={category} />
                        ) : (
                            <p key={category._id}>Category data is incomplete.</p>
                        )
                    )
                )}
            </div>
        </section>
    );
};

export default VerticalCategoriesSection;
