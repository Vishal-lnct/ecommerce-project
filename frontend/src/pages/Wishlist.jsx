import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .wl-root {
    min-height: 100vh;
    background: #f5f5f5;
    font-family: 'Inter', sans-serif;
    padding-bottom: 5rem;
  }

  .wl-hero {
    background: #111;
    padding: 3rem 4rem 2.5rem;
    position: relative;
  }

  .wl-hero::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px,
      transparent 1px, transparent 44px
    );
    pointer-events: none;
  }

  .wl-hero-inner { position: relative; z-index: 1; }

  .wl-hero-tag {
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

  .wl-hero-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #ff2d6b; animation: pulse 2s infinite;
  }

  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .wl-hero-title {
    font-size: 3rem; font-weight: 800;
    color: #fff; line-height: 1.1;
    letter-spacing: -0.03em; margin-bottom: 0.5rem;
  }

  .wl-hero-title span { color: #ff2d6b; }

  .wl-hero-sub {
    font-size: 14px; color: rgba(255,255,255,0.35);
    font-weight: 400;
  }

  .wl-body {
    max-width: 1300px;
    margin: 0 auto;
    padding: 2.5rem 2.5rem 0;
  }

  .wl-empty {
    display: flex; flex-direction: column;
    align-items: center; padding: 7rem 2rem; text-align: center;
  }

  .wl-empty-icon {
    width: 88px; height: 88px; border-radius: 50%;
    background: #fff0f4;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }

  .wl-empty-title { font-size: 1.3rem; font-weight: 700; color: #444; margin-bottom: 0.5rem; }

  .wl-empty-sub { font-size: 15px; color: #aaa; line-height: 1.7; }

  .wl-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (min-width: 640px)  { .wl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1024px) { .wl-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (min-width: 1400px) { .wl-grid { grid-template-columns: repeat(5, 1fr); } }

  .wl-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
  }

  .wl-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.1);
  }

  .wl-img-wrap {
    aspect-ratio: 4/5;
    overflow: hidden;
    background: #f7f7f5;
    position: relative;
  }

  .wl-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
  }

  .wl-card:hover .wl-img { transform: scale(1.06); }

  .wl-info {
    padding: 1rem 1.1rem 1.1rem;
  }

  .wl-name {
    font-size: 14px; font-weight: 600; color: #111;
    margin-bottom: 6px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .wl-price-row {
    display: flex; align-items: center;
    justify-content: space-between;
    gap: 8px; margin-bottom: 0.85rem;
  }

  .wl-price {
    font-size: 1.05rem; font-weight: 800;
    color: #111; letter-spacing: -0.02em;
  }

  .wl-original {
    font-size: 12px; color: #ccc;
    text-decoration: line-through; font-weight: 400;
  }

  .wl-remove-btn {
    width: 100%;
    padding: 10px;
    background: #fff;
    border: 1.5px solid #ffc5d3;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; color: #ff2d6b;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    transition: background 0.15s, border-color 0.15s;
  }

  .wl-remove-btn:hover { background: #fff0f4; border-color: #ff2d6b; }
`;

function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, fetchWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { navigate("/login"); return; }
    fetchWishlist();
  }, [navigate]);

  return (
    <>
      <style>{styles}</style>
      <div className="wl-root">

        <div className="wl-hero">
          <div className="wl-hero-inner">
            <div className="wl-hero-tag">
              <span className="wl-hero-dot" />
              My Account
            </div>
            <h1 className="wl-hero-title">
              My <span>Wishlist</span>
            </h1>
            <p className="wl-hero-sub">
              {wishlistItems.length > 0
                ? `${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""} saved`
                : "Items you love, all in one place"}
            </p>
          </div>
        </div>

        <div className="wl-body">
          {wishlistItems.length === 0 ? (
            <div className="wl-empty">
              <div className="wl-empty-icon">❤️</div>
              <p className="wl-empty-title">Your wishlist is empty</p>
              <p className="wl-empty-sub">Save items you love and<br />find them here anytime.</p>
            </div>
          ) : (
            <div className="wl-grid">
              {wishlistItems.map((item, idx) => (
                <div key={item.id} className="wl-card">

                  <div className="wl-img-wrap">
                    <img
                      className="wl-img"
                      src={item.product.image}
                      alt={item.product.name}
                      onError={e => { e.target.src = "https://picsum.photos/400"; }}
                    />
                  </div>

                  <div className="wl-info">
                    <p className="wl-name">{item.product.name}</p>

                    <div className="wl-price-row">
                      <span className="wl-price">₹{item.product.price}</span>
                      <span className="wl-original">
                        ₹{Math.round(item.product.price * 1.2)}
                      </span>
                    </div>

                    <button
                      className="wl-remove-btn"
                      onClick={() => removeFromWishlist(item.product.id)}
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
}

export default Wishlist;