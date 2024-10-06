// CategoryCard.tsx
import React from "react";
import styles from "./CategoryCard.module.scss";
import { Link } from "react-router-dom"; // Import the SCSS file for styling
import {Category} from "@/types";
import UrlIcon from "@/components/common/UrlIcon/UrlIcon";

type CategoryCardProps = {
    category: Category; // Expect category object here
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
    const { _id, iconUrl, name, backgroundColor } = category; // Destructure properties from the category
    const routePath = `/search/${name?.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <Link to={routePath} className={styles.card}>
            <UrlIcon
                url={iconUrl}
                size={48}
                color={backgroundColor}
            />
            <p>{name}</p>
        </Link>
    );
};

export default CategoryCard;
