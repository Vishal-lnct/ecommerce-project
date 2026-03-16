import { useEffect, useState } from "react";
import AddressList from "./AddressList";
import AddAddressForm from "./AddAddressForm";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .lm-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(4px);
    display: flex; align-items: center; justify-content: center;
    z-index: 50;
    padding: 1rem;
    animation: backdropIn 0.2s ease both;
  }
  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .lm-modal {
    background: #fff;
    width: 100%;
    max-width: 620px;
    max-height: 90vh;
    border-radius: 22px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.22);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: 'Inter', sans-serif;
    animation: modalIn 0.25s cubic-bezier(0.16,1,0.3,1) both;
  }
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* ── MODAL HEADER ── */
  .lm-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.4rem 1.75rem 1.25rem;
    border-bottom: 1px solid #f2f2f2;
    flex-shrink: 0;
  }

  .lm-header-title {
    font-size: 17px; font-weight: 800; color: #111;
    letter-spacing: -0.02em;
  }

  .lm-close {
    width: 32px; height: 32px;
    background: #f5f5f5; border: none;
    border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background 0.15s, transform 0.15s;
    color: #888;
  }
  .lm-close:hover { background: #fff0f4; color: #ff2d6b; transform: scale(1.08); }

  /* ── SEARCH ── */
  .lm-search-wrap {
    padding: 1.1rem 1.75rem 0;
    flex-shrink: 0;
  }

  .lm-search-inner {
    position: relative;
  }

  .lm-search-icon {
    position: absolute; left: 13px; top: 50%;
    transform: translateY(-50%);
    color: #ccc; pointer-events: none;
    transition: color 0.2s;
  }
  .lm-search-wrap:focus-within .lm-search-icon { color: #ff2d6b; }

  .lm-search {
    width: 100%;
    padding: 12px 14px 12px 40px;
    background: #f7f7f7;
    border: 1.5px solid #efefef;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px; color: #111;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .lm-search::placeholder { color: #ccc; }
  .lm-search:focus {
    border-color: #ff2d6b; background: #fff;
    box-shadow: 0 0 0 3px rgba(255,45,107,0.08);
  }

  /* ── CURRENT LOCATION BTN ── */
  .lm-location-btn {
    display: flex; align-items: center; gap: 9px;
    margin: 1rem 1.75rem 0;
    padding: 10px 14px;
    background: #fff8f9;
    border: 1.5px solid #ffd0de;
    border-radius: 11px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 600; color: #ff2d6b;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    flex-shrink: 0;
    width: calc(100% - 3.5rem);
  }
  .lm-location-btn:hover { background: #fff0f4; border-color: #ff2d6b; }

  .lm-location-icon {
    width: 30px; height: 30px;
    background: #ff2d6b; border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .lm-location-text { display: flex; flex-direction: column; gap: 1px; }
  .lm-location-label { font-size: 13.5px; font-weight: 700; color: #ff2d6b; line-height: 1; }
  .lm-location-sub   { font-size: 11px; color: #ffaac4; font-weight: 400; }

  /* ── DIVIDER ── */
  .lm-sep {
    display: flex; align-items: center; gap: 10px;
    margin: 1.25rem 1.75rem 0;
    flex-shrink: 0;
  }
  .lm-sep-line { flex: 1; height: 1px; background: #f0f0f0; }
  .lm-sep-text {
    font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase; color: #d5d5d5;
  }

  /* ── SCROLLABLE BODY ── */
  .lm-body {
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.75rem 1.75rem;
    scrollbar-width: thin;
    scrollbar-color: #f0f0f0 transparent;
  }
  .lm-body::-webkit-scrollbar { width: 4px; }
  .lm-body::-webkit-scrollbar-thumb { background: #f0f0f0; border-radius: 2px; }
`;

function LocationModal({ close }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // ── FETCH ADDRESSES (logic unchanged) ──
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Token:", token);
      const res = await fetch("http://127.0.0.1:8000/api/addresses/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) { console.log("API error:", res.status); return; }
      const data = await res.json();
      setAddresses(data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => { fetchAddresses(); }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="lm-backdrop" onClick={close}>
        <div className="lm-modal" onClick={e => e.stopPropagation()}>

          {/* HEADER */}
          <div className="lm-header">
            <h2 className="lm-header-title">Select delivery address</h2>
            <button className="lm-close" onClick={close} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* SEARCH */}
          <div className="lm-search-wrap">
            <div className="lm-search-inner">
              <span className="lm-search-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                type="text"
                className="lm-search"
                placeholder="Search by area, street name, pin code"
              />
            </div>
          </div>

          {/* CURRENT LOCATION */}
          <button className="lm-location-btn">
            <div className="lm-location-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="lm-location-text">
              <span className="lm-location-label">Use my current location</span>
              <span className="lm-location-sub">Enable GPS to auto-detect</span>
            </div>
          </button>

          {/* DIVIDER */}
          <div className="lm-sep">
            <div className="lm-sep-line" />
            <span className="lm-sep-text">Saved Addresses</span>
            <div className="lm-sep-line" />
          </div>

          {/* BODY */}
          <div className="lm-body">
            {showForm ? (
              <AddAddressForm
                fetchAddresses={fetchAddresses}
                setShowForm={setShowForm}
              />
            ) : (
              <AddressList
                addresses={addresses}
                setShowForm={setShowForm}
              />
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default LocationModal;