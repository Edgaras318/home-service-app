import React from 'react';
import { useCategories } from '@/hooks/useCategories';
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import styles from './CategoriesSection.module.scss';
import Spinner from "@/components/Spinner/Spinner";

const CategoriesSection: React.FC = () => {
    const { data: categories, error, isLoading, refetch, invalidateCategories } = useCategories();

    if (isLoading) return <Spinner />;
    if (error) return (
        <div>
            <p>Error: {error.message}</p>
            <button onClick={() => invalidateCategories()}>Retry</button> {/* Invalidate to refetch data */}
        </div>
    );

    return (
        <section>
            <div className={styles.service}>
                {categories?.length === 0 ? (
                    <p>No categories available.</p>
                ) : (
                    categories?.map((category) =>
                        category?.name && category._id ? (
                            <CategoryCard key={category._id} category={category} />
                        ) : (
                            <p key={category._id}>Category data is incomplete.</p>
                        )
                    )
                )}
            </div>
        </section>
    );
};

export default CategoriesSection;
