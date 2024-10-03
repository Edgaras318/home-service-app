import CategoriesSection from "@/components/CategoriesSection/CategoriesSection";
import HeroSection from "@/components/HeroSection/HeroSection";
import BusinessCardList from "@/components/BusinessCardList/BusinessCardList";
import styles from "./Home.module.scss";
const Home = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <h3 className={styles.title}>Popular businesses</h3>
      <BusinessCardList />
    </>
  );
};

export default Home;
