// CategoryCard.tsx
import React from "react";
import styles from "./CategoryCard.module.scss";
import { Link } from "react-router-dom"; // Import the SCSS file for styling
import {Category} from "@/types";

type CategoryCardProps = {
    category: Category; // Expect category object here
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const { _id, iconUrl, name, backgroundColor } = category; // Destructure properties from the category
    const routePath = `/search/${name?.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <>
            <div>{name}</div>
            <div>{routePath}</div>
        </>
        // <Link to={routePath} className={styles.card}>
        //     <div className={styles.icon} style={{ "--card-color": color }}>
        //         {icon}
        //     </div>
        //     <p>{title}</p>
        // </Link>
    );
};

export default CategoryCard;
