// BusinessCardList.js
import BusinessCard from "@/components/BusinessCard/BusinessCard";
import { businesses } from "@/data/businesses";
import useLocalStorage from "@/hooks/useLocalStorage"; // Import the custom hook
import styles from "./BusinessCardList.module.scss";

const BusinessCardList = ({ category, gridColumns = 4 }) => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []); // Manage favorites state here

  const toggleFavorite = (businessId) => {
    if (favorites.includes(businessId)) {
      setFavorites(favorites.filter(id => id !== businessId));
    } else {
      setFavorites([...favorites, businessId]);
    }
  };

  const filteredBusinesses = category
      ? businesses.filter((business) => business.category === category)
      : businesses;

  return (
      <div
          className={styles.businessCardList}
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }} // Dynamically set columns
      >
        {filteredBusinesses.map((business) => (
            <BusinessCard
                key={business._id}
                business={business}
                isFavorite={favorites.includes(business._id)} // Pass favorite status
                toggleFavorite={toggleFavorite} // Pass the toggle function
            />
        ))}
      </div>
  );
};

export default BusinessCardList;
