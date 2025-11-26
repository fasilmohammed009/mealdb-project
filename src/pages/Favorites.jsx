import { Link } from "react-router-dom";
import MealCard from "../components/MealCard";
import {useFavourites} from "../contexts/FavoritesContext";

const Favorites = () => {
  const {favourites} = useFavourites ();
  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-emerald-800"> ♥ Favorites Meals</h1>
      {favourites.length === 0 ? (
        <p className="text-gray-600 text-center font-bold animate-bounce">You have no favorite meals yet.<br />
        <Link to="/"
         className="text-blue-500 underline">Explore Meals</Link></p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {favourites.map((meal) => (
          <MealCard key={meal.idMeal}
          meal={meal}/>
        ))}
      </div>
      )}
    </div>
  )
}

export default Favorites
