import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveTokens } from "../utils/auth";
import { useCart } from "../context/CartContext";

const PRODUCTS = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
  "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
];

const STATS = [
  { value: "2M+", label: "Shoppers" },
  { value: "50K+", label: "Products" },
  { value: "4.9★", label: "Rating" },
];

function ImagePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % PRODUCTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative hidden lg:block overflow-hidden bg-zinc-950">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {PRODUCTS.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Product preview"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-60 scale-100 transition-transform duration-[4000ms] ease-out" : "opacity-0 scale-105"
            }`}
          />
        ))}
      </div>

      {/* Dark gradient overlay for typography readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Panel Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
        <div className="text-xl font-bold tracking-tight font-sans">
          Vyntra<span className="text-amber-300">.</span>
        </div>

        <div>
          <blockquote className="text-3xl font-serif italic mb-8 max-w-sm">
            "Fashion that moves as fast as you do."
          </blockquote>

          {/* Stats */}
          <div className="flex gap-8 mb-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-xl font-bold text-amber-300 font-sans">{s.value}</div>
                <div className="text-xs text-zinc-400 tracking-wider uppercase font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Pagination Indicators */}
          <div className="flex gap-2">
            {PRODUCTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-amber-300 w-6" : "bg-white/20 w-1.5"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { refreshCartAuth } = useCart();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      if (!res.ok) {
        setMsg(data.detail || "Invalid username or password");
        setLoading(false);
        return;
      }
      saveTokens(data);
      refreshCartAuth();
      setMsg("Login successful!");
      window.location.href = "/";
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Login failed. Please try again.");
    }
    setLoading(false);
  };

  const isSuccess = msg.includes("successful");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-zinc-50 font-sans antialiased">
      
      {/* ── LEFT — FORM PANEL ── */}
      <div className="flex flex-col justify-center items-center px-6 py-12 md:px-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-rose-600 text-white font-bold rounded-xl mb-6">
              V
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Sign in to your account to continue shopping.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. johndoe"
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-500 focus:bg-white transition"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-zinc-400 hover:text-rose-600 transition">
                  Forgot password?
                </a>
              </div>
              
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-16 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-500 focus:bg-white transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-rose-600 hover:text-rose-700 uppercase tracking-wider px-2 py-1 rounded"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-600 text-white text-sm font-semibold rounded-xl tracking-wide hover:bg-rose-700 focus:outline-none transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Feedback Message */}
          {msg && (
            <div
              className={`p-3 rounded-xl text-sm font-medium text-center border ${
                isSuccess
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-rose-50 border-rose-100 text-rose-700"
              }`}
            >
              {msg}
            </div>
          )}

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200" />
            </div>
            <span className="relative bg-white px-4 text-xs font-semibold text-zinc-400 uppercase tracking-widest">
              or
            </span>
          </div>

          {/* Third-Party Logins */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Switch View */}
          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-rose-600 font-semibold hover:underline transition">
              Sign up free
            </Link>
          </p>
          
        </div>
      </div>

      {/* ── RIGHT — IMAGE PANEL ── */}
      <ImagePanel />
    </div>
  );
}