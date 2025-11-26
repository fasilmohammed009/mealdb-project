// import React, { useState ,useEffect} from 'react'
// import { useSearchParams } from 'react-router-dom'
// import { searchMeals } from '../api/Mealdb';
// import LoadingSpinner from '../components/LoadingSpinner';
// import MealCard from '../components/MealCard';
// const SearchResult = () => {

//   const [searchParams] = useSearchParams ();
//   const query = searchParams.get("q") || "";
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() =>{
//     if(!query){
//       setMeals([]);
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     searchMeals(query).then((res) => setMeals(res.data.meals || []))
//     .catch((err) => console.log(err))
//     .finally(()=> setLoading(false));
//   },[query]);
//   if(loading) return <LoadingSpinner />
//   return (
//     <div className='max-w-6xl mx-auto p-4'>
//       <h1 className='text-3xl font-semibold mb-6'> Search Results for "{query}"</h1>
//       {meals.length === 0 ? <p>bad</p> : <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
//         {meals.map((meal) => (
//           <MealCard  key={meal.idMeal} meal={meal}/>
//         ))}
//       </div>}
//     </div>
//   )
// }

// export default SearchResult

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMeals, fetchByArea } from '../api/Mealdb'
import LoadingSpinner from '../components/LoadingSpinner'
import MealCard from '../components/MealCard'

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setMeals([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([
      searchMeals(query),     // product search
      fetchByArea(query)      // area search
    ])
      .then(([mealRes, areaRes]) => {
        const mealData = mealRes.data.meals || [];
        const areaData = areaRes.data.meals || [];

        // merge without duplicates
        const final = [...mealData];

        areaData.forEach((item) => {
          if (!final.some(m => m.idMeal === item.idMeal)) {
            final.push(item);
          }
        });

        setMeals(final);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className='max-w-6xl mx-auto p-4'>
      <h1 className='text-3xl font-semibold mb-6'>
        Search Results for "{query} Food"
      </h1>

      {meals.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {meals.map(meal => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;

