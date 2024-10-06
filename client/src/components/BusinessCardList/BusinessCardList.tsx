import BusinessCard from "@/components/BusinessCard/BusinessCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "./BusinessCardList.module.scss";
import { Business } from "@/types";
import Spinner from "@/components/Spinner/Spinner";
import { useBusinesses } from "@/hooks/useBusinesses";

type BusinessCardListProps = {
  category?: string;
  gridColumns?: number;
};

const BusinessCardList: React.FC<BusinessCardListProps> = ({ category, gridColumns = 4 }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const { data: businesses, error, isLoading, invalidateBusinesses, setBusinesses } = useBusinesses();

  const toggleFavorite = (businessId: string) => {
    const updatedFavorites = favorites.includes(businessId)
        ? favorites.filter(id => id !== businessId)
        : [...favorites, businessId];

    setFavorites(updatedFavorites);

    // Update the cached businesses immediately
    setBusinesses(businesses.map(business => ({
      ...business,
      isFavorite: updatedFavorites.includes(business._id),
    })));

    // Invalidate the queries if needed
    invalidateBusinesses();
  };

  const filteredBusinesses = category
      ? businesses?.filter((business: Business) => business.category.name === category)
      : businesses;

  if (isLoading) return <Spinner />;
  if (error) return (
      <div>
        <p>Error: {error.message}</p>
        <button onClick={() => invalidateBusinesses()}>Retry</button>
      </div>
  );

  return (
      <div
          className={styles.businessCardList}
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
      >
        {filteredBusinesses?.map((business: Business) => (
            <BusinessCard
                key={business._id}
                business={business}
                isFavorite={favorites.includes(business._id)}
                toggleFavorite={toggleFavorite}
            />
        ))}
      </div>
  );
};

export default BusinessCardList;
