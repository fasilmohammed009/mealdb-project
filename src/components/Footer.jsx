import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Phone, ArrowUp } from "lucide-react";

const Footer = () => {

  // Scroll to Top Btn
  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-emerald-950 text-white mt-28 relative overflow-hidden">

      {/* Floating Meals Background 3D */}
      <div className="absolute inset-0 opacity-[0.08] animate-[float_8s_linear_infinite] pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg')",
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
          filter: "blur(1px)"
        }}
      ></div>

      <style>
        {`
          @keyframes float {
            0% {transform: translateY(0px);}
            50% {transform: translateY(-20px);}
            100% {transform: translateY(0px);}
          }
        `}
      </style>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">

        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-4xl font-extrabold tracking-wide drop-shadow-md">
            <span className="text-emerald-300 animate-pulse">Meal</span> DB
          </h2>
          <p className="text-sm opacity-90">
            Explore your favorite meals worldwide 🍽️
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-emerald-300">Quick Links</h3>
          <ul className="space-y-3">
           {[
  { name: "Home", link: "/" },
  { name: "Favorites", link: "/favorites" },
  { name: "Search by Area", link: "/search-area" },
].map((item, idx) => (
  <li key={idx}>
    <Link
      to={item.link}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} // 👈 FIX
      className="group inline-block text-sm"
    >
      <span className="relative group-hover:text-emerald-300 transition font-medium">
        {item.name}
        <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-emerald-400 rounded-full"></span>
      </span>
    </Link>
  </li>
))}
       </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-5 text-emerald-300">Contact</h3>
          <p className="text-sm opacity-90 flex items-center gap-2"><Phone size={16}/> +91 00000 00000</p>
          <p className="text-sm opacity-90 mt-2">mealdb@gmail.com</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            {[Facebook, Instagram].map((Icon, idx) => (
              <div
                key={idx}
                className="p-3 bg-emerald-800 rounded-xl hover:bg-gradient-to-r hover:from-emerald-400 hover:to-green-600 transition transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-emerald-800/40 py-4 text-center text-sm opacity-80 backdrop-blur-md relative z-10">
        © {new Date().getFullYear()} <span className="text-emerald-300">Meal DB</span> — All Rights Reserved
      </div>

      {/* Developed By */}
      <div className="py-3 text-center text-xs text-emerald-300 font-semibold tracking-wide">
        Developed by <span className="text-white drop-shadow-md">Fasil</span> 💚
      </div>

    </footer>
  );
};

export default Footer;
