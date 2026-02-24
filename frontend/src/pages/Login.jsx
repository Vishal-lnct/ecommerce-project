import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE}/api/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        saveTokens(data);
        setMsg("Login successful! Redirecting...");
        setTimeout(() => nav("/"), 1000);
      } else {
        setMsg(data.detail || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setMsg("Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Login to continue shopping at <span className="font-semibold">Vyntra</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} autoComplete="off"className="space-y-5">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter your username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-gray-800 transition duration-300 active:scale-95 disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Message */}
        {msg && (
          <p className={`mt-4 text-center text-sm ${
            msg.includes("successful") ? "text-green-600" : "text-red-500"
          }`}>
            {msg}
          </p>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;