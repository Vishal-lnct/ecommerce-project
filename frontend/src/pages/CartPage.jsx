import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .cart-root {
    min-height: 100vh;
    background: #f5f5f5;
    font-family: 'Inter', sans-serif;
    padding-bottom: 5rem;
  }

  /* ── HERO ── */
  .cart-hero {
    background: #111;
    padding: 3rem 4rem 2.5rem;
    position: relative;
  }
  .cart-hero::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px,
      transparent 1px, transparent 44px
    );
    pointer-events: none;
  }
  .cart-hero-inner { position: relative; z-index: 1; }

  .cart-hero-tag {
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
  .cart-hero-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #ff2d6b; animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .cart-hero-title {
    font-size: 3rem; font-weight: 800;
    color: #fff; line-height: 1.1;
    letter-spacing: -0.03em; margin-bottom: 0.5rem;
  }
  .cart-hero-title span { color: #ff2d6b; }

  .cart-hero-sub {
    font-size: 14px; color: rgba(255,255,255,0.35); font-weight: 400;
  }

  /* ── BODY ── */
  .cart-body {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 2rem 0;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 1.75rem;
    align-items: flex-start;
  }
  @media (max-width: 900px) {
    .cart-body { grid-template-columns: 1fr; }
  }

  /* ── EMPTY ── */
  .cart-empty {
    grid-column: 1 / -1;
    display: flex; flex-direction: column;
    align-items: center; padding: 7rem 2rem; text-align: center;
  }
  .cart-empty-icon {
    width: 88px; height: 88px; border-radius: 50%;
    background: #fff0f4;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .cart-empty-title { font-size: 1.3rem; font-weight: 700; color: #444; margin-bottom: 0.5rem; }
  .cart-empty-sub { font-size: 15px; color: #aaa; line-height: 1.7; margin-bottom: 1.5rem; }
  .cart-shop-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 24px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 700;
    cursor: pointer; text-decoration: none;
    transition: background 0.15s, transform 0.15s;
  }
  .cart-shop-btn:hover { background: #e01f59; transform: translateY(-1px); }

  /* ── ITEMS PANEL ── */
  .cart-items-panel {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
  }

  .cart-panel-head {
    padding: 1.4rem 1.75rem;
    border-bottom: 1px solid #f2f2f2;
    display: flex; align-items: center; justify-content: space-between;
  }
  .cart-panel-title {
    font-size: 15px; font-weight: 700; color: #111;
  }
  .cart-item-count {
    background: #f5f5f5;
    border-radius: 100px;
    padding: 4px 12px;
    font-size: 12px; font-weight: 600; color: #888;
  }

  /* ── ITEM ROW ── */
  .cart-item {
    display: flex; align-items: center;
    gap: 1.25rem;
    padding: 1.4rem 1.75rem;
    border-bottom: 1px solid #f7f7f7;
    transition: background 0.15s;
  }
  .cart-item:last-child { border-bottom: none; }
  .cart-item:hover { background: #fafafa; }

  .cart-item-img {
    width: 84px; height: 84px;
    object-fit: cover; border-radius: 14px;
    background: #f5f5f5; flex-shrink: 0;
    border: 1px solid #efefef;
  }

  .cart-item-info { flex: 1; min-width: 0; }

  .cart-item-name {
    font-size: 15px; font-weight: 600; color: #111;
    margin-bottom: 5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .cart-item-price {
    font-size: 15px; font-weight: 800; color: #111;
    letter-spacing: -0.02em;
  }

  .cart-item-actions {
    display: flex; align-items: center; gap: 10px; flex-shrink: 0;
  }

  /* qty controls */
  .qty-wrap {
    display: flex; align-items: center;
    background: #f5f5f5;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #efefef;
  }
  .qty-btn {
    width: 34px; height: 34px;
    background: none; border: none;
    font-size: 16px; font-weight: 700; color: #555;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, color 0.15s;
    font-family: 'Inter', sans-serif;
  }
  .qty-btn:hover { background: #ffe8ee; color: #ff2d6b; }
  .qty-val {
    font-size: 14px; font-weight: 700; color: #111;
    min-width: 28px; text-align: center;
  }

  /* remove */
  .cart-remove-btn {
    width: 34px; height: 34px;
    background: #fff; border: 1.5px solid #efefef;
    border-radius: 9px; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, border-color 0.15s;
  }
  .cart-remove-btn:hover { background: #fff0f4; border-color: #ffc5d3; }
  .cart-remove-btn:hover svg { stroke: #ff2d6b; }
  .cart-remove-btn svg { transition: stroke 0.15s; }

  /* item subtotal */
  .cart-item-subtotal {
    font-size: 15px; font-weight: 800; color: #111;
    min-width: 72px; text-align: right;
    letter-spacing: -0.02em;
  }

  /* ── SUMMARY PANEL ── */
  .cart-summary {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
    position: sticky;
    top: 80px;
  }

  .cart-summary-head {
    padding: 1.4rem 1.75rem;
    border-bottom: 1px solid #f2f2f2;
  }
  .cart-summary-title {
    font-size: 15px; font-weight: 700; color: #111;
  }

  .cart-summary-body { padding: 1.5rem 1.75rem; }

  .summary-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1rem; font-size: 14px;
  }
  .summary-row-label { color: #888; font-weight: 500; }
  .summary-row-val { color: #111; font-weight: 600; }
  .summary-row-val.free { color: #1a7f4b; font-weight: 700; }

  .summary-divider { height: 1px; background: #f2f2f2; margin: 1rem 0; }

  .summary-total-row {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem;
  }
  .summary-total-label {
    font-size: 15px; font-weight: 700; color: #111;
  }
  .summary-total-val {
    font-size: 1.5rem; font-weight: 800; color: #111;
    letter-spacing: -0.03em;
  }

  .checkout-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%; padding: 15px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 13px;
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 700;
    cursor: pointer; text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    letter-spacing: 0.01em;
  }
  .checkout-btn:hover {
    background: #e01f59;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(255,45,107,0.35);
  }

  .summary-note {
    text-align: center; font-size: 12px; color: #ccc;
    margin-top: 1rem; line-height: 1.5;
    display: flex; align-items: center; justify-content: center; gap: 5px;
  }
`;

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  console.log("Cart Items:", cartItems);

  return (
    <>
      <style>{styles}</style>
      <div className="cart-root">

        {/* HERO */}
        <div className="cart-hero">
          <div className="cart-hero-inner">
            <div className="cart-hero-tag">
              <span className="cart-hero-dot" />
              Shopping
            </div>
            <h1 className="cart-hero-title">
              Your <span>Bag</span>
            </h1>
            <p className="cart-hero-sub">
              {cartItems.length > 0
                ? `${cartItems.length} item${cartItems.length !== 1 ? "s" : ""} in your cart`
                : "Your cart is waiting to be filled"}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="cart-body">
          {cartItems.length === 0 ? (

            <div className="cart-empty">
              <div className="cart-empty-icon">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="cart-empty-title">Your cart is empty</p>
              <p className="cart-empty-sub">Looks like you haven't added<br />anything to your bag yet.</p>
              <Link to="/" className="cart-shop-btn">
                Start Shopping →
              </Link>
            </div>

          ) : (
            <>
              {/* ITEMS */}
              <div className="cart-items-panel">
                <div className="cart-panel-head">
                  <span className="cart-panel-title">Cart Items</span>
                  <span className="cart-item-count">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""}</span>
                </div>

                {cartItems.map((item) => {
                  // Fix image URL — original logic
                  const imageUrl = item.product_image?.startsWith("http")
                    ? item.product_image
                    : `${BASEURL}${item.product_image}`;

                  const subtotal = (item.product_price * item.quantity).toFixed(2);

                  return (
                    <div key={item.id} className="cart-item">

                      <img
                        className="cart-item-img"
                        src={imageUrl}
                        alt={item.product_name}
                        onError={e => { e.target.src = "https://picsum.photos/84"; }}
                      />

                      <div className="cart-item-info">
                        <p className="cart-item-name">{item.product_name}</p>
                        <p className="cart-item-price">₹{item.product_price}</p>
                      </div>

                      <div className="cart-item-actions">
                        {/* QTY CONTROLS — original logic */}
                        <div className="qty-wrap">
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >−</button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>

                        {/* REMOVE — original logic */}
                        <button
                          className="cart-remove-btn"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>

                      <span className="cart-item-subtotal">₹{subtotal}</span>
                    </div>
                  );
                })}
              </div>

              {/* ORDER SUMMARY */}
              <div className="cart-summary">
                <div className="cart-summary-head">
                  <p className="cart-summary-title">Order Summary</p>
                </div>
                <div className="cart-summary-body">
                  <div className="summary-row">
                    <span className="summary-row-label">Subtotal</span>
                    <span className="summary-row-val">₹{total.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Shipping</span>
                    <span className="summary-row-val free">Free</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-row-label">Tax (GST 18%)</span>
                    <span className="summary-row-val">₹{(total * 0.18).toFixed(2)}</span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-total-row">
                    <span className="summary-total-label">Total</span>
                    <span className="summary-total-val">₹{(total * 1.18).toFixed(2)}</span>
                  </div>

                  <Link to="/checkout" className="checkout-btn">
                    Proceed to Checkout
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>

                  <p className="summary-note">
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