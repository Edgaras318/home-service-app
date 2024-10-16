import { useState, useEffect } from 'react';

// Define a generic type for the value stored in local storage
type UseLocalStorage<T> = [T, React.Dispatch<React.SetStateAction<T>>];

const useLocalStorage = <T,>(key: string, initialValue: T): UseLocalStorage<T> => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
};

export default useLocalStorage;