import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .co-root {
    min-height: 100vh;
    background: #f5f5f5;
    font-family: 'Inter', sans-serif;
    padding-bottom: 5rem;
  }

  /* ── HERO ── */
  .co-hero {
    background: #111;
    padding: 3rem 4rem 2.5rem;
    position: relative;
  }
  .co-hero::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px,
      transparent 1px, transparent 44px
    );
    pointer-events: none;
  }
  .co-hero-inner { position: relative; z-index: 1; }

  .co-hero-tag {
    display: inline-flex; align-items: center; gap: 7px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 4px 13px 4px 9px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 1rem;
    background: rgba(255,255,255,0.05);
    width: fit-content;
  }
  .co-hero-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #ff2d6b; animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .co-hero-title {
    font-size: 3rem; font-weight: 800;
    color: #fff; line-height: 1.1;
    letter-spacing: -0.03em; margin-bottom: 0.5rem;
  }
  .co-hero-title span { color: #ff2d6b; }

  .co-hero-sub {
    font-size: 14px; color: rgba(255,255,255,0.35); font-weight: 400;
  }

  /* ── STEPS ── */
  .co-steps {
    display: flex; align-items: center; gap: 0;
    max-width: 540px;
    margin: 0 auto;
    padding: 2rem 2rem 0;
  }

  .co-step {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    flex: 1;
  }

  .co-step-circle {
    width: 34px; height: 34px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700;
    border: 2px solid #e0e0e0; background: #fff; color: #ccc;
    position: relative; z-index: 1;
    transition: all 0.3s;
  }
  .co-step.done .co-step-circle {
    background: #edfaf4; border-color: #22c55e; color: #22c55e;
  }
  .co-step.active .co-step-circle {
    background: #ff2d6b; border-color: #ff2d6b; color: #fff;
  }
  .co-step-label {
    font-size: 11px; font-weight: 600; color: #ccc;
    letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap;
  }
  .co-step.active .co-step-label { color: #ff2d6b; }
  .co-step.done .co-step-label { color: #22c55e; }

  .co-step-line {
    flex: 1; height: 2px; background: #e8e8e8;
    margin-bottom: 20px; /* align with circles */
  }
  .co-step-line.done { background: #22c55e; }

  /* ── BODY ── */
  .co-body {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem 2rem 0;
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 1.75rem;
    align-items: flex-start;
  }
  @media (max-width: 820px) { .co-body { grid-template-columns: 1fr; } }

  /* ── FORM CARD ── */
  .co-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
  }

  .co-card-head {
    padding: 1.4rem 1.75rem;
    border-bottom: 1px solid #f2f2f2;
    display: flex; align-items: center; gap: 10px;
  }
  .co-card-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: #fff0f4;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .co-card-title { font-size: 15px; font-weight: 700; color: #111; }

  .co-card-body { padding: 1.75rem; }

  /* ── FIELDS ── */
  .co-field { margin-bottom: 1.25rem; }

  .co-label {
    display: block;
    font-size: 11.5px; font-weight: 600;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: #bbb; margin-bottom: 7px;
  }

  .co-input {
    width: 100%;
    padding: 13px 16px;
    background: #f8f8f8;
    border: 1.5px solid #efefef;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14.5px; color: #111;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .co-input::placeholder { color: #d0d0d0; }
  .co-input:focus {
    border-color: #ff2d6b; background: #fff;
    box-shadow: 0 0 0 4px rgba(255,45,107,0.08);
  }

  /* payment method */
  .co-pay-options {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
  }
  .co-pay-option {
    display: flex; align-items: center; gap: 10px;
    padding: 13px 16px;
    background: #f8f8f8;
    border: 1.5px solid #efefef;
    border-radius: 12px;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 500; color: #555;
  }
  .co-pay-option.selected {
    border-color: #ff2d6b; background: #fff0f4; color: #ff2d6b; font-weight: 600;
  }
  .co-pay-radio {
    width: 16px; height: 16px; border-radius: 50%;
    border: 2px solid #ddd; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s;
  }
  .co-pay-option.selected .co-pay-radio {
    border-color: #ff2d6b;
  }
  .co-pay-radio-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #ff2d6b;
    transform: scale(0);
    transition: transform 0.15s;
  }
  .co-pay-option.selected .co-pay-radio-dot { transform: scale(1); }

  /* ── SUBMIT ── */
  .co-submit-btn {
    width: 100%; padding: 15px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 13px;
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.01em;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    margin-top: 0.5rem;
  }
  .co-submit-btn:hover {
    background: #e01f59;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,45,107,0.35);
  }
  .co-submit-btn:active { transform: scale(0.98); }

  /* ── TRUST CARD ── */
  .co-trust {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
    position: sticky;
    top: 80px;
  }

  .co-trust-head {
    padding: 1.4rem 1.75rem;
    border-bottom: 1px solid #f2f2f2;
  }
  .co-trust-title { font-size: 15px; font-weight: 700; color: #111; }

  .co-trust-body { padding: 1.5rem 1.75rem; }

  .co-trust-item {
    display: flex; align-items: flex-start; gap: 13px;
    padding: 0.85rem 0;
    border-bottom: 1px solid #f7f7f7;
  }
  .co-trust-item:last-child { border-bottom: none; }

  .co-trust-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: #fff0f4;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }

  .co-trust-content {}
  .co-trust-label { font-size: 13.5px; font-weight: 600; color: #111; margin-bottom: 2px; }
  .co-trust-desc  { font-size: 12px; color: #aaa; font-weight: 400; line-height: 1.5; }

  .co-secure-note {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    margin-top: 1.25rem; padding-top: 1.25rem;
    border-top: 1px solid #f2f2f2;
    font-size: 12px; color: #ccc; font-weight: 500;
  }
`;

const TRUST_ITEMS = [
  {
    label: "Secure Payment",
    desc: "Your payment info is encrypted and never stored.",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
  },
  {
    label: "Free Delivery",
    desc: "Free shipping on all orders across India.",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    label: "Easy Returns",
    desc: "30-day hassle-free return policy.",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.95"/>
      </svg>
    ),
  },
  {
    label: "24/7 Support",
    desc: "We're here to help anytime you need us.",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    payment_method: "COD",
  });

  const nav = useNavigate();
  const { clearCart } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  // ── original logic unchanged ──
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch(`${BASEURL}/api/orders/create/`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
        alert("Order placed successfully!");
        nav("/");
      } else {
        alert(data.error || "Order failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="co-root">

        {/* HERO */}
        <div className="co-hero">
          <div className="co-hero-inner">
            <div className="co-hero-tag">
              <span className="co-hero-dot" />
              Almost There
            </div>
            <h1 className="co-hero-title">
              Secure <span>Checkout</span>
            </h1>
            <p className="co-hero-sub">Complete your order in just a few steps</p>
          </div>
        </div>

        {/* PROGRESS STEPS */}
        <div className="co-steps">
          <div className="co-step done">
            <div className="co-step-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span className="co-step-label">Cart</span>
          </div>
          <div className="co-step-line done" />
          <div className="co-step active">
            <div className="co-step-circle">2</div>
            <span className="co-step-label">Details</span>
          </div>
          <div className="co-step-line" />
          <div className="co-step">
            <div className="co-step-circle">3</div>
            <span className="co-step-label">Confirm</span>
          </div>
        </div>

        {/* BODY */}
        <div className="co-body">

          {/* FORM */}
          <div className="co-card">
            <div className="co-card-head">
              <div className="co-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span className="co-card-title">Delivery Information</span>
            </div>
            <div className="co-card-body">
              <form onSubmit={handleSubmit}>

                <div className="co-field">
                  <label className="co-label">Full Name</label>
                  <input
                    className="co-input"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="co-field">
                  <label className="co-label">Delivery Address</label>
                  <input
                    className="co-input"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street, City, State, PIN"
                    required
                  />
                </div>

                <div className="co-field">
                  <label className="co-label">Phone Number</label>
                  <input
                    className="co-input"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>

                <div className="co-field">
                  <label className="co-label">Payment Method</label>
                  <div className="co-pay-options">
                    {[
                      { value: "COD", label: "Cash on Delivery", icon: "💵" },
                      { value: "ONLINE", label: "Online Payment", icon: "💳" },
                    ].map(opt => (
                      <div
                        key={opt.value}
                        className={`co-pay-option${form.payment_method === opt.value ? " selected" : ""}`}
                        onClick={() => setForm({ ...form, payment_method: opt.value })}
                      >
                        <div className="co-pay-radio">
                          <div className="co-pay-radio-dot" />
                        </div>
                        <span style={{ fontSize: 15 }}>{opt.icon}</span>
                        {opt.label}
                        {/* hidden select for form submission */}
                      </div>
                    ))}
                  </div>
                  {/* keep the original select hidden for form data */}
                  <select
                    name="payment_method"
                    value={form.payment_method}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  >
                    <option value="COD">Cash on Delivery</option>
                    <option value="ONLINE">Online Payment</option>
                  </select>
                </div>

                <button type="submit" className="co-submit-btn">
                  Place Order
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>

              </form>
            </div>
          </div>

          {/* TRUST SIDEBAR */}
          <div className="co-trust">
            <div className="co-trust-head">
              <p className="co-trust-title">Why shop with us?</p>
            </div>
            <div className="co-trust-body">
              {TRUST_ITEMS.map(item => (
                <div key={item.label} className="co-trust-item">
                  <div className="co-trust-icon">{item.icon}</div>
                  <div className="co-trust-content">
                    <p className="co-trust-label">{item.label}</p>
                    <p className="co-trust-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="co-secure-note">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                256-bit SSL encrypted checkout
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default CheckoutPage;