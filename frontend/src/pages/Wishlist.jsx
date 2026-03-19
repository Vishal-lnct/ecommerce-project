import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { getAccessToken } from "../utils/auth";

console.log("TOKEN:", getAccessToken());

// Only keyframes + font import — can't be expressed with Tailwind utilities alone
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }

  .animate-pulse-dot { animation: pulse 2s infinite; }
  .font-inter { font-family: 'Inter', sans-serif; }

  /* Card image scale on parent hover — child transform on parent:hover
     can't be done cleanly with Tailwind group-hover + custom cubic-bezier */
  .wl-card:hover .wl-img { transform: scale(1.06); }
`;

function Wishlist() {
  const navigate = useNavigate();
  const { wishlistItems, fetchWishlist, removeFromWishlist } = useWishlist();

  // ── original logic unchanged ──
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { navigate("/login"); return; }
    fetchWishlist();
  }, [navigate]);

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
              My Account
            </div>

            <h1 className="text-[3rem] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-2">
              My <span className="text-[#ff2d6b]">Wishlist</span>
            </h1>

            <p className="text-sm text-white/35 font-normal">
              {wishlistItems.length > 0
                ? `${wishlistItems.length} item${wishlistItems.length !== 1 ? "s" : ""} saved`
                : "Items you love, all in one place"}
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-[1300px] mx-auto px-10 pt-10">
          {wishlistItems.length === 0 ? (

            /* Empty state */
            <div className="flex flex-col items-center py-28 px-8 text-center">
              <div className="w-[88px] h-[88px] rounded-full bg-[#fff0f4] flex items-center justify-center mb-6 text-4xl">
                ❤️
              </div>
              <p className="text-[1.3rem] font-bold text-[#444] mb-2">Your wishlist is empty</p>
              <p className="text-[15px] text-[#aaa] leading-[1.7]">
                Save items you love and<br />find them here anytime.
              </p>
            </div>

          ) : (

            /* Grid */
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="wl-card bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden relative transition-all duration-[250ms] hover:-translate-y-[5px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
                  style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                >
                  {/* Image */}
                  <div className="overflow-hidden bg-[#f7f7f5] relative" style={{ aspectRatio: "4/5" }}>
                    <img
                      className="wl-img w-full h-full object-cover block transition-transform duration-500"
                      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
                      src={item.product.image}
                      alt={item.product.name}
                      onError={(e) => { e.target.src = "https://picsum.photos/400"; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="px-[1.1rem] pt-4 pb-[1.1rem]">
                    <p className="text-sm font-semibold text-[#111] mb-1.5 truncate">
                      {item.product.name}
                    </p>

                    <div className="flex items-center justify-between gap-2 mb-[0.85rem]">
                      <span className="text-[1.05rem] font-extrabold text-[#111] tracking-[-0.02em]">
                        ₹{item.product.price}
                      </span>
                      <span className="text-xs text-[#ccc] line-through font-normal">
                        ₹{Math.round(item.product.price * 1.2)}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromWishlist(item.product.id)}
                      className="w-full py-2.5 bg-white border-[1.5px] border-[#ffc5d3] rounded-[10px] font-inter text-[13px] font-semibold text-[#ff2d6b] cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-150 hover:bg-[#fff0f4] hover:border-[#ff2d6b]"
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