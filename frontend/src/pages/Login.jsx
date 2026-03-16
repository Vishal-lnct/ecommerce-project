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

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .lg-root {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 520px 1fr;
    font-family: 'Syne', sans-serif;
    overflow: hidden;
    background: #fff;
  }

  /* ── LEFT — FORM PANEL ── */
  .lg-form-panel {
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3.5rem 3.25rem;
    position: relative;
    overflow: hidden;
    min-height: 100vh;
    z-index: 2;
    box-shadow: 4px 0 40px rgba(0,0,0,0.06);
  }

  .lg-form-panel::before {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 260px; height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,45,107,0.06) 0%, transparent 70%);
    pointer-events: none;
  }
  .lg-form-panel::after {
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
    margin-bottom: 1.75rem;
    animation: fadeUp 0.45s 0.05s both;
  }
  .brand-icon {
    width: 28px; height: 28px;
    background: #ff2d6b;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 800; color: #fff; letter-spacing: -0.02em;
  }
  .brand-name {
    font-size: 12px; font-weight: 700;
    color: #ff2d6b; letter-spacing: 0.08em; text-transform: uppercase;
  }

  .lg-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #111;
    line-height: 1.15;
    margin-bottom: 0.5rem;
    animation: fadeUp 0.45s 0.1s both;
  }
  .lg-title span {
    color: #ff2d6b;
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-weight: 400;
  }

  .lg-sub {
    font-size: 14px; color: #bbb; font-weight: 400;
    margin-bottom: 2.25rem;
    animation: fadeUp 0.45s 0.15s both;
  }

  .f-group { margin-bottom: 1.15rem; animation: fadeUp 0.45s both; }

  .f-label {
    display: block;
    font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: #c0c0c0; margin-bottom: 7px;
  }

  .f-input-wrap { position: relative; }

  .f-input {
    width: 100%;
    padding: 14px 16px;
    background: #f8f8f8;
    border: 1.5px solid #efefef;
    border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 14.5px; color: #111;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .f-input::placeholder { color: #d0d0d0; }
  .f-input:focus {
    border-color: #ff2d6b;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(255,45,107,0.08);
  }
  .f-input.pad-r { padding-right: 72px; }

  .pw-toggle {
    position: absolute; right: 13px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700; color: #ff2d6b;
    letter-spacing: 0.04em; text-transform: uppercase;
    padding: 4px 7px; border-radius: 6px;
    transition: background 0.15s;
  }
  .pw-toggle:hover { background: rgba(255,45,107,0.07); }

  .forgot-row {
    display: flex; justify-content: flex-end;
    margin-top: 6px; margin-bottom: 0.2rem;
    animation: fadeUp 0.45s 0.3s both;
  }
  .forgot-link {
    font-size: 12px; color: #c8c8c8; font-weight: 500;
    text-decoration: none; transition: color 0.2s;
  }
  .forgot-link:hover { color: #ff2d6b; }

  .lg-btn {
    width: 100%; padding: 15px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.02em;
    margin-top: 1.25rem;
    position: relative; overflow: hidden;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    animation: fadeUp 0.45s 0.36s both;
  }
  .lg-btn:not(:disabled):hover {
    background: #e01f59;
    box-shadow: 0 8px 32px rgba(255,45,107,0.38);
    transform: translateY(-2px);
  }
  .lg-btn:not(:disabled):active { transform: scale(0.98); }
  .lg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-shimmer {
    position: absolute; top: 0; left: -120%;
    width: 55%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer { to { left: 200%; } }

  /* Social */
  .or-row {
    display: flex; align-items: center; gap: 12px;
    margin: 1.5rem 0 1.2rem;
    animation: fadeUp 0.45s 0.4s both;
  }
  .or-line { flex: 1; height: 1px; background: #f0f0f0; }
  .or-text { font-size: 11px; color: #d0d0d0; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }

  .social-row {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
    animation: fadeUp 0.45s 0.43s both;
  }
  .social-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px; background: #f7f7f7;
    border: 1.5px solid #efefef; border-radius: 11px;
    font-family: 'Syne', sans-serif;
    font-size: 13px; font-weight: 600; color: #444;
    cursor: pointer; transition: background 0.15s, border-color 0.15s, transform 0.15s;
  }
  .social-btn:hover { background: #f0f0f0; border-color: #e0e0e0; transform: translateY(-1px); }
  .s-icon { width: 16px; height: 16px; flex-shrink: 0; }

  .lg-msg {
    margin-top: 1rem; padding: 11px 16px;
    border-radius: 10px; font-size: 13px; font-weight: 500;
    text-align: center; animation: fadeUp 0.3s both;
  }
  .lg-msg.ok  { background: #edfaf4; border: 1.5px solid #a3e6c0; color: #1a7f4b; }
  .lg-msg.err { background: #fff0f4; border: 1.5px solid #ffc5d3; color: #c01f45; }

  .lg-footer-row {
    margin-top: 1.5rem; text-align: center;
    font-size: 13.5px; color: #bbb;
    animation: fadeUp 0.45s 0.5s both;
  }
  .lg-footer-row a { color: #ff2d6b; font-weight: 700; text-decoration: none; }
  .lg-footer-row a:hover { text-decoration: underline; }

  /* ── RIGHT — IMAGE PANEL ── */
  .lg-img-panel {
    position: relative;
    overflow: hidden;
    background: #111;
  }

  .img-slideshow {
    position: absolute; inset: 0;
  }

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
      rgba(255,45,107,0.55) 0%,
      rgba(20,10,30,0.6) 60%,
      rgba(0,0,0,0.75) 100%
    );
    z-index: 1;
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
    letter-spacing: -0.02em;
    color: #fff;
    text-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }
  .img-logo span { color: #ffe566; }

  .img-bottom {}

  .img-quote {
    font-family: 'Instrument Serif', serif;
    font-style: italic;
    font-size: 2.2rem;
    font-weight: 400;
    line-height: 1.25;
    margin-bottom: 1.2rem;
    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  }

  .img-stats {
    display: flex; gap: 1.75rem; margin-bottom: 1.5rem;
  }
  .img-stat { display: flex; flex-direction: column; gap: 2px; }
  .img-stat-val { font-size: 1.4rem; font-weight: 800; color: #ffe566; }
  .img-stat-lbl { font-size: 10.5px; color: rgba(255,255,255,0.55); letter-spacing: 0.05em; text-transform: uppercase; }

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
    .lg-root { grid-template-columns: 1fr; }
    .lg-img-panel { display: none; }
    .lg-form-panel { padding: 2.5rem 1.75rem; }
  }
`;

function ImagePanel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(p => (p + 1) % PRODUCTS.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="lg-img-panel">
      <div className="img-slideshow">
        {PRODUCTS.map((src, i) => (
          <div key={i} className={`img-slide${i === active ? " active" : ""}`}>
            <img src={src} alt="" key={`${i}-${active === i}`} />
          </div>
        ))}
      </div>
      <div className="img-overlay" />
      <div className="img-content">
        <div className="img-logo">Vyn<span>tra</span></div>
        <div className="img-bottom">
          <p className="img-quote">"Fashion that moves<br />as fast as you do."</p>
          <div className="img-stats">
            {STATS.map(s => (
              <div key={s.label} className="img-stat">
                <span className="img-stat-val">{s.value}</span>
                <span className="img-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="img-dots">
            {PRODUCTS.map((_, i) => (
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
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setMsg("Login failed. Please try again.");
    }
    setLoading(false);
  };

  const isSuccess = msg.includes("successful");

  return (
    <>
      <style>{styles}</style>
      <div className="lg-root">

        {/* FORM — LEFT, DOMINANT */}
        <div className="lg-form-panel">
          <div className="brand-badge">
            <div className="brand-icon">V</div>
            <span className="brand-name">Vyntra</span>
          </div>

          <h2 className="lg-title">
            Welcome<br />back, <span>friend</span>
          </h2>
          <p className="lg-sub">Sign in to continue your shopping journey</p>

          <form onSubmit={handleSubmit}>
            <div className="f-group" style={{ animationDelay: "0.2s" }}>
              <label className="f-label">Username</label>
              <input
                className="f-input"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="f-group" style={{ animationDelay: "0.27s" }}>
              <label className="f-label">Password</label>
              <div className="f-input-wrap">
                <input
                  className="f-input pad-r"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPassword(p => !p)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading} className="lg-btn">
              {loading && <span className="btn-shimmer" />}
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          {msg && <div className={`lg-msg ${isSuccess ? "ok" : "err"}`}>{msg}</div>}

          <div className="or-row">
            <div className="or-line" />
            <span className="or-text">or continue with</span>
            <div className="or-line" />
          </div>

          <div className="social-row">
            <button className="social-btn" type="button">
              <svg className="s-icon" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="social-btn" type="button">
              <svg className="s-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              {/* GitHub */}
            </button>
          </div>

          <div className="lg-footer-row">
            Don't have an account? <Link to="/signup">Sign up free</Link>
          </div>
        </div>

        {/* IMAGE — RIGHT, SUPPORTING */}
        <ImagePanel />

      </div>
    </>
  );
}

export default Login;