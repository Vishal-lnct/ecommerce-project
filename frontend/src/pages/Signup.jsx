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
  { icon: "✦", text: "Free delivery on first order" },
  { icon: "✦", text: "Exclusive member deals" },
  { icon: "✦", text: "Easy 30-day returns" },
];

// Keyframes + font import — can't be expressed with Tailwind utilities alone
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer { to { left: 200%; } }
  @keyframes slowZoom {
    from { transform: scale(1.05); }
    to   { transform: scale(1.0); }
  }

  .animate-fadeUp       { animation: fadeUp 0.45s both; }
  .animate-fadeUp-05    { animation: fadeUp 0.45s 0.05s both; }
  .animate-fadeUp-10    { animation: fadeUp 0.45s 0.1s both; }
  .animate-fadeUp-15    { animation: fadeUp 0.45s 0.15s both; }
  .animate-fadeUp-18    { animation: fadeUp 0.45s 0.18s both; }
  .animate-fadeUp-22    { animation: fadeUp 0.45s 0.22s both; }
  .animate-fadeUp-27    { animation: fadeUp 0.45s 0.27s both; }
  .animate-fadeUp-32    { animation: fadeUp 0.45s 0.32s both; }
  .animate-fadeUp-35    { animation: fadeUp 0.45s 0.35s both; }
  .animate-fadeUp-42    { animation: fadeUp 0.45s 0.42s both; }
  .animate-fadeUp-50    { animation: fadeUp 0.45s 0.5s both; }
  .animate-fadeUp-short { animation: fadeUp 0.3s both; }

  .btn-shimmer {
    position: absolute; top: 0; left: -120%;
    width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    animation: shimmer 1.5s infinite;
  }

  .img-slide-active img { animation: slowZoom 8s ease-out forwards; }

  .font-syne       { font-family: 'Syne', sans-serif; }
  .font-instrument { font-family: 'Instrument Serif', serif; }

  /* Pseudo-element blobs on form panel */
  .su-form-panel::before {
    content: '';
    position: absolute; top: -80px; right: -80px;
    width: 260px; height: 260px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,45,107,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .su-form-panel::after {
    content: '';
    position: absolute; bottom: -60px; left: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(255,229,100,0.09) 0%, transparent 70%);
    pointer-events: none;
  }
