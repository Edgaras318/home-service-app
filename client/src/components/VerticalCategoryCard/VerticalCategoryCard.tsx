// VerticalCategoryCard.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VerticalCategoryCard.module.scss";

type VerticalCategoryCardProps = {
  icon: React.ReactNode; // or a specific type if it's a certain component
  title: string;
  color: string;
};

const VerticalCategoryCard: React.FC<VerticalCategoryCardProps> = ({
  icon,
  title,
  color,
}) => {
  const routePath = `/search/${title.replace(/\s+/g, "-").toLowerCase()}`;
  const params = useParams();
  const activeName = params.category;

  // Compare in a case-insensitive manner
  const isActive =
    activeName &&
    activeName.toLowerCase() === title.replace(/\s+/g, "-").toLowerCase();

  return (
    <Link
      to={routePath}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      aria-label={`Search for ${title}`} // Add descriptive ARIA label
    >
      <div
        className={styles.icon}
        style={{ "--card-color": color || "#000" }} // Fallback to black if no color provided
      >
        {icon || <span className={styles.defaultIcon}>🔍</span>}{" "}
        {/* Default icon if none provided */}
      </div>
      <p className={styles.title}>{title}</p>
    </Link>
  );
};

export default VerticalCategoryCard;
