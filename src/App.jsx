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
import Dummy from './pages/UserDetails';
import Footer from './components/Footer';


const Layout = ({children}) => {
  return (
     <ProtectedRoute >
    <div className='flex flex-col min-h-screen justify-between'>
        {/* <div className='text-center text-gray-500 p-4'>Copyright &copy; 2024 MealDB. All rights reserved.</div> */}
      
      <header>
        <Headers />
      </header>
      <main className='container mx-auto px-3 pb-12'>
        
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
    </ProtectedRoute>
  )
}

const App = () => {
  return (
    <BrowserRouter >
    <FavoritesProvider>
     <Routes>
      {/* PUBLIC ROUTE */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path ="/user-details" element={
            <Layout>
            <Dummy/>
            </Layout>
            } />

          {/* PROTECTED ROUTES */}
       <Route
            path="/"
            element={
                <Layout>
                <Home />
                </Layout>
            }
          />
      <Route path={`/category/:category`} element={<Layout><CategoryMeals/></Layout>} />
      <Route path={`/meal/:id`} element= {<Layout><MealDetails/></Layout>} />
      <Route path={`/favorites`} element= {<Layout><Favorites/></Layout>} />
      <Route path={`/search`} element={<Layout><SearchResult/></Layout>} />
      <Route path={`/search-area`} element={<Layout><SearchByArea/></Layout>} />
      <Route path=  "*" element={<h1 className='text-center mt-20 text-5xl  text-red-700'>404 Page Not found</h1>} />
     </Routes>
     </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
