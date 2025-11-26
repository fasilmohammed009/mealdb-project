import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import './App.css'  
import Headers from './components/Header';
import Home from './pages/Home';
import CategoryMeals from './pages/CategoryMeals';
import MealDetail from './pages/MealDetails';
import MealDetails from './pages/MealDetails';
import Favorites from './pages/Favorites';
import SearchResult from './pages/SearchResult';
import { FavoritesProvider } from './contexts/FavoritesContext';
import SearchByArea from './pages/SearchByArea';
const App = () => {
  return (
    <BrowserRouter >
    <FavoritesProvider>
     <Headers />
     <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path={`/categoryy/:category`} element={<CategoryMeals/>} />
      <Route path={`/meal/:id`} element= {<MealDetails/>} />
      <Route path={`/favorites`} element= {<Favorites/>} />
      <Route path={`/search`} element={<SearchResult/>} />
      <Route path={`/search-area`} element={<SearchByArea/>} />
      <Route path=  "*" element={<h1 className='text-center mt-20 text-5xl  text-red-700'>404 Page Not found</h1>} />
     </Routes>
     </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
