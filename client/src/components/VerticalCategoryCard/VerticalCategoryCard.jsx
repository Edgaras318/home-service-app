import styles from "./VerticalCategoryCard.module.scss";
import { Link, useParams } from "react-router-dom";

const VerticalCategoryCard = ({ icon, title, color }) => {
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
    >
      <div className={styles.icon} style={{ "--card-color": color }}>
        {icon}
      </div>
      <p className={styles.title}>{title}</p>
    </Link>
  );
};

export default VerticalCategoryCard;
