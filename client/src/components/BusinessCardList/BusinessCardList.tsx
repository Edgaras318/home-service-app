// BusinessCardList.tsx
import BusinessCard from "@/components/BusinessCard/BusinessCard";
import useLocalStorage from "@/hooks/useLocalStorage";
import styles from "./BusinessCardList.module.scss";
import {Business} from "@/types";
import {ApiService} from "@/services/api-services";
import React, {useEffect, useState} from "react";
import Spinner from "@/components/Spinner/Spinner";

type BusinessCardListProps = {
  category?: string;
  gridColumns?: number;
};

const BusinessCardList: React.FC<BusinessCardListProps> = ({ category, gridColumns = 4 }) => {
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorites', []);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = async () => {
    try {
      const response = await ApiService.getBusinesses();
      if (response.data && Array.isArray(response.data)) {
        setBusinesses(response.data);
      } else {
        throw new Error('Unexpected data structure');
      }
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const toggleFavorite = (businessId: string) => {
    if (favorites.includes(businessId)) {
      setFavorites(favorites.filter(id => id !== businessId));
    } else {
      setFavorites([...favorites, businessId]);
    }
  };

  const filteredBusinesses = category
      ? businesses.filter((business: Business) => business.category.name === category)
      : businesses;

  if (loading) return <Spinner />;
  if (error) return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchBusinesses}>Retry</button>
      </div>
  );

  return (
      <div
          className={styles.businessCardList}
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
      >
        {filteredBusinesses.map((business: Business) => (
            <BusinessCard
                key={business._id}
                business={business}
                isFavorite={favorites.includes(business._id)} // This line is correct
                toggleFavorite={toggleFavorite} // Make sure this line is correct
            />
        ))}
      </div>
  );
};

export default BusinessCardList;
