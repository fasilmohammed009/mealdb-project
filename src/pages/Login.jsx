import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState(""); // toast message state
  const navigate = useNavigate();

  // 🔥 Show error toast function
  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(""), 3000); // hide after 3 sec
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showError("Email & Password cannot be empty");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in user:", user);

      // 🔥 Get Firebase token (JWT)
      const token = await user.getIdToken();

      // Save token to localStorage (advanced)
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", user.email);

      // Trigger header update
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (error) {
      console.log(error);
      showError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google logged in user:", user);

      const token = await user.getIdToken();

      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", user.email);

      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.log(error);
      showError("Google Login Failed");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showError("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      showError("Password reset email sent!");
    } catch (err) {
      console.log(err);
      showError("Email not found!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-red-100 px-4">
      <div className="w-full max-w-md bg-white p-4 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-red-600">
          Welcome to MealDB 🍽️
        </h1>
        <p className="text-center text-gray-600 mt-1 mb-6">
          Login to explore delicious meals!
        </p>

        {/*  Error Toast */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleEmailLogin}>
          <label className="block mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            className={`border p-3 w-full rounded-lg focus:ring-2 outline-none mb-4 ${
              errorMsg && !email ? "border-red-500" : "focus:ring-red-300"
            }`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 font-semibold text-gray-700">
            Password
          </label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              className={`border p-3 w-full rounded-lg focus:ring-2 outline-none mb-6 ${
                errorMsg && !password ? "border-red-500" : "focus:ring-red-300"
              }`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Eye Icon */}
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>
          <p
            onClick={() => handleForgotPassword()}
            className="text-sm text-center text-blue-600 font-semibold hover:underline cursor-pointer mb-4"
          >
            Forgot Password?
          </p>

          <button className="bg-red-600 hover:bg-red-700 transition text-white py-3 w-full rounded-lg font-semibold text-lg">
            Login
          </button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500 font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 bg-white border border-gray-300 py-3 w-full rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            className="w-6 h-6"
            alt="google"
          />
          <span className="font-semibold">Continue with Google</span>
        </button>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-red-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
