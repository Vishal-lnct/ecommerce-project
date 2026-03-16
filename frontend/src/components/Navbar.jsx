import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { clearTokens } from "../utils/auth";
import { getCategories } from "../utils/api";
import { useState, useRef, useEffect } from "react";
import { useLocation as useAppLocation } from "../context/LocationContext";
import LocationModal from "./LocationModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

  .nb-root {
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    position: sticky;
    top: 0;
    z-index: 50;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 1px 20px rgba(0,0,0,0.06);
  }

  /* ── TOP ROW ── */
  .nb-top {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0 2.5rem;
    height: 62px;
  }

  /* logo */
  .nb-logo {
    font-size: 1.45rem;
    font-weight: 800;
    color: #ff2d6b;
    text-decoration: none;
    letter-spacing: -0.03em;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .nb-logo:hover { opacity: 0.8; }
  .nb-logo span { color: #111; }

  /* search */
  .nb-search-wrap {
    flex: 1;
    max-width: 520px;
    position: relative;
  }

  .nb-search {
    width: 100%;
    background: #f7f7f5;
    border: 1.5px solid #efefed;
    border-radius: 12px;
    padding: 10px 44px 10px 16px;
    font-family: 'Syne', sans-serif;
    font-size: 13.5px;
    color: #111;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  }
  .nb-search::placeholder { color: #bbb; }
  .nb-search:focus {
    border-color: #ff2d6b;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(255,45,107,0.08);
  }

  .nb-search-icon {
    position: absolute;
    right: 13px; top: 50%;
    transform: translateY(-50%);
    color: #ccc;
    font-size: 15px;
    pointer-events: none;
    transition: color 0.2s;
  }
  .nb-search-wrap:focus-within .nb-search-icon { color: #ff2d6b; }

  /* right actions */
  .nb-actions {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-left: auto;
    flex-shrink: 0;
  }

  .nb-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 7px 12px;
    border-radius: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    transition: background 0.15s;
    text-decoration: none;
    position: relative;
  }
  .nb-action-btn:hover { background: #f7f7f5; }

  .nb-action-icon {
    font-size: 17px;
    line-height: 1;
  }

  .nb-action-label {
    font-size: 10px;
    font-weight: 600;
    color: #888;
    letter-spacing: 0.03em;
    line-height: 1;
  }

  .nb-badge {
    position: absolute;
    top: 4px; right: 8px;
    background: #ff2d6b;
    color: #fff;
    font-size: 9px;
    font-weight: 800;
    min-width: 16px; height: 16px;
    border-radius: 100px;
    display: flex; align-items: center; justify-content: center;
    padding: 0 4px;
    border: 2px solid #fff;
    line-height: 1;
  }

  /* location btn */
  .nb-location-btn {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    padding: 7px 12px;
    border-radius: 10px;
    border: none;
    background: none;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    transition: background 0.15s;
  }
  @media (min-width: 900px) { .nb-location-btn { display: flex; } }
  .nb-location-btn:hover { background: #f7f7f5; }

  .nb-location-top {
    font-size: 9.5px;
    font-weight: 600;
    color: #bbb;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
  }
  .nb-location-city {
    font-size: 12.5px;
    font-weight: 700;
    color: #333;
    line-height: 1.3;
    display: flex; align-items: center; gap: 4px;
  }
  .nb-location-city svg { color: #ff2d6b; }

  /* profile dropdown */
  .nb-profile-wrap { position: relative; }

  .nb-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 220px;
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 16px;
    padding: 1rem;
    box-shadow: 0 8px 40px rgba(0,0,0,0.12);
    animation: dropIn 0.2s cubic-bezier(0.16,1,0.3,1) both;
    z-index: 100;
  }

  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .nb-dropdown-welcome {
    font-size: 11px;
    font-weight: 600;
    color: #ccc;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid #f5f5f5;
  }

  .nb-dropdown-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 600;
    color: #444;
    text-decoration: none;
    transition: background 0.15s, color 0.15s;
    margin-bottom: 2px;
  }
  .nb-dropdown-link:hover { background: #f7f7f5; color: #ff2d6b; }

  .nb-dropdown-divider {
    height: 1px;
    background: #f5f5f5;
    margin: 0.6rem 0;
  }

  .nb-logout-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    border-radius: 9px;
    font-size: 13.5px;
    font-weight: 700;
    color: #e03a5a;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
    width: 100%;
    text-align: left;
    transition: background 0.15s;
  }
  .nb-logout-btn:hover { background: #fff0f3; }

  /* ── CATEGORY BAR ── */
  .nb-cats {
    display: none;
    align-items: center;
    gap: 0.25rem;
    padding: 0 2.5rem;
    height: 42px;
    border-top: 1px solid #f7f7f5;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .nb-cats::-webkit-scrollbar { display: none; }
  @media (min-width: 768px) { .nb-cats { display: flex; } }

  .nb-cat-btn {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    border-radius: 100px;
    border: none;
    background: none;
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    color: #888;
    letter-spacing: 0.04em;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, color 0.15s;
    flex-shrink: 0;
  }
  .nb-cat-btn:hover { background: #fff0f4; color: #ff2d6b; }
  .nb-cat-btn.active {
    background: #ff2d6b;
    color: #fff;
  }
`;

function Navbar() {
  const { cartItems, refreshCartAuth, token } = useCart();
  const { wishlistItems } = useWishlist();
  const { location: userLocation } = useAppLocation();

  const wishlistCount = wishlistItems?.length || 0;

  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [openLocationModal, setOpenLocationModal] = useState(false);

  const menuRef = useRef(null);

  const params = new URLSearchParams(location.search);
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
      <style>{styles}</style>
      <nav className="nb-root">

        {/* ── TOP ROW ── */}
        <div className="nb-top">

          {/* LOGO */}
          <NavLink to="/" className="nb-logo">
            Vyn<span>tra</span>
          </NavLink>

          {/* SEARCH */}
          <div className="nb-search-wrap">
            <input
              type="text"
              className="nb-search"
              placeholder="Search for products, brands and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="nb-search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </span>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="nb-actions">

            {/* LOCATION */}
            <button
              className="nb-location-btn"
              onClick={() => setOpenLocationModal(true)}
            >
              <span className="nb-location-top">Deliver to</span>
              <span className="nb-location-city">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {userLocation ? userLocation.city : "Select Location"}
              </span>
            </button>

            {/* PROFILE */}
            <div className="nb-profile-wrap" ref={menuRef}>
              <button
                className="nb-action-btn"
                onClick={() => token ? setShowMenu(!showMenu) : navigate("/login")}
              >
                <span className="nb-action-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </span>
                <span className="nb-action-label">{token ? "Profile" : "Login"}</span>
              </button>

              {showMenu && token && (
                <div className="nb-dropdown">
                  <p className="nb-dropdown-welcome">My Account</p>
                  <NavLink to="/profile" className="nb-dropdown-link" onClick={() => setShowMenu(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    My Profile
                  </NavLink>
                  <NavLink to="/orders" className="nb-dropdown-link" onClick={() => setShowMenu(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    My Orders
                  </NavLink>
                  <div className="nb-dropdown-divider" />
                  <button className="nb-logout-btn" onClick={handleLogout}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* WISHLIST */}
            <NavLink to="/wishlist" className="nb-action-btn">
              <span className="nb-action-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </span>
              <span className="nb-action-label">Wishlist</span>
              {wishlistCount > 0 && <span className="nb-badge">{wishlistCount}</span>}
            </NavLink>

            {/* CART */}
            <NavLink to="/cart" className="nb-action-btn">
              <span className="nb-action-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </span>
              <span className="nb-action-label">Bag</span>
              {cartCount > 0 && <span className="nb-badge">{cartCount}</span>}
            </NavLink>

          </div>
        </div>

        {/* ── CATEGORY BAR ── */}
        <div className="nb-cats">
          <button
            className={`nb-cat-btn${!activeCategory ? " active" : ""}`}
            onClick={() => handleCategoryClick("")}
          >
            ALL
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`nb-cat-btn${activeCategory === cat.slug ? " active" : ""}`}
              onClick={() => handleCategoryClick(cat.slug)}
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