`;

// Shared input class
const inputCls = "w-full px-4 py-[13px] bg-[#f8f8f8] border-[1.5px] border-[#efefef] rounded-xl font-syne text-sm text-[#111] outline-none transition-all duration-200 placeholder-[#d0d0d0] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,45,107,0.08)]";

function ImagePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#111] hidden md:block">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === active ? "opacity-100 img-slide-active" : "opacity-0"}`}
          >
            <img src={s.img} alt={s.tag} key={`${i}-${active === i}`} className="w-full h-full object-cover block scale-105" />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,45,107,0.52) 0%, rgba(20,10,30,0.58) 60%, rgba(0,0,0,0.75) 100%)" }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-10 text-white">
        {/* Logo */}
        <div className="text-[1.6rem] font-extrabold tracking-tight font-syne" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
          Vyn<span className="text-[#ffe566]">tra</span>
        </div>

        {/* Bottom */}
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/[0.12] backdrop-blur-[10px] border border-white/[0.22] rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.09em] uppercase text-white/85 mb-[0.9rem] w-fit transition-all duration-[400ms]">
            {SLIDES[active].tag}
          </div>
          <p
            className="font-instrument italic font-normal text-[2.1rem] leading-[1.28] mb-6"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)", transition: "all 0.5s" }}
          >
            "{SLIDES[active].quote}"
          </p>
          <div className="flex gap-1.5">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === active ? "bg-[#ffe566] w-5 rounded-sm" : "bg-white/30 w-1.5"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;

  const [form, setForm]       = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg]         = useState("");
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
      setMsg("Signup failed");
    }
    setLoading(false);
  };

  const isSuccess = msg.toLowerCase().includes("success");

  return (
    <>
      <style>{keyframes}</style>

      <div className="min-h-screen grid grid-cols-[520px_1fr] font-syne overflow-hidden bg-white max-md:grid-cols-1">

        {/* ── LEFT — FORM PANEL ── */}
        <div
          className="su-form-panel bg-white flex flex-col justify-center px-[3.25rem] py-12 relative overflow-hidden min-h-screen z-[2]"
          style={{ boxShadow: "4px 0 40px rgba(0,0,0,0.06)" }}
        >
          {/* Brand badge */}
          <div className="animate-fadeUp-05 inline-flex items-center gap-2 bg-[#fff0f4] border-[1.5px] border-[#ffd0de] rounded-full py-[5px] pr-[14px] pl-[6px] w-fit mb-6">
            <div className="w-7 h-7 bg-[#ff2d6b] rounded-full flex items-center justify-center text-[11px] font-extrabold text-white">
              V
            </div>
            <span className="text-[12px] font-bold text-[#ff2d6b] tracking-[0.08em] uppercase">Vyntra</span>
          </div>

          {/* Title */}
          <h2 className="animate-fadeUp-10 text-[2.4rem] font-extrabold text-[#111] leading-[1.15] mb-2 font-syne">
            Create your<br />
            <span className="text-[#ff2d6b] font-instrument italic font-normal">free account</span>
          </h2>

          <p className="animate-fadeUp-15 text-sm text-[#bbb] font-normal mb-6">
            Join millions shopping smarter every day
          </p>

          {/* Perks */}
          <div className="animate-fadeUp-18 flex flex-col gap-1.5 mb-7">
            {PERKS.map((p) => (
              <div key={p.text} className="flex items-center gap-2 text-xs text-[#999] font-medium">
                <span className="text-[#ff2d6b] text-[8px] flex-shrink-0">{p.icon}</span>
                {p.text}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="animate-fadeUp-22 mb-4">
              <label className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#c0c0c0] mb-1.5">
                Username
              </label>
              <input className={inputCls} name="username" onChange={handleChange} value={form.username} placeholder="Choose a username" required />
            </div>

            {/* Email */}
            <div className="animate-fadeUp-27 mb-4">
              <label className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#c0c0c0] mb-1.5">
                Email
              </label>
              <input className={inputCls} name="email" type="email" onChange={handleChange} value={form.email} placeholder="Enter your email" />
            </div>

            {/* Password row */}
            <div className="grid grid-cols-2 gap-3 mb-0">
              <div className="animate-fadeUp-32 mb-4">
                <label className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#c0c0c0] mb-1.5">
                  Password
                </label>
                <input className={inputCls} name="password" type="password" onChange={handleChange} value={form.password} placeholder="Create" required />
              </div>
              <div className="animate-fadeUp-35 mb-4">
                <label className="block text-[10.5px] font-bold tracking-[0.09em] uppercase text-[#c0c0c0] mb-1.5">
                  Confirm
                </label>
                <input className={inputCls} name="password2" type="password" onChange={handleChange} value={form.password2} placeholder="Repeat" required />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="animate-fadeUp-42 w-full py-[15px] bg-[#ff2d6b] text-white border-none rounded-xl font-syne text-[15px] font-bold cursor-pointer tracking-[0.02em] mt-2 relative overflow-hidden transition-all duration-200 hover:enabled:bg-[#e01f59] hover:enabled:shadow-[0_8px_32px_rgba(255,45,107,0.38)] hover:enabled:-translate-y-0.5 active:enabled:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <span className="btn-shimmer" />}
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          {/* Message */}
          {msg && (
            <div className={`animate-fadeUp-short mt-[0.9rem] px-4 py-[11px] rounded-[10px] text-[13px] font-medium text-center border-[1.5px] ${
              isSuccess ? "bg-[#edfaf4] border-[#a3e6c0] text-[#1a7f4b]" : "bg-[#fff0f4] border-[#ffc5d3] text-[#c01f45]"
            }`}>
              {msg}
            </div>
          )}

          {/* Footer */}
          <div className="animate-fadeUp-50 mt-[1.4rem] text-center text-[13.5px] text-[#bbb]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ff2d6b] font-bold no-underline hover:underline">
              Sign in
            </Link>
          </div>
        </div>

        {/* ── RIGHT — IMAGE PANEL ── */}
        <ImagePanel />
      </div>
    </>
  );
}

export default Signup;