import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { clearTokens } from "../utils/auth";
import { getCategories } from "../utils/api";
import { useState, useRef, useEffect } from "react";
import { useLocation as useAppLocation } from "../context/LocationContext";
import LocationModal from "./LocationModal";

// Only keyframes + font import — can't be done with Tailwind utilities alone
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-drop-in { animation: dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both; }
  .font-syne { font-family: 'Syne', sans-serif; }
`;

function Navbar() {
  const { cartItems, refreshCartAuth, token } = useCart();
  const { wishlistItems } = useWishlist();
  const { location: userLocation } = useAppLocation();

  const wishlistCount = wishlistItems?.length || 0;

  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu]           = useState(false);
  const [categories, setCategories]       = useState([]);
  const [search, setSearch]               = useState("");
  const [openLocationModal, setOpenLocationModal] = useState(false);

  const menuRef = useRef(null);

  const params         = new URLSearchParams(location.search);
  const activeCategory = params.get("category");

  // LOAD CATEGORIES
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadCategories();
  }, []);

  // SEARCH DEBOUNCE
  useEffect(() => {
    const debounce = setTimeout(() => {
      const query = search.trim();
      const params = new URLSearchParams(location.search);
      const currentSearch = params.get("search") || "";
      if (query === "" && currentSearch !== "") navigate("/");
      if (query !== "" && query !== currentSearch)
        navigate(`/?search=${encodeURIComponent(query)}`);
    }, 400);
    return () => clearTimeout(debounce);
  }, [search, location.search, navigate]);

  // CART COUNT
  const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  // LOGOUT
  const handleLogout = () => {
    clearTokens();
    refreshCartAuth();
    navigate("/login");
  };

  // CLOSE ACCOUNT MENU
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // CATEGORY CLICK
  const handleCategoryClick = (slug) => {
    if (!slug) navigate("/");
    else navigate(`/?category=${slug}`);
  };

  return (
    <>
      <style>{keyframes}</style>

      <nav className="bg-white border-b border-[#f0f0f0] sticky top-0 z-50 font-syne shadow-[0_1px_20px_rgba(0,0,0,0.06)]">

        {/* ── TOP ROW ── */}
        <div className="flex items-center gap-6 px-10 h-[62px]">

          {/* LOGO */}
          <NavLink
            to="/"
            className="text-[1.45rem] font-extrabold text-[#ff2d6b] no-underline tracking-[-0.03em] flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            Vyn<span className="text-[#111]">tra</span>
          </NavLink>

          {/* SEARCH */}
          <div className="flex-1 max-w-[520px] relative group">
            <input
              type="text"
              className="w-full bg-[#f7f7f5] border-[1.5px] border-[#efefed] rounded-xl px-4 py-2.5 pr-11 font-syne text-[13.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#bbb] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,45,107,0.08)]"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#ccc] pointer-events-none transition-colors duration-200 group-focus-within:text-[#ff2d6b]">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-1 ml-auto flex-shrink-0">

            {/* LOCATION */}
            <button
              onClick={() => setOpenLocationModal(true)}
              className="hidden md:flex flex-col items-start gap-px px-3 py-[7px] rounded-[10px] border-none bg-transparent cursor-pointer font-syne transition-colors duration-150 hover:bg-[#f7f7f5]"
            >
              <span className="text-[9.5px] font-semibold text-[#bbb] tracking-[0.05em] uppercase leading-none">
                Deliver to
              </span>
              <span className="text-[12.5px] font-bold text-[#333] leading-[1.3] flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-[#ff2d6b]">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {userLocation ? userLocation.city : "Select Location"}
              </span>
            </button>

            {/* PROFILE */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => token ? setShowMenu(!showMenu) : navigate("/login")}
                className="flex flex-col items-center gap-0.5 px-3 py-[7px] rounded-[10px] border-none bg-transparent cursor-pointer font-syne transition-colors duration-150 hover:bg-[#f7f7f5] relative no-underline"
              >
                <span className="text-[17px] leading-none">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <span className="text-[10px] font-semibold text-[#888] tracking-[0.03em] leading-none">
                  {token ? "Profile" : "Login"}
                </span>
              </button>

              {/* Dropdown */}
              {showMenu && token && (
                <div className="animate-drop-in absolute top-[calc(100%+10px)] right-0 w-[220px] bg-white border border-[#f0f0f0] rounded-2xl p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-[100]">
                  <p className="text-[11px] font-semibold text-[#ccc] tracking-[0.07em] uppercase mb-3 pb-3 border-b border-[#f5f5f5]">
                    My Account
                  </p>

                  <NavLink
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-[9px] text-[13.5px] font-semibold text-[#444] no-underline transition-all duration-150 mb-0.5 hover:bg-[#f7f7f5] hover:text-[#ff2d6b]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                    </svg>
                    My Profile
                  </NavLink>

                  <NavLink
                    to="/orders"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-[9px] text-[13.5px] font-semibold text-[#444] no-underline transition-all duration-150 mb-0.5 hover:bg-[#f7f7f5] hover:text-[#ff2d6b]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    My Orders
                  </NavLink>

                  <div className="h-px bg-[#f5f5f5] my-2.5" />

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-[9px] text-[13.5px] font-bold text-[#e03a5a] bg-transparent border-none cursor-pointer font-syne w-full text-left transition-colors duration-150 hover:bg-[#fff0f3]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* WISHLIST */}
            <NavLink
              to="/wishlist"
              className="flex flex-col items-center gap-0.5 px-3 py-[7px] rounded-[10px] border-none bg-transparent cursor-pointer font-syne transition-colors duration-150 hover:bg-[#f7f7f5] relative no-underline"
            >
              <span className="text-[17px] leading-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </span>
              <span className="text-[10px] font-semibold text-[#888] tracking-[0.03em] leading-none">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-2 bg-[#ff2d6b] text-white text-[9px] font-extrabold min-w-4 h-4 rounded-full flex items-center justify-center px-1 border-2 border-white leading-none">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            {/* CART */}
            <NavLink
              to="/cart"
              className="flex flex-col items-center gap-0.5 px-3 py-[7px] rounded-[10px] border-none bg-transparent cursor-pointer font-syne transition-colors duration-150 hover:bg-[#f7f7f5] relative no-underline"
            >
              <span className="text-[17px] leading-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </span>
              <span className="text-[10px] font-semibold text-[#888] tracking-[0.03em] leading-none">Bag</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-2 bg-[#ff2d6b] text-white text-[9px] font-extrabold min-w-4 h-4 rounded-full flex items-center justify-center px-1 border-2 border-white leading-none">
                  {cartCount}
                </span>
              )}
            </NavLink>

          </div>
        </div>

        {/* ── CATEGORY BAR ── */}
        <div className="hidden md:flex items-center gap-1 px-10 h-[42px] border-t border-[#f7f7f5] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            onClick={() => handleCategoryClick("")}
            className={`inline-flex items-center px-3.5 py-[5px] rounded-full border-none font-syne text-xs font-bold tracking-[0.04em] cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-150
              ${!activeCategory
                ? "bg-[#ff2d6b] text-white"
                : "bg-transparent text-[#888] hover:bg-[#fff0f4] hover:text-[#ff2d6b]"
              }`}
          >
            ALL
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={`inline-flex items-center px-3.5 py-[5px] rounded-full border-none font-syne text-xs font-bold tracking-[0.04em] cursor-pointer whitespace-nowrap flex-shrink-0 transition-all duration-150
                ${activeCategory === cat.slug
                  ? "bg-[#ff2d6b] text-white"
                  : "bg-transparent text-[#888] hover:bg-[#fff0f4] hover:text-[#ff2d6b]"
                }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {openLocationModal && (
          <LocationModal close={() => setOpenLocationModal(false)} />
        )}
      </nav>
    </>
  );
}

export default Navbar;