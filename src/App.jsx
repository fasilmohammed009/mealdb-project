import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import './App.css'  
import Headers from './components/Header';
import Home from './pages/Home';
import CategoryMeals from './pages/CategoryMeals';
import MealDetails from './pages/MealDetails';
import Favorites from './pages/Favorites';
import SearchResult from './pages/SearchResult';
import { FavoritesProvider } from './contexts/FavoritesContext';
import SearchByArea from './pages/SearchByArea';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dummy from './pages/dummy';
const App = () => {
  return (
    <BrowserRouter >
    <FavoritesProvider>
     <Headers />
     <Routes>
      {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path ="dummy" element={<Dummy/>}></Route>

          {/* PROTECTED ROUTES */}
       <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
      <Route path={`/categoryy/:category`} element={<ProtectedRoute><CategoryMeals/></ProtectedRoute>} />
      <Route path={`/meal/:id`} element= {<ProtectedRoute><MealDetails/></ProtectedRoute>} />
      <Route path={`/favorites`} element= {<ProtectedRoute><Favorites/></ProtectedRoute>} />
      <Route path={`/search`} element={<ProtectedRoute><SearchResult/></ProtectedRoute>} />
      <Route path={`/search-area`} element={<ProtectedRoute><SearchByArea/></ProtectedRoute>} />
      <Route path=  "*" element={<h1 className='text-center mt-20 text-5xl  text-red-700'>404 Page Not found</h1>} />
     </Routes>
     </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
