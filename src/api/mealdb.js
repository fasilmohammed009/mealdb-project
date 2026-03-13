import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL_BACKEND;

export const fetchCategories = () => axios.get(`${BASE_URL}/categories.php`);
export const fetchMealsByCategory = (cat) => axios.get(`${BASE_URL}/filter.php?c=${cat}`);
export const fetchMealById = (id) => axios.get (`${BASE_URL}/lookup.php?i=${id}`);
export const searchMeals = (query) => axios.get(`${BASE_URL}/search.php?s=${query}`);
export const fetchByArea = (area) => axios.get(`${BASE_URL}/filter.php?a=${area}`);

