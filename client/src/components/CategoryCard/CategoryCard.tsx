// CategoryCard.tsx
import React from "react";
import styles from "./CategoryCard.module.scss";
import { Link } from "react-router-dom"; // Import the SCSS file for styling

type CategoryCardProps = {
    icon: JSX.Element; // Assuming icon is a JSX element
    title: string;
    color: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ icon, title, color }) => {
    const routePath = `/search/${title.replace(/\s+/g, "-").toLowerCase()}`;

    return (
        <Link to={routePath} className={styles.card}>
            <div className={styles.icon} style={{ "--card-color": color }}>
                {icon}
            </div>
            <p>{title}</p>
        </Link>
    );
};

export default CategoryCard;
