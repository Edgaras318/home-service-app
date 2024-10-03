// BusinessCardList.tsx
import BusinessCard from "@/components/BusinessCard/BusinessCard";
import { businesses } from "@/data/businesses";
import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "./BusinessCardList.module.scss";

type Business = {
  _id: string;
  name: string;
  images: { url: string }[];
  category: string;
  contactPerson: string;
  address: string;
};

type BusinessCardListProps = {
  category?: string;
  gridColumns?: number;
};

const BusinessCardList: React.FC<BusinessCardListProps> = ({ category, gridColumns = 4 }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);

  const toggleFavorite = (businessId: string) => {
    if (favorites.includes(businessId)) {
      setFavorites(favorites.filter(id => id !== businessId));
    } else {
      setFavorites([...favorites, businessId]);
    }
  };

  const filteredBusinesses = category
      ? businesses.filter((business: Business) => business.category === category)
      : businesses;

  return (
      <div
          className={styles.businessCardList}
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
      >
        {filteredBusinesses.map((business: Business) => (
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
