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

// Keyframe animations still need a <style> tag since Tailwind doesn't cover custom keyframes
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    to { left: 200%; }
  }
  @keyframes slowZoom {
    from { transform: scale(1.05); }
    to   { transform: scale(1.0); }
  }

  .animate-fadeUp { animation: fadeUp 0.45s both; }
  .animate-fadeUp-05 { animation: fadeUp 0.45s 0.05s both; }
  .animate-fadeUp-10 { animation: fadeUp 0.45s 0.1s both; }
  .animate-fadeUp-15 { animation: fadeUp 0.45s 0.15s both; }
  .animate-fadeUp-20 { animation: fadeUp 0.45s 0.2s both; }
  .animate-fadeUp-27 { animation: fadeUp 0.45s 0.27s both; }
  .animate-fadeUp-30 { animation: fadeUp 0.45s 0.3s both; }
  .animate-fadeUp-36 { animation: fadeUp 0.45s 0.36s both; }
  .animate-fadeUp-40 { animation: fadeUp 0.45s 0.4s both; }
  .animate-fadeUp-43 { animation: fadeUp 0.45s 0.43s both; }
  .animate-fadeUp-50 { animation: fadeUp 0.45s 0.5s both; }
  .animate-fadeUp-short { animation: fadeUp 0.3s both; }

  .btn-shimmer {
    position: absolute; top: 0; left: -120%;
    width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    animation: shimmer 1.5s infinite;
  }

  .img-slide-active img {
    animation: slowZoom 8s ease-out forwards;
  }

  .font-syne { font-family: 'Syne', sans-serif; }
  .font-instrument { font-family: 'Instrument Serif', serif; }
