// VerticalCategoryCard.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./VerticalCategoryCard.module.scss";
import {Category} from "@/types";
import UrlIcon from "@/components/common/UrlIcon/UrlIcon";

type VerticalCategoryCardProps = {
  category: Category; // Expect category object here
};

const VerticalCategoryCard: React.FC<VerticalCategoryCardProps> = ({ category }) => {
  const { _id, iconUrl, name, backgroundColor } = category; // Destructure properties from the category
  const routePath = `/search/${name?.replace(/\s+/g, "-").toLowerCase()}`;
  const params = useParams();
  const activeName = params.category;

  // Compare in a case-insensitive manner
  const isActive =
    activeName &&
    activeName.toLowerCase() === name?.replace(/\s+/g, "-").toLowerCase();

  return (
    <Link
      to={routePath}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
      aria-label={`Search for ${name}`} // Add descriptive ARIA label
    >
      <UrlIcon
          url={iconUrl}
          size={48}
          color={backgroundColor}
      />
      <p >{name}</p>
    </Link>
  );
};

export default VerticalCategoryCard;
