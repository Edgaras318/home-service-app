import CategoryCard from "@/components/CategoryCard/CategoryCard";
import styles from './CategoriesSection.module.scss';
import { categories } from "@/const/categories";
const CategoriesSection = () => {
    return (
        <section>
            <div className={styles.service}>
                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        icon={category.icon()}
                        title={category.title}
                        color={category.color}
                    />
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;
