import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SLIDES = [
  { img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80", quote: "Style is a way to say who you are without speaking.", tag: "ACCESSORIES" },
  { img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80", quote: "Every step you take is a statement.", tag: "SHOES" },
  { img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80", quote: "Wear what makes you feel unstoppable.", tag: "CLOTHING" },
  { img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80", quote: "Carry your world in style.", tag: "ACCESSORIES" },
  { img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", quote: "Tech that keeps up with your life.", tag: "ELECTRONICS" },
  { img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80", quote: "Beauty in every detail.", tag: "BEAUTY" },
];

const PERKS = [
  { text: "Free delivery on first order" },
  { text: "Exclusive member deals" },
  { text: "Easy 30-day returns" },
];

function ImagePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative hidden lg:block overflow-hidden bg-zinc-950">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <img
            key={s.img}
            src={s.img}
            alt={s.tag}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === active ? "opacity-60 scale-100 transition-transform duration-[4000ms] ease-out" : "opacity-0 scale-105"
            }`}
          />
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
        <div className="text-xl font-bold tracking-tight font-sans">
          Vyntra<span className="text-amber-300">.</span>
        </div>

        <div>
          <span className="inline-flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 text-xs font-semibold tracking-wider text-amber-300 mb-4">
            {SLIDES[active].tag}
          </span>
          <blockquote className="text-3xl font-serif italic mb-8 max-w-md transition-all duration-500">
            "{SLIDES[active].quote}"
          </blockquote>
          
          {/* Pagination Indicators */}
          <div className="flex gap-2">
            {SLIDES.map((_, i) => (
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

export default function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Account created successfully! Redirecting...");
        setTimeout(() => nav("/login"), 1200);
      } else {
        setMsg(data.username || data.password || data.email || JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      setMsg("Signup failed. Please try again.");
    }
    setLoading(false);
  };

  const isSuccess = msg.toLowerCase().includes("success");

  // Shared responsive input class matching the clean login layout
  const inputCls = "w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-rose-500 focus:bg-white transition";

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-zinc-50 font-sans antialiased">
      
      {/* ── LEFT — FORM PANEL ── */}
      <div className="flex flex-col justify-center items-center px-6 py-12 md:px-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          
          {/* Header */}
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 bg-rose-600 text-white font-bold rounded-xl mb-6">
              V
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Create an account
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Join us today and get access to exclusive perks.
            </p>
          </div>

          {/* Value Props / Perks */}
          <div className="grid grid-cols-1 gap-2 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
            {PERKS.map((p) => (
              <div key={p.text} className="flex items-center gap-2.5 text-xs text-zinc-600 font-medium">
                <svg className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {p.text}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Username
              </label>
              <input 
                className={inputCls} 
                name="username" 
                type="text"
                onChange={handleChange} 
                value={form.username} 
                placeholder="Choose a username" 
                required 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input 
                className={inputCls} 
                name="email" 
                type="email" 
                onChange={handleChange} 
                value={form.email} 
                placeholder="you@example.com" 
                required
              />
            </div>

            {/* Split row for structural breathing room without cramping mobile layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <input 
                  className={inputCls} 
                  name="password" 
                  type="password" 
                  onChange={handleChange} 
                  value={form.password} 
                  placeholder="Create password" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
                  Confirm Password
                </label>
                <input 
                  className={inputCls} 
                  name="password2" 
                  type="password" 
                  onChange={handleChange} 
                  value={form.password2} 
                  placeholder="Repeat password" 
                  required 
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-rose-600 text-white text-sm font-semibold rounded-xl tracking-wide hover:bg-rose-700 focus:outline-none transition active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none pt-4"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Feedback Message */}
          {msg && (
            <div className={`p-3 rounded-xl text-sm font-medium text-center border ${
              isSuccess ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-100 text-rose-700"
            }`}>
              {msg}
            </div>
          )}

          {/* Switch View */}
          <p className="text-center text-sm text-zinc-500 pt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-rose-600 font-semibold hover:underline transition">
              Sign in
            </Link>
          </p>
          
        </div>
      </div>

      {/* ── RIGHT — IMAGE PANEL ── */}
      <ImagePanel />
    </div>
  );
}