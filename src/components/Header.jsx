import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const Header = () => {

  const [query,setQuery] = useState ("")
  const navigate = useNavigate ();


  const handleSearch = async (e) => {
    e.preventDefault ();
    if(!query.trim()) return ;
    navigate (`/search?q=${encodeURIComponent(query)}`);
  }

  const handleout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  }
    return (
    <header className="bg-emerald-900 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-6 ">
            <Link to="/" className="text-xl font-bold">Meal DB</Link>
            <Link to="/">Categories</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/search-area">Serach By Area</Link>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="bg-white px-3 py-1 rounded outline-none text-gray-800 w-48 sm:w-64" placeholder="Search Meals" />
            <button type="submit" className="bg-white text-emerald-900 px-3 py-1 rounded hover:bg-gray-100 ">Search</button>
        </form>

        <button onClick={handleout} 
        className="bg-red-600 px-3 py-1 rounded hover:bg-red-800">Logout
        </button>
      </nav>
    </header>
  )
}

export default Header
