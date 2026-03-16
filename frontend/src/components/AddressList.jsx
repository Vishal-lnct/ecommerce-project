const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .al-wrap { font-family: 'Inter', sans-serif; }

  /* ── HEADER ── */
  .al-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .al-title {
    font-size: 16px; font-weight: 700; color: #111;
  }

  .al-add-btn {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px;
    background: #fff;
    border: 1.5px solid #ffc5d3;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600; color: #ff2d6b;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.15s;
  }
  .al-add-btn:hover {
    background: #fff0f4; border-color: #ff2d6b;
    transform: translateY(-1px);
  }

  /* ── LOADING ── */
  .al-loading {
    display: flex; flex-direction: column;
    align-items: center; padding: 3rem 1rem; text-align: center;
    gap: 12px;
  }
  .al-spinner {
    width: 32px; height: 32px;
    border: 3px solid rgba(255,45,107,0.15);
    border-top-color: #ff2d6b;
    border-radius: 50%;
    animation: alSpin 0.7s linear infinite;
  }
  @keyframes alSpin { to { transform: rotate(360deg); } }
  .al-loading-text { font-size: 13px; color: #ccc; font-weight: 500; }

  /* ── EMPTY ── */
  .al-empty {
    display: flex; flex-direction: column;
    align-items: center; padding: 3rem 1rem; text-align: center;
  }
  .al-empty-icon {
    width: 64px; height: 64px; border-radius: 50%;
    background: #fff0f4;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
  }
  .al-empty-title { font-size: 15px; font-weight: 600; color: #555; margin-bottom: 4px; }
  .al-empty-sub   { font-size: 13px; color: #bbb; }

  /* ── ADDRESS CARD ── */
  .al-card {
    background: #fff;
    border: 1.5px solid #f0f0f0;
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
    position: relative;
    overflow: hidden;
    animation: alCardIn 0.3s both;
  }
  @keyframes alCardIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .al-card:hover {
    border-color: #ffc5d3;
    box-shadow: 0 4px 20px rgba(255,45,107,0.08);
    transform: translateY(-2px);
  }

  .al-card::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: #ff2d6b;
    border-radius: 3px 0 0 3px;
    opacity: 0; transition: opacity 0.2s;
  }
  .al-card:hover::before { opacity: 1; }

  .al-card-top {
    display: flex; align-items: flex-start;
    justify-content: space-between; gap: 12px;
    margin-bottom: 0.6rem;
  }

  .al-card-name {
    font-size: 15px; font-weight: 700; color: #111;
  }

  .al-type-badge {
    display: inline-flex; align-items: center; gap: 5px;
    background: #f7f7f5;
    border: 1px solid #efefef;
    border-radius: 100px;
    padding: 3px 10px;
    font-size: 11px; font-weight: 600;
    color: #888; text-transform: capitalize;
    flex-shrink: 0;
  }
  .al-type-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: #ff2d6b;
  }

  .al-card-address {
    font-size: 13.5px; color: #666; font-weight: 400;
    line-height: 1.6; margin-bottom: 1rem;
  }

  .al-deliver-btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
  }
  .al-deliver-btn:hover {
    background: #e01f59;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255,45,107,0.3);
  }
  .al-deliver-btn:active { transform: scale(0.98); }
`;

// safe list — handles undefined, null, non-array gracefully
function safeList(arr) {
  return Array.isArray(arr) ? arr : [];
}

function AddressList({ addresses, setShowForm }) {
  const list = safeList(addresses);

  // still loading (undefined = not yet fetched, null = fetch failed)
  if (addresses === undefined) {
    return (
      <>
        <style>{styles}</style>
        <div className="al-wrap">
          <div className="al-loading">
            <div className="al-spinner" />
            <p className="al-loading-text">Loading addresses…</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="al-wrap">

        {/* HEADER */}
        <div className="al-header">
          <h3 className="al-title">Saved Addresses</h3>
          <button className="al-add-btn" onClick={() => setShowForm(true)}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New
          </button>
        </div>

        {/* ADDRESS LIST */}
        {list.length === 0 ? (
          <div className="al-empty">
            <div className="al-empty-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <p className="al-empty-title">No addresses saved yet</p>
            <p className="al-empty-sub">Add a delivery address to get started</p>
          </div>
        ) : (
          list.map((a, idx) => (
            <div
              key={a.id ?? idx}
              className="al-card"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              <div className="al-card-top">
                <span className="al-card-name">{a.name}</span>
                {a.address_type && (
                  <span className="al-type-badge">
                    <span className="al-type-dot" />
                    {a.address_type}
                  </span>
                )}
              </div>

              <p className="al-card-address">
                {[a.house, a.area, a.city, a.pincode].filter(Boolean).join(", ")}
              </p>

              <button className="al-deliver-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                Deliver to this address
              </button>
            </div>
          ))
        )}

      </div>
    </>
  );
}

export default AddressList;