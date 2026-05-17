import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

/* ─────────────────────────────────────────
   CATEGORY META — colors, accents, taglines, images
───────────────────────────────────────── */
const CATEGORY_META = {
  accessories: {
    color: "#1a1a2e", accent: "#e8b86d",
    tagline: "Complete your look with the finest details.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1600&q=80",
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=1600&q=80",
    ],
  },
  clothing: {
    color: "#0f2027", accent: "#ff6b9d",
    tagline: "Wear what makes you feel unstoppable.",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1600&q=80",
      "https://images.unsplash.com/photo-1503602642458-232111445657?w=1600&q=80",
    ],
  },
  shoes: {
    color: "#1b1b2f", accent: "#7ec8e3",
    tagline: "Every step, a statement.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=1600&q=80",
    ],
  },
  electronics: {
    color: "#0d1b2a", accent: "#50fa7b",
    tagline: "Tech that keeps up with your world.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=80",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=1600&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80",
    ],
  },
  beauty: {
    color: "#2d1b35", accent: "#f9a8d4",
    tagline: "Beauty in every detail.",
    images: [
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1600&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80",
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80",
    ],
  },
  default: {
    color: "#111827", accent: "#ff2d6b",
    tagline: "Explore our entire collection.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&q=80",
    ],
  },
};

const PRICE_OPTS = [
  { label: "Under ₹1,000",      value: "lt1k" },
  { label: "₹1,000 – ₹5,000",  value: "1k5k" },
  { label: "₹5,000 – ₹15,000", value: "5k15k" },
  { label: "₹15,000+",          value: "gt15k" },
];

const RATING_OPTS = [
  { stars: "★★★★★", label: "5 stars",   value: "5" },
  { stars: "★★★★",  label: "4 & above", value: "4" },
  { stars: "★★★",   label: "3 & above", value: "3" },
];

const SORT_OPTS = [
  { label: "Relevance",         value: "" },
  { label: "Price: Low → High", value: "price_asc" },
  { label: "Price: High → Low", value: "price_desc" },
  { label: "Newest First",      value: "newest" },
  { label: "Top Rated",         value: "rating" },
];

