// Only font import — keyframes for spinner and cardIn can't be done without custom config
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes alSpin {
    to { transform: rotate(360deg); }
  }
  @keyframes alCardIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-al-spin    { animation: alSpin 0.7s linear infinite; }
  .animate-al-card-in { animation: alCardIn 0.3s both; }

  .font-inter { font-family: 'Inter', sans-serif; }

  /* Left accent bar — pseudo-element, can't be done with Tailwind */
  .al-card-accent {
    position: relative;
    overflow: hidden;
  }
  .al-card-accent::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #ff2d6b;
    border-radius: 3px 0 0 3px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .al-card-accent:hover::before { opacity: 1; }
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
        <style>{keyframes}</style>
        <div className="font-inter">
          <div className="flex flex-col items-center px-4 py-12 text-center gap-3">
            <div className="w-8 h-8 border-[3px] border-[rgba(255,45,107,0.15)] border-t-[#ff2d6b] rounded-full animate-al-spin" />
            <p className="text-[13px] text-[#ccc] font-medium">Loading addresses…</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{keyframes}</style>

      <div className="font-inter">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-[#111]">Saved Addresses</h3>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-[1.5px] border-[#ffc5d3] rounded-[10px] font-inter text-[13px] font-semibold text-[#ff2d6b] cursor-pointer transition-all duration-150 hover:bg-[#fff0f4] hover:border-[#ff2d6b] hover:-translate-y-px"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add New
          </button>
        </div>

        {/* ── EMPTY STATE ── */}
        {list.length === 0 ? (
          <div className="flex flex-col items-center px-4 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#fff0f4] flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <p className="text-[15px] font-semibold text-[#555] mb-1">No addresses saved yet</p>
            <p className="text-[13px] text-[#bbb]">Add a delivery address to get started</p>
          </div>

        ) : (
          list.map((a, idx) => (
            <div
              key={a.id ?? idx}
              className="al-card-accent bg-white border-[1.5px] border-[#f0f0f0] rounded-2xl px-6 py-5 mb-4 animate-al-card-in transition-all duration-200 hover:border-[#ffc5d3] hover:shadow-[0_4px_20px_rgba(255,45,107,0.08)] hover:-translate-y-0.5"
              style={{ animationDelay: `${idx * 0.06}s` }}
            >
              {/* Card top row */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <span className="text-[15px] font-bold text-[#111]">{a.name}</span>
                {a.address_type && (
                  <span className="inline-flex items-center gap-1 bg-[#f7f7f5] border border-[#efefef] rounded-full px-2.5 py-[3px] text-[11px] font-semibold text-[#888] capitalize flex-shrink-0">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#ff2d6b]" />
                    {a.address_type}
                  </span>
                )}
              </div>

              {/* Address text */}
              <p className="text-[13.5px] text-[#666] font-normal leading-relaxed mb-4">
                {[a.house, a.area, a.city, a.pincode].filter(Boolean).join(", ")}
              </p>

              {/* Deliver button */}
              <button className="inline-flex items-center gap-1.5 px-[18px] py-[9px] bg-[#ff2d6b] text-white border-none rounded-[10px] font-inter text-[13px] font-semibold cursor-pointer transition-all duration-150 hover:bg-[#e01f59] hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(255,45,107,0.3)] active:scale-[0.98]">
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