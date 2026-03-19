import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";

// Only font import + things Tailwind can't express
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
  .font-syne { font-family: 'Syne', sans-serif; }

  /* group-hover on nested img scale needs the parent .pc-card group,
     but the quick-add translateY(100%) → translateY(0) and wish opacity/scale
     on parent hover are easier kept here since Tailwind group-hover
     can't target sibling transform origins cleanly at this specificity */
  .pc-card:hover .pc-img      { transform: scale(1.07); }
  .pc-card:hover .pc-wish     { opacity: 1; transform: scale(1); }
  .pc-card:hover .pc-quick-add { transform: translateY(0); }
`;

function Stars({ rating = 4 }) {
  return (
    <div className="flex gap-px">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-[11px] h-[11px]" viewBox="0 0 24 24" fill={i <= rating ? "#f5a623" : "#e8e8e8"}>
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

  const discountPct   = 20;
  const originalPrice = Math.round(product.price * 1.2);
  const rating        = product.rating || 4;
  const ratingCount   = product.rating_count || product.review_count || 128;

  useEffect(() => {
    const exists = wishlistItems.some((item) => item.product.id === product.id);
    setIsWishlisted(exists);
  }, [wishlistItems, product.id]);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) { navigate("/login"); return; }
    addToCart(product.id);
  };

  const toggleWishlist = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    if (!token) { navigate("/login"); return; }
    if (isWishlisted) await removeFromWishlist(product.id);
    else await addToWishlist(product.id);
  };

  return (
    <>
      <style>{keyframes}</style>

      <Link to={`/product/${product.id}`} className="block no-underline text-inherit">
        <div className="pc-card bg-white rounded-[20px] overflow-hidden border border-[#f0f0f0] transition-all duration-[250ms] cursor-pointer font-syne relative hover:-translate-y-[5px] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]" style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}>

          {/* ── IMAGE WRAP ── */}
          <div className="relative bg-[#f7f7f5] overflow-hidden" style={{ aspectRatio: '4/5' }}>

            {/* Discount badge */}
            <span className="absolute top-3 left-3 bg-[#ff2d6b] text-white text-[10px] font-extrabold tracking-[0.04em] px-[9px] py-1 rounded-full z-10">
              -{discountPct}%
            </span>

            {/* Product image */}
            <img
              className="pc-img w-full h-full object-cover block transition-transform duration-[550ms]"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              src={product.image}
              alt={product.name}
              onError={(e) => { e.target.src = "https://picsum.photos/400"; }}
            />

            {/* Wishlist button */}
            <button
              className="pc-wish absolute top-3 right-3 w-9 h-9 bg-white rounded-full border-none flex items-center justify-center cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.1)] opacity-0 scale-[0.85] transition-all duration-200 z-10 hover:bg-[#fff0f4]"
              onClick={toggleWishlist}
              aria-label="Add to wishlist"
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>

            {/* Quick add button */}
            <button
              className="pc-quick-add absolute bottom-0 left-0 right-0 bg-[rgba(17,17,17,0.88)] backdrop-blur-[6px] text-white font-syne text-[12.5px] font-bold tracking-[0.04em] py-[11px] text-center translate-y-full transition-transform duration-[250ms] border-none cursor-pointer w-full"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)' }}
              onClick={handleQuickAdd}
            >
              Quick Add to Bag
            </button>
          </div>

          {/* ── INFO ── */}
          <div className="px-[1.1rem] pt-4 pb-[1.15rem]">

            {/* Category */}
            {product.category && (
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#ccc] mb-[5px]">
                {typeof product.category === "object" ? product.category.name : product.category}
              </p>
            )}

            {/* Name */}
            <p
              className="text-sm font-bold text-[#111] leading-[1.35] mb-[0.6rem] overflow-hidden"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
            >
              {product.name}
            </p>

            {/* Price row */}
            <div className="flex items-baseline gap-[7px] mb-[0.55rem]">
              <span className="text-[1.15rem] font-extrabold text-[#111]">₹{product.price}</span>
              <span className="text-xs text-[#ccc] line-through">₹{originalPrice}</span>
              <span className="text-[10.5px] font-bold text-[#1a7f4b] bg-[#edfaf4] rounded-full px-2 py-[2px] ml-auto">
                {discountPct}% off
              </span>
            </div>

            {/* Rating row */}
            <div className="flex items-center gap-[5px]">
              <Stars rating={rating} />
              <span className="text-[11px] text-[#bbb]">({ratingCount})</span>
            </div>

          </div>
        </div>
      </Link>
    </>
  );
}

export default ProductCard;