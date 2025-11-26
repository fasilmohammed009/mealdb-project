import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // simple frontend validation
    if (email === "test@gmail.com" && password === "12345") {
      localStorage.setItem("auth", "true");
      navigate("/");     // redirect to home
    } else {
      alert("Invalid email / password");
    }
  };

  return (
    <div className="flex justify-center mt-20">
      <form
        onSubmit={handleLogin}
        className="border p-6 rounded shadow w-96 bg-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          className="border p-2 w-full mb-3"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-emerald-700 text-white py-2 w-full rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