// Only keyframes that Tailwind can't express without custom config
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

  @keyframes gridIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes skShimmer {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }

  .animate-grid-in  { animation: gridIn 0.35s both; }
  .animate-sk-pulse {
    background: linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%);
    background-size: 200% 100%;
    animation: skShimmer 1.5s infinite;
  }

  .font-syne       { font-family: 'Syne', sans-serif; }
  .font-instrument { font-family: 'Instrument Serif', serif; }

  /* hero sort select — custom arrow + glassmorphism hard to replicate with Tailwind alone */
  .hero-sort {
    appearance: none;
    background: rgba(255,255,255,0.1) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E") no-repeat right 12px center;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 10px;
    padding: 8px 34px 8px 13px;
    font-family: 'Syne', sans-serif;
    font-size: 12.5px; font-weight: 600;
    color: rgba(255,255,255,0.85);
    cursor: pointer; outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .hero-sort:hover { background-color: rgba(255,255,255,0.16); }
  .hero-sort option { background: #1a1a2e; color: #f0f0f0; font-family: 'Syne', sans-serif; font-weight: 600; }
`;

/* ─────────────────────────────────────────
   SKELETON
───────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-[18px] overflow-hidden border border-[#f0f0f0]">
          <div
            className="h-[220px] animate-sk-pulse"
            style={{ animationDelay: `${i * 0.07}s` }}
          />
          <div className="p-4">
            <div className="animate-sk-pulse rounded-md mb-2.5" style={{ height: 13, width: "68%" }} />
            <div className="animate-sk-pulse rounded-md mb-2.5" style={{ height: 11, width: "44%" }} />
            <div className="animate-sk-pulse rounded-md mt-3"   style={{ height: 16, width: "52%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────── */
function Sidebar({ activePrice, setActivePrice, activeRating, setActiveRating }) {
  return (
    <aside className="hidden lg:block w-[220px] flex-shrink-0 sticky top-[57px]">
      <div className="bg-white border border-[#f0f0f0] rounded-[18px] p-6 mb-4">
        <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#ccc] mb-[1.1rem]">
          Refine
        </p>

        {/* Price Range */}
        <div className="mb-5">
          <span className="block text-[12.5px] font-bold text-[#333] mb-2.5">Price Range</span>
          {PRICE_OPTS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActivePrice(activePrice === f.value ? null : f.value)}
              className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-[10px] text-[13px] font-medium font-syne text-left transition-all duration-150 mb-0.5
                ${activePrice === f.value
                  ? "bg-[#fff0f4] text-[#ff2d6b] font-bold"
                  : "text-[#666] hover:bg-[#fff0f4] hover:text-[#ff2d6b]"
                }`}
            >
              <span className={`w-4 h-4 rounded-[5px] border-[1.5px] flex-shrink-0 flex items-center justify-center text-[9px] transition-all duration-150
                ${activePrice === f.value
                  ? "bg-[#ff2d6b] border-[#ff2d6b] text-white"
                  : "border-[#e0e0e0] text-transparent"
                }`}>
                ✓
              </span>
              {f.label}
            </button>
          ))}
        </div>

        <div className="h-px bg-[#f5f5f5] my-4" />

        {/* Rating */}
        <div>
          <span className="block text-[12.5px] font-bold text-[#333] mb-2.5">Rating</span>
          {RATING_OPTS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveRating(activeRating === f.value ? null : f.value)}
              className={`flex items-center gap-2 w-full px-2.5 py-2 rounded-[10px] text-[13px] font-medium font-syne text-left transition-all duration-150 mb-0.5
                ${activeRating === f.value
                  ? "bg-[#fff0f4] text-[#ff2d6b] font-bold"
                  : "text-[#666] hover:bg-[#fff0f4] hover:text-[#ff2d6b]"
                }`}
            >
              <span className={`w-4 h-4 rounded-[5px] border-[1.5px] flex-shrink-0 flex items-center justify-center text-[9px] transition-all duration-150
                ${activeRating === f.value
                  ? "bg-[#ff2d6b] border-[#ff2d6b] text-white"
                  : "border-[#e0e0e0] text-transparent"
                }`}>
                ✓
              </span>
              <span className="text-[#f5a623] text-[11px] tracking-[1.5px]">{f.stars}</span>
              <span className="text-[11px]">{f.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function ProductList() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [sort, setSort]             = useState("");
  const [activePrice, setActivePrice]   = useState(null);
  const [activeRating, setActiveRating] = useState(null);
  const [heroSlide, setHeroSlide]   = useState(0);

  const location = useLocation();
  const params   = new URLSearchParams(location.search);
  const search   = params.get("search");
  const category = params.get("category");
  const BASEURL  = import.meta.env.VITE_DJANGO_BASE_URL;

  // — fetch (original logic unchanged) —
  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `${BASEURL}/api/products/`;
    const queryParams = [];
    if (search   && search.trim()   !== "") queryParams.push(`search=${search}`);
    if (category && category.trim() !== "") queryParams.push(`category=${category}`);
    if (queryParams.length > 0) url += `?${queryParams.join("&")}`;
    fetch(url)
      .then(res => { if (!res.ok) throw new Error("Failed to fetch products"); return res.json(); })
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [search, category]);

  // — hero slideshow: reset + auto-advance on category change —
  const meta = CATEGORY_META[category?.toLowerCase()] || CATEGORY_META.default;

  useEffect(() => {
    setHeroSlide(0);
    if (meta.images.length < 2) return;
    const id = setInterval(() => setHeroSlide(p => (p + 1) % meta.images.length), 4000);
    return () => clearInterval(id);
  }, [category]);

  // — derive labels —
  const tagLabel = category ? category.toUpperCase() : search ? "SEARCH RESULTS" : "ALL PRODUCTS";
  let heroTitle, heroTitleEm;
  if (search)        { heroTitle = "Results for "; heroTitleEm = `"${search}"`; }
  else if (category) { heroTitle = ""; heroTitleEm = category.charAt(0).toUpperCase() + category.slice(1); }
  else               { heroTitle = "Explore ";     heroTitleEm = "Everything"; }


  // ─────────────────────────────────────────
// FILTER + SORT LOGIC
// ADD THIS BEFORE return (
// ─────────────────────────────────────────

let filteredProducts = [...products];

// PRICE FILTER
filteredProducts = filteredProducts.filter((product) => {

  if (activePrice === "lt1k") {
    return product.price < 1000;
  }

  if (activePrice === "1k5k") {
    return product.price >= 1000 && product.price <= 5000;
  }

  if (activePrice === "5k15k") {
    return product.price >= 5000 && product.price <= 15000;
  }

  if (activePrice === "gt15k") {
    return product.price > 15000;
  }

  return true;
});

// RATING FILTER
// RATING FILTER
filteredProducts = filteredProducts.filter((product) => {

  const rating = Number(product.rating || 0);

  if (activeRating === "5") {
    return rating >= 5;
  }

  if (activeRating === "4") {
    return rating >= 4;
  }

  if (activeRating === "3") {
    return rating >= 3;
  }

  return true;
});

// SORTING
if (sort === "price_asc") {
  filteredProducts.sort((a, b) => a.price - b.price);
}

if (sort === "price_desc") {
  filteredProducts.sort((a, b) => b.price - a.price);
}

if (sort === "rating") {
  filteredProducts.sort((a, b) => b.rating - a.rating);
}

