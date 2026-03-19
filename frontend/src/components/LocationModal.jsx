import { useEffect, useState } from "react";
import AddressList from "./AddressList";
import AddAddressForm from "./AddAddressForm";
import { authFetch } from "../utils/auth";

const res = await authFetch("http://127.0.0.1:8000/api/addresses/");

// Only keyframes + font import — animations can't be expressed with Tailwind utilities alone
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .animate-backdrop-in { animation: backdropIn 0.2s ease both; }
  .animate-modal-in    { animation: modalIn 0.25s cubic-bezier(0.16,1,0.3,1) both; }

  .font-inter { font-family: 'Inter', sans-serif; }

  /* Thin custom scrollbar — no Tailwind equivalent */
  .lm-scroll {
    scrollbar-width: thin;
    scrollbar-color: #f0f0f0 transparent;
  }
  .lm-scroll::-webkit-scrollbar       { width: 4px; }
  .lm-scroll::-webkit-scrollbar-thumb { background: #f0f0f0; border-radius: 2px; }
`;

function LocationModal({ close }) {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm]   = useState(false);

  // ── FETCH ADDRESSES (logic unchanged) ──
  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("access_token");
      console.log("Token:", token);
      const res = await fetch("http://127.0.0.1:8000/api/addresses/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      <style>{keyframes}</style>

      {/* ── BACKDROP ── */}
      <div
        className="animate-backdrop-in fixed inset-0 bg-black/55 backdrop-blur-[4px] flex items-center justify-center z-50 p-4"
        onClick={close}
      >
        {/* ── MODAL ── */}
        <div
          className="animate-modal-in bg-white w-full max-w-[620px] max-h-[90vh] rounded-[22px] shadow-[0_24px_80px_rgba(0,0,0,0.22)] flex flex-col overflow-hidden font-inter"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ── HEADER ── */}
          <div className="flex items-center justify-between px-7 py-[1.4rem] pb-5 border-b border-[#f2f2f2] flex-shrink-0">
            <h2 className="text-[17px] font-extrabold text-[#111] tracking-[-0.02em]">
              Select delivery address
            </h2>
            <button
              onClick={close}
              aria-label="Close"
              className="w-8 h-8 bg-[#f5f5f5] border-none rounded-full cursor-pointer flex items-center justify-center text-[#888] transition-all duration-150 hover:bg-[#fff0f4] hover:text-[#ff2d6b] hover:scale-[1.08]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* ── SEARCH ── */}
          <div className="px-7 pt-[1.1rem] flex-shrink-0">
            <div className="relative group">
              <span className="absolute left-[13px] top-1/2 -translate-y-1/2 text-[#ccc] pointer-events-none transition-colors duration-200 group-focus-within:text-[#ff2d6b]">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by area, street name, pin code"
                className="w-full pl-10 pr-3.5 py-3 bg-[#f7f7f7] border-[1.5px] border-[#efefef] rounded-xl font-inter text-sm text-[#111] outline-none transition-all duration-200 placeholder-[#ccc] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,45,107,0.08)]"
              />
            </div>
          </div>

          {/* ── CURRENT LOCATION BUTTON ── */}
          <button className="flex items-center gap-[9px] mx-7 mt-4 px-3.5 py-2.5 bg-[#fff8f9] border-[1.5px] border-[#ffd0de] rounded-[11px] font-inter text-[13.5px] font-semibold text-[#ff2d6b] cursor-pointer transition-all duration-150 flex-shrink-0 hover:bg-[#fff0f4] hover:border-[#ff2d6b]">
            <div className="w-[30px] h-[30px] bg-[#ff2d6b] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="flex flex-col gap-px">
              <span className="text-[13.5px] font-bold text-[#ff2d6b] leading-none">
                Use my current location
              </span>
              <span className="text-[11px] text-[#ffaac4] font-normal">
                Enable GPS to auto-detect
              </span>
            </div>
          </button>

          {/* ── DIVIDER ── */}
          <div className="flex items-center gap-2.5 mx-7 mt-5 flex-shrink-0">
            <div className="flex-1 h-px bg-[#f0f0f0]" />
            <span className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-[#d5d5d5]">
              Saved Addresses
            </span>
            <div className="flex-1 h-px bg-[#f0f0f0]" />
          </div>

          {/* ── SCROLLABLE BODY ── */}
          <div className="lm-scroll flex-1 overflow-y-auto px-7 py-4 pb-7">
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