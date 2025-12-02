import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  
  // 🔥 Show error toast function
  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 3000); // hide after 3 sec
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showError("Email & Password cannot be empty");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account Created Successfully!");
      navigate("/login"); 
    } catch (error) {
      console.log(error);
      alert(error.code);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-red-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-red-600">
          Create Your MealDB Account 🍽️
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-6">
          Join us & explore thousands of recipes!
        </p>

         {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
            {errorMsg}
          </div>
        )}


        <form onSubmit={handleSignup}>
          {/* Email Input */}
          <label className="block mb-2 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className={`border p-3 w-full rounded-lg focus:ring-2 outline-none mb-4 ${
              errorMsg && !email ? "border-red-500" : "focus:ring-red-300"
            }`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <label className="block mb-2 font-semibold text-gray-700">Password</label>
          <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            className={`border p-3 w-full rounded-lg focus:ring-2 outline-none mb-6 ${
              errorMsg && !password ? "border-red-500" : "focus:ring-red-300"
            }`}
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 cursor-pointer text-gray-600"
                      >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                      </span>
                      </div>

          {/* Signup Button */}
          <button className="bg-red-600 hover:bg-red-700 transition text-white py-3 w-full rounded-lg font-semibold text-lg">
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6">
          Already have an account?{" "}
         <Link to="/login" className="text-red-600 font-semibold hover:underline">
          Login
         </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
