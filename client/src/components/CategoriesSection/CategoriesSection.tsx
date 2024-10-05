import React, { useEffect, useState } from 'react';
import CategoryCard from "@/components/CategoryCard/CategoryCard";
import styles from './CategoriesSection.module.scss';
import { Category } from '@/types/categories';
import { ApiService } from "@/services/api-services";
import Spinner from "@/components/Spinner/Spinner"; // Assume you have a Spinner component

const CategoriesSection: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCategories = async () => {
        try {
            const response = await ApiService.getCategories();
            if (response.data && Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                throw new Error('Unexpected data structure');
            }
        } catch (err: any) {
            console.error('Error fetching categories:', err);
            setError(err?.response?.data?.message || err?.message || 'Failed to load categories');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    if (loading) return <Spinner />;
    if (error) return (
        <div>
            <p>Error: {error}</p>
            <button onClick={fetchCategories}>Retry</button>
        </div>
    );

    return (
        <section>
            <div className={styles.service}>
                {categories.length === 0 ? (
                    <p>No categories available.</p>
                ) : (
                    categories.map((category: Category) => (
                        category?.name && category._id ? (
                            <div>
                                <CategoryCard key={category._id} category={category} />
                            </div>
                        ) : (
                            <p key={category._id}>Category data is incomplete.</p>
                        )
                    ))
                )}
            </div>
        </section>
    );
};

export default CategoriesSection;
