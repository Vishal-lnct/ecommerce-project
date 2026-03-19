import "../styles/profile.css";

// Only keyframes + font import — can't be expressed with Tailwind utilities alone
const keyframes = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.35; }
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .animate-pulse-dot  { animation: pulse 2s infinite; }
  .animate-card-in    { animation: cardIn 0.4s both; }
  .font-inter         { font-family: 'Inter', sans-serif; }
`;

// Reusable card wrapper
function Card({ children, className = "", style }) {
  return (
    <div
      className={`animate-card-in bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.05)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

// Reusable card header
function CardHead({ icon, title, action }) {
  return (
    <div className="flex items-center justify-between px-7 py-6 pb-5 border-b border-[#f2f2f2]">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-[#fff0f4] rounded-[10px] flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <span className="text-[15px] font-bold text-[#111]">{title}</span>
      </div>
      {action}
    </div>
  );
}

// Reusable empty state
function EmptyState({ icon, text, sub, action }) {
  return (
    <div className="flex flex-col items-center px-4 py-10 text-center">
      <div className="w-[52px] h-[52px] rounded-full bg-[#f7f7f7] flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-sm font-medium text-[#bbb]">{text}</p>
      {sub && <p className="text-[12.5px] text-[#d0d0d0] mt-[3px]">{sub}</p>}
      {action}
    </div>
  );
}

function Profile() {
  const name     = "Vishal Kumar";
  const initials = name.split(" ").map((w) => w[0]).join("");

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
          <div className="relative z-10 flex flex-row items-center gap-7 flex-nowrap">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-[100px] h-[100px] rounded-full flex items-center justify-center text-[2.4rem] font-extrabold text-white border-4 border-white/15 shadow-[0_4px_24px_rgba(0,0,0,0.4)] select-none"
                style={{ background: "linear-gradient(135deg, #ff2d6b, #ff8fab)" }}
              >
                {initials}
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 border border-white/15 rounded-full px-[13px] py-1 pl-[9px] text-[11px] font-semibold tracking-[0.07em] uppercase text-white/40 mb-3 bg-white/[0.05] w-fit">
                <span className="w-[7px] h-[7px] rounded-full bg-[#ff2d6b] animate-pulse-dot" />
                My Account
              </div>

              <h1 className="text-[2.4rem] font-extrabold text-white tracking-[-0.03em] leading-[1.1] mb-1.5">
                {name.split(" ")[0]}{" "}
                <span className="text-[#ff2d6b]">{name.split(" ").slice(1).join(" ")}</span>
              </h1>

              <p className="text-sm text-white/[0.38] font-normal">vishal@gmail.com</p>
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-[900px] mx-auto px-8 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">

          {/* ── PROFILE CARD (full width) ── */}
          <Card className="col-span-full" style={{ animationDelay: "0.05s" }}>

            {/* Stats strip */}
            <div className="grid grid-cols-3 border-b border-[#f2f2f2]">
              {[
                { val: "0", lbl: "Orders" },
                { val: "0", lbl: "Wishlist" },
                { val: "0", lbl: "Addresses" },
              ].map((s, i) => (
                <div
                  key={s.lbl}
                  className={`px-7 py-5 text-center ${i < 2 ? "border-r border-[#f2f2f2]" : ""}`}
                >
                  <span className="block text-[1.5rem] font-extrabold text-[#111] tracking-[-0.03em] mb-[3px]">
                    {s.val}
                  </span>
                  <span className="text-[11.5px] text-[#bbb] font-medium">{s.lbl}</span>
                </div>
              ))}
            </div>

            <CardHead
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              }
              title="Personal Information"
              action={
                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border-[1.5px] border-[#e8e8e8] rounded-[10px] font-inter text-[13px] font-semibold text-[#555] cursor-pointer transition-all duration-150 hover:border-[#ff2d6b] hover:text-[#ff2d6b] hover:bg-[#fff0f4]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Profile
                </button>
              }
            />

            <div className="px-7 py-6">
              {[
                {
                  label: "Full Name", value: "Vishal Kumar",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                },
                {
                  label: "Email", value: "vishal@gmail.com",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                },
                {
                  label: "Phone", value: "+91 XXXXXXXX",
                  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.63 5a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z"/></svg>,
                },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-4 py-[0.9rem] border-b border-[#f7f7f7] last:border-b-0">
                  <div className="w-[38px] h-[38px] bg-[#f7f7f7] rounded-[10px] flex items-center justify-center flex-shrink-0">
                    {row.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-[#bbb] uppercase tracking-[0.06em] mb-[2px]">
                      {row.label}
                    </p>
                    <p className="text-[15px] font-semibold text-[#111]">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* ── RECENT ORDERS ── */}
          <Card style={{ animationDelay: "0.1s" }}>
            <CardHead
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              }
              title="Recent Orders"
            />
            <div className="px-7 py-6">
              <EmptyState
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                }
                text="No recent orders yet"
                sub="Your orders will appear here"
              />
            </div>
          </Card>

          {/* ── SAVED ADDRESS ── */}
          <Card style={{ animationDelay: "0.15s" }}>
            <CardHead
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              }
              title="Saved Address"
            />
            <div className="px-7 py-6">
              <EmptyState
                icon={
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                }
                text="No address added"
                sub="Add a delivery address"
                action={
                  <button className="inline-flex items-center gap-1.5 mt-[1.1rem] px-5 py-2.5 bg-white border-[1.5px] border-[#ffc5d3] rounded-[10px] font-inter text-[13px] font-semibold text-[#ff2d6b] cursor-pointer transition-all duration-150 hover:bg-[#fff0f4] hover:border-[#ff2d6b]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" y1="5" x2="12" y2="19"/>
                      <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    Add Address
                  </button>
                }
              />
            </div>
          </Card>

        </div>
      </div>
    </>
  );
}

export default Profile;