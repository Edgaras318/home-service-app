import styles from "./VerticalCategoriesSection.module.scss";
import VerticalCategoryCard from "@/components/VerticalCategoryCard/VerticalCategoryCard";
import { categories } from "@/const/categories";

const VerticalCategoriesSection = () => {

  return (
    <div>
      <h2 className={styles.title}>Categories</h2>
      {categories.map((category) => (
        <VerticalCategoryCard
          key={category.id}
          icon={category.icon()}
          title={category.title}
          color={category.color}
        />
      ))}
    </div>
  );
};

export default VerticalCategoriesSection;
