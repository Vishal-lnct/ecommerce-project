import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    quote: "Style is a way to say who you are without speaking.",
    tag: "ACCESSORIES",
  },
  {
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    quote: "Every step you take is a statement.",
    tag: "SHOES",
  },
  {
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    quote: "Wear what makes you feel unstoppable.",
    tag: "CLOTHING",
  },
  {
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    quote: "Carry your world in style.",
    tag: "ACCESSORIES",
  },
  {
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    quote: "Tech that keeps up with your life.",
    tag: "ELECTRONICS",
  },
  {
    img: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
    quote: "Beauty in every detail.",
    tag: "BEAUTY",
  },
];

const PERKS = [
  { icon: "✦", text: "Free delivery on first order" },
  { icon: "✦", text: "Exclusive member deals" },
  { icon: "✦", text: "Easy 30-day returns" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .su-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 520px 1fr;
    font-family: 'Syne', sans-serif;
    overflow: hidden;
    background: #fff;
  }

  /* ── LEFT — FORM PANEL ── */
  .su-form-panel {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 3.25rem;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    z-index: 2;
    box-shadow: 4px 0 40px rgba(0,0,0,0.06);
  }

  .su-form-panel::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,45,107,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .su-form-panel::after {
    content: '';
    position: absolute;
    bottom: -60px; left: -60px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,229,100,0.09) 0%, transparent 70%);
    pointer-events: none;
  }

  .brand-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #fff0f4;
    border: 1.5px solid #ffd0de;
    border-radius: 100px;
    padding: 5px 14px 5px 6px;
    width: fit-content;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.45s 0.05s both;
  }
  .brand-icon {
    width: 28px; height: 28px;
    background: #ff2d6b;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: #fff;
  }
  .brand-name {
    font-size: 12px; font-weight: 700;
    color: #ff2d6b; letter-spacing: 0.08em; text-transform: uppercase;
  }

  .su-title {
    font-size: 2.4rem;
    font-weight: 800;
    color: #111;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    animation: fadeUp 0.45s 0.1s both;
  }
  .su-title span {
    color: #ff2d6b;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
  }

  .su-sub {
    font-size: 14px; color: #bbb; font-weight: 400;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.45s 0.15s both;
  }

  /* perks */
  .perks-row {
    display: flex; flex-direction: column; gap: 6px;
    margin-bottom: 1.75rem;
    animation: fadeUp 0.45s 0.18s both;
  }
  .perk-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: #999; font-weight: 500;
  }
  .perk-icon {
    color: #ff2d6b; font-size: 8px; flex-shrink: 0;
  }

  /* fields */
  .f-group { margin-bottom: 1rem; animation: fadeUp 0.45s both; }

  .f-label {
    display: block;
    font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: #c0c0c0; margin-bottom: 7px;
  }

  .f-input {
    width: 100%;
    padding: 13px 16px;
    background: #f8f8f8;
    border: 1.5px solid #efefef;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 14px; color: #111;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .f-input::placeholder { color: #d0d0d0; }
  .f-input:focus {
    border-color: #ff2d6b;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255,45,107,0.08);
  }

  .pw-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

  .su-btn {
    width: 100%; padding: 15px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.02em;
    margin-top: 0.5rem;
    position: relative; overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    animation: fadeUp 0.45s 0.42s both;
  }
  .su-btn:not(:disabled):hover {
    background: #e01f59;
    box-shadow: 0 8px 32px rgba(255,45,107,0.38);
    transform: translateY(-2px);
  }
  .su-btn:not(:disabled):active { transform: scale(0.98); }
  .su-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-shimmer {
    position: absolute; top: 0; left: -120%;
    width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer { to { left: 200%; } }

  .su-msg {
    margin-top: 0.9rem; padding: 11px 16px;
    border-radius: 10px; font-size: 13px; font-weight: 500;
    text-align: center; animation: fadeUp 0.3s both;
  }
  .su-msg.ok  { background: #edfaf4; border: 1.5px solid #a3e6c0; color: #1a7f4b; }
  .su-msg.err { background: #fff0f4; border: 1.5px solid #ffc5d3; color: #c01f45; }

  .su-footer-row {
    margin-top: 1.4rem; text-align: center;
    font-size: 13.5px; color: #bbb;
    animation: fadeUp 0.45s 0.5s both;
  }
  .su-footer-row a { color: #ff2d6b; font-weight: 700; text-decoration: none; }
  .su-footer-row a:hover { text-decoration: underline; }

  /* ── RIGHT — IMAGE SLIDESHOW ── */
  .su-img-panel {
    position: relative;
    overflow: hidden;
    background: #111;
  }

  .img-slideshow { position: absolute; inset: 0; }

  .img-slide {
    position: absolute; inset: 0;
    opacity: 0;
    transition: opacity 1s ease;
  }
  .img-slide.active { opacity: 1; }

  .img-slide img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transform: scale(1.05);
    animation: slowZoom 8s ease-out forwards;
  }
  @keyframes slowZoom {
    from { transform: scale(1.05); }
    to   { transform: scale(1.0); }
  }

  .img-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg,
      rgba(255,45,107,0.52) 0%,
      rgba(20,10,30,0.58) 60%,
      rgba(0,0,0,0.75) 100%
    );
    z-index: 1; pointer-events: none;
  }

  .img-content {
    position: absolute; inset: 0;
    z-index: 2;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 2.5rem;
    color: #fff;
  }

  .img-logo {
    font-size: 1.6rem; font-weight: 800;
    letter-spacing: -0.02em; color: #fff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }
  .img-logo span { color: #ffe566; }

  .img-cat-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.12);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: rgba(255,255,255,0.85);
    margin-bottom: 0.9rem;
    width: fit-content;
    transition: all 0.4s;
  }

  .img-bottom {}

  .img-quote {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 2.1rem;
    font-weight: 400;
    line-height: 1.28;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
    transition: all 0.5s;
  }

  .img-dots { display: flex; gap: 6px; }
  .img-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transition: background 0.3s, width 0.3s;
    cursor: pointer;
  }
  .img-dot.on { background: #ffe566; width: 20px; border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 860px) {
    .su-root { grid-template-columns: 1fr; }
    .su-img-panel { display: none; }
    .su-form-panel { padding: 2.5rem 1.75rem; }
  }
`;

function ImagePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="su-img-panel">
      <div className="img-slideshow">
        {SLIDES.map((s, i) => (
          <div key={i} className={`img-slide${i === active ? " active" : ""}`}>
            <img src={s.img} alt={s.tag} key={`${i}-${active === i}`} />
          </div>
        ))}
      </div>
      <div className="img-overlay" />
      <div className="img-content">
        <div className="img-logo">Vyn<span>tra</span></div>
        <div className="img-bottom">
          <div className="img-cat-badge">{SLIDES[active].tag}</div>
          <p className="img-quote">"{SLIDES[active].quote}"</p>
          <div className="img-dots">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`img-dot${i === active ? " on" : ""}`}
                onClick={() => setActive(i)}
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
      setMsg("Signup failed");
    }
    setLoading(false);
  };

  const isSuccess = msg.toLowerCase().includes("success");

  return (
    <>
      <style>{styles}</style>
      <div className="su-root">

        {/* FORM — LEFT, DOMINANT */}
        <div className="su-form-panel">
          <div className="brand-badge">
            <div className="brand-icon">V</div>
            <span className="brand-name">Vyntra</span>
          </div>

          <h2 className="su-title">
            Create your<br /><span>free account</span>
          </h2>
          <p className="su-sub">Join millions shopping smarter every day</p>

          <div className="perks-row">
            {PERKS.map(p => (
              <div key={p.text} className="perk-item">
                <span className="perk-icon">{p.icon}</span>
                {p.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="f-group" style={{ animationDelay: "0.22s" }}>
              <label className="f-label">Username</label>
              <input className="f-input" name="username" onChange={handleChange} value={form.username} placeholder="Choose a username" required />
            </div>

            <div className="f-group" style={{ animationDelay: "0.27s" }}>
              <label className="f-label">Email</label>
              <input className="f-input" name="email" type="email" onChange={handleChange} value={form.email} placeholder="Enter your email" />
            </div>

            <div className="pw-row">
              <div className="f-group" style={{ animationDelay: "0.32s" }}>
                <label className="f-label">Password</label>
                <input className="f-input" name="password" type="password" onChange={handleChange} value={form.password} placeholder="Create" required />
              </div>
              <div className="f-group" style={{ animationDelay: "0.35s" }}>
                <label className="f-label">Confirm</label>
                <input className="f-input" name="password2" type="password" onChange={handleChange} value={form.password2} placeholder="Repeat" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="su-btn">
              {loading && <span className="btn-shimmer" />}
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          {msg && <div className={`su-msg ${isSuccess ? "ok" : "err"}`}>{msg}</div>}

          <div className="su-footer-row">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>

        {/* IMAGE — RIGHT, SUPPORTING */}
        <ImagePanel />

      </div>
    </>
  );
}

export default Signup;