`;

function ImagePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % PRODUCTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#111] hidden md:block">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {PRODUCTS.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === active ? "opacity-100 img-slide-active" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt=""
              key={`${i}-${active === i}`}
              className="w-full h-full object-cover block scale-105"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,45,107,0.55) 0%, rgba(20,10,30,0.6) 60%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 text-white">
        {/* Logo */}
        <div
          className="text-[1.6rem] font-extrabold tracking-tight font-syne"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
        >
          Vyn<span className="text-[#ffe566]">tra</span>
        </div>

        {/* Bottom content */}
        <div>
          <p
            className="font-instrument italic text-[2.2rem] leading-[1.25] mb-5 font-normal"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            "Fashion that moves
            <br />
            as fast as you do."
          </p>

          {/* Stats */}
          <div className="flex gap-7 mb-6">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-[1.4rem] font-extrabold text-[#ffe566] font-syne">
                  {s.value}
                </span>
                <span className="text-[10.5px] text-white/55 tracking-widest uppercase font-syne">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex gap-1.5">
            {PRODUCTS.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${
                  i === active ? "bg-[#ffe566] w-5" : "bg-white/30 w-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Login() {
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
    <>
      <style>{keyframes}</style>

      <div className="min-h-screen grid grid-cols-[520px_1fr] md:grid-cols-[520px_1fr] font-syne overflow-hidden bg-white">

        {/* ── LEFT — FORM PANEL ── */}
        <div
          className="bg-white flex flex-col justify-center px-[3.25rem] py-14 relative overflow-hidden min-h-screen z-[2]"
          style={{ boxShadow: "4px 0 40px rgba(0,0,0,0.06)" }}
        >
          {/* Decorative blobs */}
          <div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,45,107,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(255,229,100,0.09) 0%, transparent 70%)",
            }}
          />

          {/* Brand badge */}
          <div className="animate-fadeUp-05 inline-flex items-center gap-2 bg-[#fff0f4] border-[1.5px] border-[#ffd0de] rounded-full px-3.5 py-1 pl-1.5 w-fit mb-7">
            <div className="w-7 h-7 bg-[#ff2d6b] rounded-full flex items-center justify-center text-[11px] font-extrabold text-white tracking-tight">
              V
            </div>
            <span className="text-[12px] font-bold text-[#ff2d6b] tracking-widest uppercase">
              Vyntra
            </span>
          </div>

          {/* Title */}
          <h2 className="animate-fadeUp-10 text-[2.5rem] font-extrabold text-[#111] leading-[1.15] mb-2 font-syne">
            Welcome
            <br />
            back,{" "}
            <span className="text-[#ff2d6b] font-instrument italic font-normal">friend</span>
          </h2>

          <p className="animate-fadeUp-15 text-sm text-[#bbb] font-normal mb-9">
            Sign in to continue your shopping journey
          </p>

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="animate-fadeUp-20 mb-[1.15rem]">
              <label className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#c0c0c0] mb-1.5">
                Username
              </label>
              <input
                className="w-full px-4 py-3.5 bg-[#f8f8f8] border-[1.5px] border-[#efefef] rounded-xl font-syne text-[14.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#d0d0d0] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,45,107,0.08)]"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password */}
            <div className="animate-fadeUp-27 mb-[1.15rem]">
              <label className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#c0c0c0] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full pl-4 pr-[72px] py-3.5 bg-[#f8f8f8] border-[1.5px] border-[#efefef] rounded-xl font-syne text-[14.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#d0d0d0] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,45,107,0.08)]"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer font-syne text-[11px] font-bold text-[#ff2d6b] tracking-[0.04em] uppercase px-1.5 py-1 rounded-md transition-colors duration-150 hover:bg-[rgba(255,45,107,0.07)]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="animate-fadeUp-30 flex justify-end mt-1.5 mb-1">
              <a
                href="#"
                className="text-[12px] text-[#c8c8c8] font-medium no-underline transition-colors duration-200 hover:text-[#ff2d6b]"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="animate-fadeUp-36 w-full py-[15px] bg-[#ff2d6b] text-white border-none rounded-xl font-syne text-[15px] font-bold cursor-pointer tracking-[0.02em] mt-5 relative overflow-hidden transition-all duration-200 hover:enabled:bg-[#e01f59] hover:enabled:shadow-[0_8px_32px_rgba(255,45,107,0.38)] hover:enabled:-translate-y-0.5 active:enabled:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <span className="btn-shimmer" />}
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          {/* Message */}
          {msg && (
            <div
              className={`animate-fadeUp-short mt-4 px-4 py-2.5 rounded-[10px] text-[13px] font-medium text-center border-[1.5px] ${
                isSuccess
                  ? "bg-[#edfaf4] border-[#a3e6c0] text-[#1a7f4b]"
                  : "bg-[#fff0f4] border-[#ffc5d3] text-[#c01f45]"
              }`}
            >
              {msg}
            </div>
          )}

          {/* OR divider */}
          <div className="animate-fadeUp-40 flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#f0f0f0]" />
            <span className="text-[11px] text-[#d0d0d0] font-semibold tracking-[0.06em] uppercase">
              or continue with
            </span>
            <div className="flex-1 h-px bg-[#f0f0f0]" />
          </div>

          {/* Social buttons */}
          <div className="animate-fadeUp-43 grid grid-cols-2 gap-2.5">
            <button
              className="flex items-center justify-center gap-2 py-3 bg-[#f7f7f7] border-[1.5px] border-[#efefef] rounded-[11px] font-syne text-[13px] font-semibold text-[#444] cursor-pointer transition-all duration-150 hover:bg-[#f0f0f0] hover:border-[#e0e0e0] hover:-translate-y-px"
              type="button"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Footer */}
          <div className="animate-fadeUp-50 mt-6 text-center text-[13.5px] text-[#bbb]">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#ff2d6b] font-bold no-underline hover:underline">
              Sign up free
            </Link>
          </div>
        </div>

        {/* ── RIGHT — IMAGE PANEL ── */}
        <ImagePanel />
      </div>
    </>
  );
}

export default Login;