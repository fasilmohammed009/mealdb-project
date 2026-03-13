import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const [isAuth, setIsAuth] = useState(() => !!localStorage.getItem("authToken"));
  const navigate = useNavigate();

  // 🔥 Listen for login/logout changes (custom event)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuth(!!localStorage.getItem("authToken")); // ✅ correct token check
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");

    // 🔥 Trigger header update
    window.dispatchEvent(new Event("storage"));

    setIsAuth(false);
    navigate("/login");
  };

  return (
    <header className="bg-emerald-900 text-white p-4 shadow">
      <nav className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">Faya Cafe</Link>
          <Link to="/">Categories</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/search-area">Search By Area</Link>
          <Link to="/user-details">User Details</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white px-3 py-1 rounded outline-none text-gray-800 w-48 sm:w-64"
            placeholder="Search Meals"
          />
          <button className="bg-white text-emerald-900 px-3 py-1 rounded hover:bg-gray-100">
            Search
          </button>
        </form>

        {/* Auth Buttons */}
        {isAuth ? (
          <button
            onClick={handleLogout}
            style={{
              background: "red",
              color: "white",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "green",
              color: "white",
              padding: "8px 15px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
