import { createContext, useContext } from "react";
import { useEffect, useState } from "react";


const FavoritesContext = createContext ();
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

export const FavoritesProvider = ({children}) => {
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

    const isFavourite = (id) => favourites.some((m) => m.idMeal === id);

    return <FavoritesContext.Provider value={{favourites, toggle, isFavourite}}>
        {children}
    </FavoritesContext.Provider>
};


export const useFavourites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error ("Something went wrong")
    }
    return context;
}