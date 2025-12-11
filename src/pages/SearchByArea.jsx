// import React, { useState } from "react";
// import { fetchByArea } from "../api/Mealdb";
// import MealCard from "../components/MealCard";
// import LoadingSpinner from "../components/LoadingSpinner";

// const SearchByArea = () => {
//   const [area, setArea] = useState("");
//   const [meals, setMeals] = useState([]);
//   const [searched, setSearched] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!area.trim()) {
//       setMeals([]);
//       setSearched(false);
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetchByArea(area);
//       setMeals(res.data.meals || []);
//       setSearched(true);
//     } catch (error) {
//       console.error(error);
//       setMeals([]);
//       setSearched(true);
//     }

//     setLoading(false);
//   };

//   const handleInputChange = (e) => {
//     setArea(e.target.value);

//     if (e.target.value === "") {
//       setMeals([]);
//       setSearched(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen text-center">
//       <h1 className="text-3xl font-bold mb-6 text-emerald-800">
//         Search By Area
//       </h1>

//       <form onSubmit={handleSubmit} className="flex justify-center gap-3 mb-6">
//         <input
//           type="text"
//           placeholder="Enter your area (e.g., Canadian, Italian)"
//           value={area}
//           onChange={handleInputChange}
//           className="border-2 px-4 py-2 rounded w-80"
//         />
//         <button className="bg-emerald-700 text-white px-5 py-2 rounded hover:bg-emerald-800">
//           Submit
//         </button>
//       </form>

//       {/* SHOW LOADING */}
//       {loading && <LoadingSpinner />}

//       {/* SHOW RESULTS */}
//       {!loading && searched && meals.length > 0 && (
//         <>
//           <h2 className="text-green-700 text-xl font-semibold mb-4">
//             Meals found for "{area}"
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {meals.map((meal) => (
//               <MealCard key={meal.idMeal} meal={meal} />
//             ))}
//           </div>
//         </>
//       )}

//       {/* SHOW NO RESULTS */}
//       {!loading && searched && meals.length === 0 && (
//         <p className="text-red-600 text-lg font-semibold">
//           No meals found for "{area}"
//         </p>
//       )}
//     </div>
//   );
// };

// export default SearchByArea;

import React, { useState } from "react";
import { fetchByArea } from "../api/Mealdb";
import MealCard from "../components/MealCard";
import LoadingSpinner from "../components/LoadingSpinner";

const AREAS = ["American", "Indian", "Canadian","china"]; // your fixed dropdown options

const SearchByArea = () => {
  const [area, setArea] = useState("");
  const [meals, setMeals] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAreaChange = async (e) => {
    const selectedArea = e.target.value;
    setArea(selectedArea);

    if (!selectedArea) {
      setMeals([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const res = await fetchByArea(selectedArea);
      setMeals(res.data.meals || []);
    } catch {
      setMeals([]);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gray-50 min-h-screen text-center">
      <h1 className="text-3xl font-bold mb-6 text-emerald-800">
        Search By Area
      </h1>

      {/* Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={area}
          onChange={handleAreaChange}
          className="border-2 border-emerald-600 p-3 rounded-lg w-80 text-lg focus:ring-2 focus:ring-emerald-600"
        >
          <option value=""> -- Select Area -- </option>
          {AREAS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Initial Message */}
      {!searched && (
        <p className="text-gray-600 text-lg font-medium">
          Please select your area food
        </p>
      )}

      {/* Loading */}
      {loading && <LoadingSpinner />}

      {/* Results */}
      {!loading && searched && meals.length > 0 && (
        <>
          <h2 className="text-green-700 text-xl font-semibold mb-4">
            Meals found for "{area}"
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        </>
      )}

      {/* No Results */}
      {!loading && searched && meals.length === 0 && (
        <p className="text-red-600 text-lg font-semibold">
          No meals found for "{area}"
        </p>
      )}
    </div>
  );
};

export default SearchByArea;


