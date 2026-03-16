import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

  .pc-link {
    display: block;
    text-decoration: none;
    color: inherit;
  }

  .pc-card {
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #f0f0f0;
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    position: relative;
  }
  .pc-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 48px rgba(0,0,0,0.1);
  }

  .pc-img-wrap {
    position: relative;
    aspect-ratio: 4/5;
    background: #f7f7f5;
    overflow: hidden;
  }

  .pc-img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .pc-card:hover .pc-img { transform: scale(1.07); }

  .pc-badge {
    position: absolute;
    top: 12px; left: 12px;
    background: #ff2d6b;
    color: #fff;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.04em;
    padding: 4px 9px;
    border-radius: 100px;
    z-index: 1;
  }

  .pc-wish {
    position: absolute;
    top: 12px; right: 12px;
    width: 36px; height: 36px;
    background: #fff;
    border-radius: 50%;
    border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    opacity: 0;
    transform: scale(0.85);
    transition: opacity 0.2s, transform 0.2s;
    z-index: 1;
  }
  .pc-card:hover .pc-wish {
    opacity: 1;
    transform: scale(1);
  }
  .pc-wish:hover { background: #fff0f4; }

  .pc-quick-add {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: rgba(17,17,17,0.88);
    backdrop-filter: blur(6px);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 11px;
    text-align: center;
    transform: translateY(100%);
    transition: transform 0.25s cubic-bezier(0.16,1,0.3,1);
    border: none;
    cursor: pointer;
    width: 100%;
  }
  .pc-card:hover .pc-quick-add { transform: translateY(0); }

  .pc-info {
    padding: 1rem 1.1rem 1.15rem;
  }

  .pc-category {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ccc;
    margin-bottom: 5px;
  }

  .pc-name {
    font-size: 14px;
    font-weight: 700;
    color: #111;
    line-height: 1.35;
    margin-bottom: 0.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .pc-price-row {
    display: flex;
    align-items: baseline;
    gap: 7px;
    margin-bottom: 0.55rem;
  }

  .pc-price {
    font-size: 1.15rem;
    font-weight: 800;
    color: #111;
  }

  .pc-original {
    font-size: 12px;
    color: #ccc;
    text-decoration: line-through;
  }

  .pc-save {
    font-size: 10.5px;
    font-weight: 700;
    color: #1a7f4b;
    background: #edfaf4;
    border-radius: 100px;
    padding: 2px 8px;
    margin-left: auto;
  }

  .pc-rating-row {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .pc-stars {
    display: flex; gap: 1px;
  }

  .pc-star {
    width: 11px; height: 11px;
  }

  .pc-rating-count {
    font-size: 11px;
    color: #bbb;
  }
`;

function Stars({ rating = 4 }) {
  return (
    <div className="pc-stars">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className="pc-star" viewBox="0 0 24 24" fill={i <= rating ? "#f5a623" : "#e8e8e8"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }) {

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPct = 20;
  const originalPrice = Math.round(product.price * 1.2);
  const rating = product.rating || 4;
  const ratingCount = product.rating_count || product.review_count || 128;

  useEffect(() => {
    const exists = wishlistItems.some(item => item.product.id === product.id);
    setIsWishlisted(exists);
  }, [wishlistItems, product.id]);

  const handleQuickAdd = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    addToCart(product.id);
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (isWishlisted) {
      await removeFromWishlist(product.id);
    } else {
      await addToWishlist(product.id);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <Link to={`/product/${product.id}`} className="pc-link">
        <div className="pc-card">

          <div className="pc-img-wrap">
            <span className="pc-badge">-{discountPct}%</span>

            <img
              className="pc-img"
              src={product.image}
              alt={product.name}
              onError={e => { e.target.src = "https://picsum.photos/400"; }}
            />

            <button
              className="pc-wish"
              onClick={toggleWishlist}
              aria-label="Add to wishlist"
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>

            <button
              className="pc-quick-add"
              onClick={handleQuickAdd}
            >
              Quick Add to Bag
            </button>
          </div>

          <div className="pc-info">
            {product.category && (
              <p className="pc-category">
                {typeof product.category === "object" ? product.category.name : product.category}
              </p>
            )}

            <p className="pc-name">{product.name}</p>

            <div className="pc-price-row">
              <span className="pc-price">₹{product.price}</span>
              <span className="pc-original">₹{originalPrice}</span>
              <span className="pc-save">{discountPct}% off</span>
            </div>

            <div className="pc-rating-row">
              <Stars rating={rating} />
              <span className="pc-rating-count">({ratingCount})</span>
            </div>
          </div>

        </div>
      </Link>
    </>
  );
}

export default ProductCard;