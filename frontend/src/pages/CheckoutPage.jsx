import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

// Only keyframes + font import — can't be expressed with Tailwind utilities alone
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
  .animate-pulse-dot { animation: pulse 2s infinite; }
  .font-inter { font-family: 'Inter', sans-serif; }
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
      <style>{keyframes}</style>

      <div className="min-h-screen bg-[#f5f5f5] font-inter pb-20">

        {/* ── HERO ── */}
        <div
          className="bg-[#111] px-16 pt-12 pb-10 relative"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 44px)",
          }}
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 border border-white/15 rounded-full px-[13px] py-1 pl-[9px] text-[11px] font-semibold tracking-[0.07em] uppercase text-white/40 mb-4 bg-white/[0.05] w-fit">
              <span className="w-[7px] h-[7px] rounded-full bg-[#ff2d6b] animate-pulse-dot" />
              Almost There
            </div>
            <h1 className="text-[3rem] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-2">
              Secure <span className="text-[#ff2d6b]">Checkout</span>
            </h1>
            <p className="text-sm text-white/35 font-normal">
              Complete your order in just a few steps
            </p>
          </div>
        </div>

        {/* ── PROGRESS STEPS ── */}
        <div className="flex items-center max-w-[540px] mx-auto px-8 pt-8">

          {/* Step 1 — done */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-2 border-[#22c55e] bg-[#edfaf4] text-[#22c55e] relative z-10 transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <span className="text-[11px] font-semibold text-[#22c55e] tracking-[0.04em] uppercase whitespace-nowrap">Cart</span>
          </div>

          {/* Line — done */}
          <div className="flex-1 h-0.5 bg-[#22c55e] mb-5" />

          {/* Step 2 — active */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-2 border-[#ff2d6b] bg-[#ff2d6b] text-white relative z-10 transition-all duration-300">
              2
            </div>
            <span className="text-[11px] font-semibold text-[#ff2d6b] tracking-[0.04em] uppercase whitespace-nowrap">Details</span>
          </div>

          {/* Line — inactive */}
          <div className="flex-1 h-0.5 bg-[#e8e8e8] mb-5" />

          {/* Step 3 — inactive */}
          <div className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-2 border-[#e0e0e0] bg-white text-[#ccc] relative z-10 transition-all duration-300">
              3
            </div>
            <span className="text-[11px] font-semibold text-[#ccc] tracking-[0.04em] uppercase whitespace-nowrap">Confirm</span>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-[1000px] mx-auto px-8 pt-8 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-7 items-start">

          {/* ── FORM CARD ── */}
          <div className="bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)]">

            {/* Card header */}
            <div className="flex items-center gap-2.5 px-7 py-[1.4rem] border-b border-[#f2f2f2]">
              <div className="w-9 h-9 rounded-[10px] bg-[#fff0f4] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <span className="text-[15px] font-bold text-[#111]">Delivery Information</span>
            </div>

            {/* Card body */}
            <div className="p-7">
              <form onSubmit={handleSubmit}>

                {/* Full Name */}
                <div className="mb-5">
                  <label className="block text-[11.5px] font-semibold tracking-[0.06em] uppercase text-[#bbb] mb-1.5">
                    Full Name
                  </label>
                  <input
                    className="w-full px-4 py-[13px] bg-[#f8f8f8] border-[1.5px] border-[#efefef] rounded-xl font-inter text-[14.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#d0d0d0] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,45,107,0.08)]"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Delivery Address */}
                <div className="mb-5">
                  <label className="block text-[11.5px] font-semibold tracking-[0.06em] uppercase text-[#bbb] mb-1.5">
                    Delivery Address
                  </label>
                  <input
                    className="w-full px-4 py-[13px] bg-[#f8f8f8] border-[1.5px] border-[#efefef] rounded-xl font-inter text-[14.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#d0d0d0] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,45,107,0.08)]"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Street, City, State, PIN"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-5">
                  <label className="block text-[11.5px] font-semibold tracking-[0.06em] uppercase text-[#bbb] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-[13px] bg-[#f8f8f8] border-[1.5px] border-[#efefef] rounded-xl font-inter text-[14.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#d0d0d0] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,45,107,0.08)]"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXXXXXXX"
                    required
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-5">
                  <label className="block text-[11.5px] font-semibold tracking-[0.06em] uppercase text-[#bbb] mb-1.5">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { value: "COD",    label: "Cash on Delivery", icon: "💵" },
                      { value: "ONLINE", label: "Online Payment",   icon: "💳" },
                    ].map((opt) => {
                      const selected = form.payment_method === opt.value;
                      return (
                        <div
                          key={opt.value}
                          onClick={() => setForm({ ...form, payment_method: opt.value })}
                          className={`flex items-center gap-2.5 px-4 py-[13px] rounded-xl cursor-pointer transition-all duration-200 font-inter text-sm font-medium
                            ${selected
                              ? "border-[1.5px] border-[#ff2d6b] bg-[#fff0f4] text-[#ff2d6b] font-semibold"
                              : "border-[1.5px] border-[#efefef] bg-[#f8f8f8] text-[#555]"
                            }`}
                        >
                          {/* Radio circle */}
                          <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${selected ? "border-[#ff2d6b]" : "border-[#ddd]"}`}>
                            <div className={`w-2 h-2 rounded-full bg-[#ff2d6b] transition-transform duration-150 ${selected ? "scale-100" : "scale-0"}`} />
                          </div>
                          <span className="text-[15px]">{opt.icon}</span>
                          {opt.label}
                        </div>
                      );
                    })}
                  </div>
                  {/* Hidden select for form submission — original logic */}
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

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-[15px] bg-[#ff2d6b] text-white border-none rounded-[13px] font-inter text-[15px] font-bold cursor-pointer tracking-[0.01em] flex items-center justify-center gap-2 mt-2 transition-all duration-200 hover:bg-[#e01f59] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,45,107,0.35)] active:scale-[0.98]"
                >
                  Place Order
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>

              </form>
            </div>
          </div>

          {/* ── TRUST SIDEBAR ── */}
          <div className="bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)] sticky top-20">

            <div className="px-7 py-[1.4rem] border-b border-[#f2f2f2]">
              <p className="text-[15px] font-bold text-[#111]">Why shop with us?</p>
            </div>

            <div className="px-7 py-6">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-[13px] py-[0.85rem] border-b border-[#f7f7f7] last:border-b-0"
                >
                  <div className="w-[38px] h-[38px] rounded-[10px] bg-[#fff0f4] flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#111] mb-0.5">{item.label}</p>
                    <p className="text-xs text-[#aaa] font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}

              {/* Secure note */}
              <div className="flex items-center justify-center gap-1.5 mt-5 pt-5 border-t border-[#f2f2f2] text-xs text-[#ccc] font-medium">
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