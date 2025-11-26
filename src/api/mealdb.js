import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchCategories = () => axios.get(`${BASE_URL}/categories.php`);
export const fetchMealsByCategory = (cat) => axios.get(`${BASE_URL}/filter.php?c=${cat}`);
export const fetchMealById = (id) => axios.get (`${BASE_URL}/lookup.php?i=${id}`);
export const searchMeals = (query) => axios.get(`${BASE_URL}/search.php?s=${query}`);
export const fetchByArea = (area) => axios.get(`${BASE_URL}/filter.php?a=${area}`);