if (sort === "newest") {
  filteredProducts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );
}

  return (
    <>
      <style>{keyframes}</style>

      <div className="min-h-screen bg-[#f7f7f5] font-syne text-[#111]">

        {/* ── HERO BANNER ── */}
        <div
          className="relative overflow-hidden min-h-[320px] flex items-center px-12 py-16 pb-14"
          style={{ background: meta.color }}
        >
          {/* Background slideshow images */}
          {meta.images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1400ms] z-0"
              style={{ backgroundImage: `url(${img})`, opacity: i === heroSlide ? 1 : 0 }}
            />
          ))}

          {/* Dark overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.25) 100%)",
            }}
          />

          {/* Diagonal texture */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 40px)",
            }}
          />

          {/* Content */}
          <div className="relative z-30 max-w-[680px]">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 border border-white/20 rounded-full px-[14px] py-[5px] pl-[9px] text-[10.5px] font-bold tracking-[0.1em] uppercase text-white/70 mb-5 w-fit bg-white/[0.07] backdrop-blur-sm">
              <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: meta.accent }} />
              {tagLabel}
            </div>

            {/* Title */}
            <h1
              className="font-extrabold text-white leading-[1.1] mb-4 tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}
            >
              {heroTitle}
              <em className="font-instrument italic font-normal not-italic" style={{ color: meta.accent, fontStyle: "italic" }}>
                {heroTitleEm}
              </em>
            </h1>

            {/* Tagline */}
            <p className="text-[15px] text-white/50 font-normal mb-8 max-w-[440px] leading-relaxed">
              {meta.tagline}
            </p>

            {/* Meta row */}
            <div className="flex items-center gap-6 flex-wrap mb-6">
              {!loading && (
                <>
                  <span className="text-[13px] font-semibold text-white/50">
                    <strong className="text-white text-[15px]">{filteredProducts.length}</strong> products found
                  </span>
                  <span className="w-px h-5 bg-white/15" />
                </>
              )}
              <select
                className="hero-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {SORT_OPTS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Slide dots */}
            <div className="flex gap-1.5">
              {meta.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroSlide(i)}
                  className={`h-1.5 rounded-full border-none cursor-pointer p-0 transition-all duration-300 ${
                    i === heroSlide ? "w-5 rounded-sm" : "w-1.5 bg-white/25"
                  }`}
                  style={i === heroSlide ? { background: meta.accent } : {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── STICKY FILTER TOOLBAR ── */}
        <div className="bg-white border-b border-[#efefef] px-12 py-[0.85rem] flex items-center gap-2.5 flex-wrap sticky top-0 z-[9] shadow-[0_1px_10px_rgba(0,0,0,0.04)]">
          <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#ccc] mr-1">
            Filter
          </span>

          {PRICE_OPTS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActivePrice(activePrice === f.value ? null : f.value)}
              className={`inline-flex items-center gap-1 border-[1.5px] rounded-full px-3.5 py-[5px] text-xs font-semibold font-syne whitespace-nowrap cursor-pointer transition-all duration-150
                ${activePrice === f.value
                  ? "bg-[#ff2d6b] border-[#ff2d6b] text-white hover:bg-[#e01f59]"
                  : "border-[#efefef] bg-[#fafafa] text-[#666] hover:border-[#ff2d6b] hover:text-[#ff2d6b] hover:bg-[#fff0f4]"
                }`}
            >
              {f.label}
              {activePrice === f.value && <span className="text-sm leading-none opacity-70">×</span>}
            </button>
          ))}

          {RATING_OPTS.slice(0, 2).map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveRating(activeRating === f.value ? null : f.value)}
              className={`inline-flex items-center gap-1 border-[1.5px] rounded-full px-3.5 py-[5px] text-xs font-semibold font-syne whitespace-nowrap cursor-pointer transition-all duration-150
                ${activeRating === f.value
                  ? "bg-[#ff2d6b] border-[#ff2d6b] text-white hover:bg-[#e01f59]"
                  : "border-[#efefef] bg-[#fafafa] text-[#666] hover:border-[#ff2d6b] hover:text-[#ff2d6b] hover:bg-[#fff0f4]"
                }`}
            >
              ★ {f.value}+
              {activeRating === f.value && <span className="text-sm leading-none opacity-70">×</span>}
            </button>
          ))}
        </div>

        {/* ── BODY ── */}
        {error ? (
          <div className="flex flex-col items-center justify-center px-12 py-20 text-center">
            <div className="text-[3.5rem] mb-4">⚠️</div>
            <p className="text-[1.2rem] font-bold text-[#c01f45] mb-1">Something went wrong</p>
            <p className="text-[13px] text-[#ccc] leading-relaxed">{error}</p>
          </div>
        ) : (
          <div className="flex gap-8 px-12 py-10 items-start max-w-[1600px] mx-auto">
            <Sidebar
              activePrice={activePrice}   setActivePrice={setActivePrice}
              activeRating={activeRating} setActiveRating={setActiveRating}
            />

            <div className="flex-1 min-w-0">
   {loading ? (
  <Skeleton />
) : filteredProducts.length > 0 ? (

  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 animate-grid-in">
    {filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
      />
    ))}
  </div>

) : (

  <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
    <div className="text-[3.5rem] mb-4">🛍️</div>

    <p className="text-[1.2rem] font-bold text-[#999] mb-1">
      No products found
    </p>

    <p className="text-[13px] text-[#ccc] leading-relaxed">
      Try adjusting your filters
      <br />
      or search for something else
    </p>
  </div>

)}

               
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default ProductList;