import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

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

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  console.log("Cart Items:", cartItems);

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
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 border border-white/15 rounded-full px-[13px] py-1 pl-[9px] text-[11px] font-semibold tracking-[0.07em] uppercase text-white/40 mb-4 bg-white/[0.05] w-fit">
              <span className="w-[7px] h-[7px] rounded-full bg-[#ff2d6b] animate-pulse-dot" />
              Shopping
            </div>

            <h1 className="text-[3rem] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-2">
              Your <span className="text-[#ff2d6b]">Bag</span>
            </h1>

            <p className="text-sm text-white/35 font-normal">
              {cartItems.length > 0
                ? `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`
                : "Your cart is waiting to be filled"}
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-[1100px] mx-auto px-8 pt-10 grid grid-cols-1 md:grid-cols-[1fr_340px] gap-7 items-start">

          {/* ── EMPTY STATE ── */}
          {cartItems.length === 0 ? (
            <div className="col-span-full flex flex-col items-center py-28 px-8 text-center">
              <div className="w-[88px] h-[88px] rounded-full bg-[#fff0f4] flex items-center justify-center mb-6">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="text-[1.3rem] font-bold text-[#444] mb-2">Your cart is empty</p>
              <p className="text-[15px] text-[#aaa] leading-[1.7] mb-6">
                Looks like you haven't added<br />anything to your bag yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff2d6b] text-white border-none rounded-xl font-inter text-sm font-bold cursor-pointer no-underline transition-all duration-150 hover:bg-[#e01f59] hover:-translate-y-px"
              >
                Start Shopping →
              </Link>
            </div>

          ) : (
            <>
              {/* ── ITEMS PANEL ── */}
              <div className="bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)]">

                {/* Panel header */}
                <div className="flex items-center justify-between px-7 py-[1.4rem] border-b border-[#f2f2f2]">
                  <span className="text-[15px] font-bold text-[#111]">Cart Items</span>
                  <span className="bg-[#f5f5f5] rounded-full px-3 py-1 text-xs font-semibold text-[#888]">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Item rows */}
                {cartItems.map((item) => {
                  // Fix image URL — original logic
                  const imageUrl = item.product_image?.startsWith("http")
                    ? item.product_image
                    : `${BASEURL}${item.product_image}`;

                  const subtotal = (item.product_price * item.quantity).toFixed(2);

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-5 px-7 py-[1.4rem] border-b border-[#f7f7f7] last:border-b-0 transition-colors duration-150 hover:bg-[#fafafa]"
                    >
                      {/* Image */}
                      <img
                        className="w-[84px] h-[84px] object-cover rounded-[14px] bg-[#f5f5f5] flex-shrink-0 border border-[#efefef]"
                        src={imageUrl}
                        alt={item.product_name}
                        onError={(e) => { e.target.src = "https://picsum.photos/84"; }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-[#111] mb-1 truncate">
                          {item.product_name}
                        </p>
                        <p className="text-[15px] font-extrabold text-[#111] tracking-[-0.02em]">
                          ₹{item.product_price}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2.5 flex-shrink-0">

                        {/* Qty controls */}
                        <div className="flex items-center bg-[#f5f5f5] rounded-[10px] overflow-hidden border border-[#efefef]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-[34px] h-[34px] bg-transparent border-none text-base font-bold text-[#555] cursor-pointer flex items-center justify-center font-inter transition-all duration-150 hover:bg-[#ffe8ee] hover:text-[#ff2d6b]"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold text-[#111] min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-[34px] h-[34px] bg-transparent border-none text-base font-bold text-[#555] cursor-pointer flex items-center justify-center font-inter transition-all duration-150 hover:bg-[#ffe8ee] hover:text-[#ff2d6b]"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                          className="w-[34px] h-[34px] bg-white border-[1.5px] border-[#efefef] rounded-[9px] cursor-pointer flex items-center justify-center transition-all duration-150 group hover:bg-[#fff0f4] hover:border-[#ffc5d3]"
                        >
                          <svg
                            width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                            className="transition-[stroke] duration-150 group-hover:stroke-[#ff2d6b]"
                          >
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>

                      {/* Subtotal */}
                      <span className="text-[15px] font-extrabold text-[#111] min-w-[72px] text-right tracking-[-0.02em]">
                        ₹{subtotal}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* ── ORDER SUMMARY ── */}
              <div className="bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)] sticky top-20">

                {/* Summary header */}
                <div className="px-7 py-[1.4rem] border-b border-[#f2f2f2]">
                  <p className="text-[15px] font-bold text-[#111]">Order Summary</p>
                </div>

                {/* Summary body */}
                <div className="px-7 py-6">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-[#888] font-medium">Subtotal</span>
                    <span className="text-[#111] font-semibold">₹{total.toFixed(2)}</span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-[#888] font-medium">Shipping</span>
                    <span className="text-[#1a7f4b] font-bold">Free</span>
                  </div>

                  {/* Tax */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="text-[#888] font-medium">Tax (GST 18%)</span>
                    <span className="text-[#111] font-semibold">₹{(total * 0.18).toFixed(2)}</span>
                  </div>

                  <div className="h-px bg-[#f2f2f2] my-4" />

                  {/* Total */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[15px] font-bold text-[#111]">Total</span>
                    <span className="text-[1.5rem] font-extrabold text-[#111] tracking-[-0.03em]">
                      ₹{(total * 1.18).toFixed(2)}
                    </span>
                  </div>

                  {/* Checkout button */}
                  <Link
                    to="/checkout"
                    className="flex items-center justify-center gap-2 w-full py-[15px] bg-[#ff2d6b] text-white border-none rounded-[13px] font-inter text-[15px] font-bold cursor-pointer no-underline tracking-[0.01em] transition-all duration-200 hover:bg-[#e01f59] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,45,107,0.35)]"
                  >
                    Proceed to Checkout
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>

                  {/* Note */}
                  <p className="text-center text-xs text-[#ccc] mt-4 leading-relaxed flex items-center justify-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Secure checkout · Free returns
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;