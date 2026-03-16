import "../styles/profile.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .profile-page {
    min-height: 100vh;
    background: #f5f5f5;
    font-family: 'Inter', sans-serif;
    padding-bottom: 5rem;
  }

  /* ── HERO ── */
  .pf-hero {
    background: #111;
    padding: 3rem 4rem 2.5rem;
    position: relative;
  }
  .pf-hero::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px,
      transparent 1px, transparent 44px
    );
    pointer-events: none;
  }

  .pf-hero-inner {
    position: relative; z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.75rem;
    flex-wrap: nowrap;
  }

  /* avatar */
  .pf-avatar-wrap {
    position: relative; flex-shrink: 0;
  }

  .pf-avatar {
    width: 100px; height: 100px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff2d6b, #ff8fab);
    display: flex; align-items: center; justify-content: center;
    font-size: 2.4rem; font-weight: 800; color: #fff;
    border: 4px solid rgba(255,255,255,0.15);
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
    user-select: none;
  }

  .pf-hero-text {
    flex: 1; min-width: 0;
  }

  .pf-hero-tag {
    display: inline-flex; align-items: center; gap: 7px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 4px 13px 4px 9px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.07em; text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 0.75rem;
    background: rgba(255,255,255,0.05);
    width: fit-content;
  }
  .pf-hero-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #ff2d6b; animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .pf-hero-name {
    font-size: 2.4rem; font-weight: 800;
    color: #fff; letter-spacing: -0.03em;
    line-height: 1.1; margin-bottom: 0.4rem;
  }
  .pf-hero-name span { color: #ff2d6b; }

  .pf-hero-email {
    font-size: 14px; color: rgba(255,255,255,0.38);
    font-weight: 400;
  }

  /* ── BODY ── */
  .pf-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 2.5rem 2rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }
  @media (max-width: 680px) {
    .pf-body { grid-template-columns: 1fr; }
  }

  .pf-card-full { grid-column: 1 / -1; }

  /* ── CARD ── */
  .pf-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
    animation: cardIn 0.4s both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pf-card-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.5rem 1.75rem 1.25rem;
    border-bottom: 1px solid #f2f2f2;
  }

  .pf-card-title-row {
    display: flex; align-items: center; gap: 10px;
  }

  .pf-card-icon {
    width: 36px; height: 36px;
    background: #fff0f4;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .pf-card-title {
    font-size: 15px; font-weight: 700; color: #111;
  }

  .pf-card-body {
    padding: 1.5rem 1.75rem;
  }

  /* edit button */
  .pf-edit-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    background: #fff;
    border: 1.5px solid #e8e8e8;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; color: #555;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }
  .pf-edit-btn:hover {
    border-color: #ff2d6b; color: #ff2d6b; background: #fff0f4;
  }

  /* info rows */
  .pf-info-row {
    display: flex; align-items: center;
    gap: 1rem; padding: 0.9rem 0;
    border-bottom: 1px solid #f7f7f7;
  }
  .pf-info-row:last-child { border-bottom: none; }

  .pf-info-icon {
    width: 38px; height: 38px;
    background: #f7f7f7;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .pf-info-content { flex: 1; min-width: 0; }
  .pf-info-label {
    font-size: 11px; font-weight: 500;
    color: #bbb; text-transform: uppercase;
    letter-spacing: 0.06em; margin-bottom: 2px;
  }
  .pf-info-value {
    font-size: 15px; font-weight: 600; color: #111;
  }

  /* stats strip */
  .pf-stats {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0;
    border-bottom: 1px solid #f2f2f2;
  }
  .pf-stat {
    padding: 1.25rem 1.75rem;
    border-right: 1px solid #f2f2f2;
    text-align: center;
  }
  .pf-stat:last-child { border-right: none; }
  .pf-stat-val {
    font-size: 1.5rem; font-weight: 800; color: #111;
    letter-spacing: -0.03em; display: block; margin-bottom: 3px;
  }
  .pf-stat-lbl {
    font-size: 11.5px; color: #bbb; font-weight: 500;
  }

  /* empty state */
  .pf-empty {
    display: flex; flex-direction: column;
    align-items: center; padding: 2.5rem 1rem; text-align: center;
  }
  .pf-empty-icon {
    width: 52px; height: 52px; border-radius: 50%;
    background: #f7f7f7;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
  }
  .pf-empty-text { font-size: 14px; color: #bbb; font-weight: 500; }
  .pf-empty-sub  { font-size: 12.5px; color: #d0d0d0; margin-top: 3px; }

  /* add button */
  .pf-add-btn {
    display: inline-flex; align-items: center; gap: 7px;
    margin-top: 1.1rem;
    padding: 10px 20px;
    background: #fff;
    border: 1.5px solid #ffc5d3;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; color: #ff2d6b;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
  }
  .pf-add-btn:hover { background: #fff0f4; border-color: #ff2d6b; }
`;

function Profile() {
  const name = "Vishal Kumar";
  const initials = name.split(" ").map(w => w[0]).join("");

  return (
    <>
      <style>{styles}</style>
      <div className="profile-page">

        {/* ── HERO ── */}
        <div className="pf-hero">
          <div className="pf-hero-inner">
            <div className="pf-avatar-wrap">
              <div className="pf-avatar">{initials}</div>
            </div>
            <div className="pf-hero-text">
              <div className="pf-hero-tag">
                <span className="pf-hero-dot" />
                My Account
              </div>
              <h1 className="pf-hero-name">
                {name.split(" ")[0]} <span>{name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="pf-hero-email">vishal@gmail.com</p>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="pf-body">

          {/* PROFILE CARD */}
          <div className="pf-card pf-card-full" style={{ animationDelay: "0.05s" }}>
            {/* stats */}
            <div className="pf-stats">
              <div className="pf-stat">
                <span className="pf-stat-val">0</span>
                <span className="pf-stat-lbl">Orders</span>
              </div>
              <div className="pf-stat">
                <span className="pf-stat-val">0</span>
                <span className="pf-stat-lbl">Wishlist</span>
              </div>
              <div className="pf-stat">
                <span className="pf-stat-val">0</span>
                <span className="pf-stat-lbl">Addresses</span>
              </div>
            </div>

            <div className="pf-card-head">
              <div className="pf-card-title-row">
                <div className="pf-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <span className="pf-card-title">Personal Information</span>
              </div>
              <button className="pf-edit-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
                Edit Profile
              </button>
            </div>

            <div className="pf-card-body">
              <div className="pf-info-row">
                <div className="pf-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="pf-info-content">
                  <p className="pf-info-label">Full Name</p>
                  <p className="pf-info-value">Vishal Kumar</p>
                </div>
              </div>
              <div className="pf-info-row">
                <div className="pf-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="pf-info-content">
                  <p className="pf-info-label">Email</p>
                  <p className="pf-info-value">vishal@gmail.com</p>
                </div>
              </div>
              <div className="pf-info-row">
                <div className="pf-info-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.63 5a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/>
                  </svg>
                </div>
                <div className="pf-info-content">
                  <p className="pf-info-label">Phone</p>
                  <p className="pf-info-value">+91 XXXXXXXX</p>
                </div>
              </div>
            </div>
          </div>

          {/* RECENT ORDERS */}
          <div className="pf-card" style={{ animationDelay: "0.1s" }}>
            <div className="pf-card-head">
              <div className="pf-card-title-row">
                <div className="pf-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <span className="pf-card-title">Recent Orders</span>
              </div>
            </div>
            <div className="pf-card-body">
              <div className="pf-empty">
                <div className="pf-empty-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <p className="pf-empty-text">No recent orders yet</p>
                <p className="pf-empty-sub">Your orders will appear here</p>
              </div>
            </div>
          </div>

          {/* SAVED ADDRESS */}
          <div className="pf-card" style={{ animationDelay: "0.15s" }}>
            <div className="pf-card-head">
              <div className="pf-card-title-row">
                <div className="pf-card-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <span className="pf-card-title">Saved Address</span>
              </div>
            </div>
            <div className="pf-card-body">
              <div className="pf-empty">
                <div className="pf-empty-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p className="pf-empty-text">No address added</p>
                <p className="pf-empty-sub">Add a delivery address</p>
                <button className="pf-add-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Add Address
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Profile;