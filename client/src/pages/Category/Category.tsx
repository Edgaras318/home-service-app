import React from "react";
import { useParams } from "react-router-dom";
import BusinessCardList from "@/components/BusinessCardList/BusinessCardList";
import VerticalCategoriesSection from "@/components/VerticalCategoriesSection/VerticalCategoriesSection";
import styles from "./Category.module.scss";

// Define an interface for the route parameters
type Params = {
    category?: string; // category is optional in case it's not defined in the route
}

const Category: React.FC = () => {
    const { category } = useParams<Params>(); // Specify the type for useParams

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <VerticalCategoriesSection />
            </div>
            <div className={styles.categoryContainer}>
                <h1 className={styles.title}>{category || "Category Not Found"}</h1>
                <BusinessCardList category={category} gridColumns={3} />
            </div>
        </div>
    );
};

export default Category;
