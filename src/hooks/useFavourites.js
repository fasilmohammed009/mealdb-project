import { useEffect, useState } from 'react';
const STORAGE_KEY = 'favouriteMeals';

const loadFavouritesFromStorage = () => {
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }catch (err) {
    console.log('Failed to parse favorites from localStorage', err);
    return [];
    }
};

export default function useFavourites() {
    const [favourites, setFavourites] = useState (loadFavouritesFromStorage);
    useEffect (() => {
        try{
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
        }catch (err) {
          console.log('failed to save favourites',err);
    }
    },[favourites]);

    const toggle = (meal) =>{
        setFavourites((prev) => {
            const exists = prev.some((m) => m.idMeal === meal.idMeal);

            return exists ? prev.filter((m) => m.idMeal !== meal.idMeal) : [...prev, meal];
        });
    };

    const isFavourite = (meal) => favourites.some((m) => m.idMeal === meal.idMeal);

    return {favourites, toggle, isFavourite};
}