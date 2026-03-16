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
  { stars: "★★★★★", label: "5 stars", value: "5" },
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

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pl-root {
    min-height: 100vh;
    background: #f7f7f5;
    font-family: 'Syne', sans-serif;
    color: #111;
  }

  /* ── HERO ── */
  .pl-hero {
    padding: 4rem 3rem 3.5rem;
    position: relative;
    overflow: hidden;
    min-height: 320px;
    display: flex;
    align-items: center;
  }

  /* slideshow layers */
  .pl-hero-slide {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    transition: opacity 1.4s ease;
    z-index: 0;
  }

  /* dark gradient — heavy left so text stays readable */
  .pl-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(
      105deg,
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.65) 45%,
      rgba(0,0,0,0.25) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  /* subtle diagonal texture on top */
  .pl-hero-texture {
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px,
      transparent 1px, transparent 40px
    );
    z-index: 2;
    pointer-events: none;
  }

  .pl-hero-inner {
    position: relative;
    z-index: 3;
    max-width: 680px;
  }

  .pl-hero-tag {
    display: inline-flex; align-items: center; gap: 7px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 100px;
    padding: 5px 14px 5px 9px;
    font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.7);
    margin-bottom: 1.2rem;
    width: fit-content;
    background: rgba(255,255,255,0.07);
    backdrop-filter: blur(4px);
  }

  .pl-hero-tag-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

  .pl-hero-title {
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 800; color: #fff;
    line-height: 1.1; margin-bottom: 1rem;
    text-shadow: 0 2px 30px rgba(0,0,0,0.4);
  }
  .pl-hero-title em {
    font-family: 'Instrument Serif', serif;
    font-style: italic; font-weight: 400;
  }

  .pl-hero-tagline {
    font-size: 15px; color: rgba(255,255,255,0.5);
    font-weight: 400; margin-bottom: 2rem;
    max-width: 440px; line-height: 1.6;
  }

  .pl-hero-meta {
    display: flex; align-items: center;
    gap: 1.5rem; flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  .pl-hero-count { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.5); }
  .pl-hero-count strong { color: #fff; font-size: 15px; }

  .hero-divider { width: 1px; height: 20px; background: rgba(255,255,255,0.15); }

  .pl-hero-sort {
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
  .pl-hero-sort:hover { background: rgba(255,255,255,0.16); }
  .pl-hero-sort option { background: #1a1a2e; color: #f0f0f0; font-family: 'Syne', sans-serif; font-weight: 600; }

  /* dot indicators */
  .pl-hero-dots { display: flex; gap: 6px; }
  .pl-hero-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.25);
    border: none; cursor: pointer; padding: 0;
    transition: background 0.3s, width 0.3s;
  }
  .pl-hero-dot.on { width: 20px; border-radius: 3px; }

  /* ── TOOLBAR ── */
  .pl-toolbar {
    background: #fff;
    border-bottom: 1px solid #efefef;
    padding: 0.85rem 3rem;
    display: flex; align-items: center;
    gap: 10px; flex-wrap: wrap;
    position: sticky; top: 0; z-index: 9;
    box-shadow: 0 1px 10px rgba(0,0,0,0.04);
  }

  .toolbar-label {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #ccc; margin-right: 4px;
  }

  .filter-chip {
    display: inline-flex; align-items: center; gap: 5px;
    border: 1.5px solid #efefef; background: #fafafa;
    border-radius: 100px; padding: 5px 14px;
    font-size: 12px; font-weight: 600; color: #666;
    cursor: pointer; transition: all 0.15s;
    font-family: 'Syne', sans-serif; white-space: nowrap;
  }
  .filter-chip:hover { border-color: #ff2d6b; color: #ff2d6b; background: #fff0f4; }
  .filter-chip.active { background: #ff2d6b; border-color: #ff2d6b; color: #fff; }
  .filter-chip.active:hover { background: #e01f59; }
  .chip-x { font-size: 14px; line-height: 1; opacity: 0.7; }

  /* ── BODY ── */
  .pl-body {
    display: flex; gap: 2rem;
    padding: 2.5rem 3rem;
    align-items: flex-start;
    max-width: 1600px; margin: 0 auto;
  }

  /* ── SIDEBAR ── */
  .pl-sidebar {
    width: 220px; flex-shrink: 0; display: none;
    position: sticky; top: 57px;
  }
  @media (min-width: 1024px) { .pl-sidebar { display: block; } }

  .sb-widget {
    background: #fff; border: 1px solid #f0f0f0;
    border-radius: 18px; padding: 1.5rem; margin-bottom: 1rem;
  }
  .sb-widget-title {
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #ccc; margin-bottom: 1.1rem;
  }
  .sb-group { margin-bottom: 1.25rem; }
  .sb-group:last-child { margin-bottom: 0; }
  .sb-group-label { font-size: 12.5px; font-weight: 700; color: #333; margin-bottom: 0.6rem; display: block; }

  .sb-opt {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 10px; border-radius: 10px;
    font-size: 13px; color: #666; font-weight: 500;
    cursor: pointer; border: none; background: none;
    width: 100%; text-align: left;
    font-family: 'Syne', sans-serif;
    transition: all 0.15s; margin-bottom: 2px;
  }
  .sb-opt:hover { background: #fff0f4; color: #ff2d6b; }
  .sb-opt.on { background: #fff0f4; color: #ff2d6b; font-weight: 700; }

  .sb-check {
    width: 16px; height: 16px; border-radius: 5px;
    border: 1.5px solid #e0e0e0; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.15s; font-size: 9px; color: transparent;
  }
  .sb-opt.on .sb-check { background: #ff2d6b; border-color: #ff2d6b; color: #fff; }

  .sb-divider { height: 1px; background: #f5f5f5; margin: 1rem 0; }
  .sb-stars { color: #f5a623; font-size: 11px; letter-spacing: 1.5px; }

  /* ── MAIN ── */
  .pl-main { flex: 1; min-width: 0; }

  /* ── GRID ── */
  .pl-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem; animation: gridIn 0.35s both;
  }
  @media (min-width: 640px)  { .pl-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1280px) { .pl-grid { grid-template-columns: repeat(4, 1fr); } }
  @keyframes gridIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── SKELETON ── */
  .sk-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;
  }
  @media (min-width: 640px)  { .sk-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 1280px) { .sk-grid { grid-template-columns: repeat(4, 1fr); } }

  .sk-card { background: #fff; border-radius: 18px; overflow: hidden; border: 1px solid #f0f0f0; }
  .sk-pulse {
    background: linear-gradient(90deg, #f5f5f5 25%, #ebebeb 50%, #f5f5f5 75%);
    background-size: 200% 100%; animation: skShimmer 1.5s infinite;
  }
  @keyframes skShimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
  .sk-img-area { height: 220px; }
  .sk-body { padding: 1rem; }
  .sk-ln { border-radius: 6px; margin-bottom: 9px; }

  /* ── EMPTY / ERROR ── */
  .pl-state {
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 6rem 2rem; text-align: center;
  }
  .pl-state-icon { font-size: 3.5rem; margin-bottom: 1rem; }
  .pl-state-title { font-size: 1.2rem; font-weight: 700; color: #999; margin-bottom: 0.4rem; }
  .pl-state-sub { font-size: 13px; color: #ccc; line-height: 1.6; }
  .pl-state.err .pl-state-title { color: #c01f45; }
`;

/* ─────────────────────────────────────────
   SKELETON
───────────────────────────────────────── */
function Skeleton() {
  return (
    <div className="sk-grid">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="sk-card">
          <div className="sk-img-area sk-pulse" style={{ animationDelay: `${i * 0.07}s` }} />
          <div className="sk-body">
            <div className="sk-ln sk-pulse" style={{ height: 13, width: "68%" }} />
            <div className="sk-ln sk-pulse" style={{ height: 11, width: "44%" }} />
            <div className="sk-ln sk-pulse" style={{ height: 16, width: "52%", marginTop: 12 }} />
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
    <aside className="pl-sidebar">
      <div className="sb-widget">
        <p className="sb-widget-title">Refine</p>
        <div className="sb-group">
          <span className="sb-group-label">Price Range</span>
          {PRICE_OPTS.map(f => (
            <button
              key={f.value}
              className={`sb-opt${activePrice === f.value ? " on" : ""}`}
              onClick={() => setActivePrice(activePrice === f.value ? null : f.value)}
            >
              <span className="sb-check">✓</span>
              {f.label}
            </button>
          ))}
        </div>
        <div className="sb-divider" />
        <div className="sb-group">
          <span className="sb-group-label">Rating</span>
          {RATING_OPTS.map(f => (
            <button
              key={f.value}
              className={`sb-opt${activeRating === f.value ? " on" : ""}`}
              onClick={() => setActiveRating(activeRating === f.value ? null : f.value)}
            >
              <span className="sb-check">✓</span>
              <span className="sb-stars">{f.stars}</span>
              <span style={{ fontSize: 11, color: "inherit" }}>{f.label}</span>
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("");
  const [activePrice, setActivePrice] = useState(null);
  const [activeRating, setActiveRating] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get("search");
  const category = params.get("category");
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  // — fetch (original logic unchanged) —
  useEffect(() => {
    setLoading(true);
    setError(null);
    let url = `${BASEURL}/api/products/`;
    const queryParams = [];
    if (search && search.trim() !== "") queryParams.push(`search=${search}`);
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
  if (search) { heroTitle = "Results for "; heroTitleEm = `"${search}"`; }
  else if (category) { heroTitle = ""; heroTitleEm = category.charAt(0).toUpperCase() + category.slice(1); }
  else { heroTitle = "Explore "; heroTitleEm = "Everything"; }

  // — active chips —
  const activeChips = [];
  if (activePrice) activeChips.push({ label: PRICE_OPTS.find(f => f.value === activePrice)?.label, clear: () => setActivePrice(null) });
  if (activeRating) activeChips.push({ label: `${activeRating}★ & above`, clear: () => setActiveRating(null) });

  return (
    <>
      <style>{styles}</style>
      <div className="pl-root">

        {/* ── HERO BANNER ── */}
        <div className="pl-hero" style={{ background: meta.color }}>

          {/* background slideshow images */}
          {meta.images.map((img, i) => (
            <div
              key={i}
              className="pl-hero-slide"
              style={{
                backgroundImage: `url(${img})`,
                opacity: i === heroSlide ? 1 : 0,
              }}
            />
          ))}

          {/* overlay + texture */}
          <div className="pl-hero-overlay" />
          <div className="pl-hero-texture" />

          {/* content */}
          <div className="pl-hero-inner">
            <div className="pl-hero-tag">
              <span className="pl-hero-tag-dot" style={{ background: meta.accent }} />
              {tagLabel}
            </div>

            <h1 className="pl-hero-title">
              {heroTitle}<em style={{ color: meta.accent }}>{heroTitleEm}</em>
            </h1>

            <p className="pl-hero-tagline">{meta.tagline}</p>

            <div className="pl-hero-meta">
              {!loading && (
                <>
                  <span className="pl-hero-count">
                    <strong>{products.length}</strong> products found
                  </span>
                  <span className="hero-divider" />
                </>
              )}
              <select
                className="pl-hero-sort"
                value={sort}
                onChange={e => setSort(e.target.value)}
              >
                {SORT_OPTS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* dot indicators */}
            <div className="pl-hero-dots">
              {meta.images.map((_, i) => (
                <button
                  key={i}
                  className={"pl-hero-dot" + (i === heroSlide ? " on" : "")}
                  style={i === heroSlide ? { background: meta.accent } : {}}
                  onClick={() => setHeroSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── STICKY FILTER TOOLBAR ── */}
        <div className="pl-toolbar">
          <span className="toolbar-label">Filter</span>
          {PRICE_OPTS.map(f => (
            <button
              key={f.value}
              className={`filter-chip${activePrice === f.value ? " active" : ""}`}
              onClick={() => setActivePrice(activePrice === f.value ? null : f.value)}
            >
              {f.label}
              {activePrice === f.value && <span className="chip-x">×</span>}
            </button>
          ))}
          {RATING_OPTS.slice(0, 2).map(f => (
            <button
              key={f.value}
              className={`filter-chip${activeRating === f.value ? " active" : ""}`}
              onClick={() => setActiveRating(activeRating === f.value ? null : f.value)}
            >
              ★ {f.value}+
              {activeRating === f.value && <span className="chip-x">×</span>}
            </button>
          ))}
        </div>

        {/* ── BODY ── */}
        {error ? (
          <div className="pl-state err" style={{ padding: "5rem 3rem" }}>
            <div className="pl-state-icon">⚠️</div>
            <p className="pl-state-title">Something went wrong</p>
            <p className="pl-state-sub">{error}</p>
          </div>
        ) : (
          <div className="pl-body">
            <Sidebar
              activePrice={activePrice} setActivePrice={setActivePrice}
              activeRating={activeRating} setActiveRating={setActiveRating}
            />
            <div className="pl-main">
              {loading ? <Skeleton /> : products.length > 0 ? (
                <div className="pl-grid">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="pl-state">
                  <div className="pl-state-icon">🛍️</div>
                  <p className="pl-state-title">No products found</p>
                  <p className="pl-state-sub">Try adjusting your filters<br />or search for something else</p>
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