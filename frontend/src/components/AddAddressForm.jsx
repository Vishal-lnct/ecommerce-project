import { useState } from "react";
import { authFetch } from "../utils/auth";

// Only font import — no custom keyframes needed here
const fontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  .font-inter { font-family: 'Inter', sans-serif; }
`;

const HomeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const WorkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

// Shared input class
const inputCls = "w-full px-[14px] py-[13px] bg-[#f7f7f7] border-[1.5px] border-[#efefef] rounded-[11px] font-inter text-[14.5px] text-[#111] outline-none transition-all duration-200 placeholder-[#ccc] focus:border-[#ff2d6b] focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,45,107,0.09)]";

function AddAddressForm({ fetchAddresses, setShowForm }) {

  const [form, setForm] = useState({
    name: "", phone: "", pincode: "", state: "",
    city: "", house: "", area: "", address_type: "home",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE ADDRESS TO BACKEND — logic unchanged
  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await authFetch("http://127.0.0.1:8000/api/addresses/", {
        method: "POST",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log("Address Saved:", data);
      alert("Address saved successfully!");
      fetchAddresses();
      setShowForm(false);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  return (
    <>
      <style>{fontImport}</style>

      <div className="font-inter px-7 pt-6 pb-8 bg-white">

        {/* ── BACK ── */}
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#aaa] bg-transparent border-none cursor-pointer font-inter p-0 mb-6 transition-colors duration-150 hover:text-[#ff2d6b]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to saved addresses
        </button>

        {/* ── HEADING ── */}
        <div className="mb-7">
          <p className="text-[20px] font-extrabold text-[#111] mb-1 tracking-[-0.02em]">
            Add New Address
          </p>
          <p className="text-[13.5px] text-[#bbb] font-normal">
            Fill in your delivery details below
          </p>
        </div>

        {/* ── NAME + PHONE ── */}
        <div className="grid grid-cols-2 gap-3.5 mb-5">
          <div>
            <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#c0c0c0] mb-1.5">
              Full Name
            </label>
            <input className={inputCls} name="name" placeholder="John Doe" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#c0c0c0] mb-1.5">
              Phone
            </label>
            <input className={inputCls} name="phone" placeholder="+91 XXXXXXXXXX" onChange={handleChange} />
          </div>
        </div>

        {/* ── PINCODE + CITY ── */}
        <div className="grid grid-cols-2 gap-3.5 mb-5">
          <div>
            <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#c0c0c0] mb-1.5">
              Pincode
            </label>
            <input className={inputCls} name="pincode" placeholder="400001" onChange={handleChange} />
          </div>
          <div>
            <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#c0c0c0] mb-1.5">
              City
            </label>
            <input className={inputCls} name="city" placeholder="Mumbai" onChange={handleChange} />
          </div>
        </div>

        {/* ── STATE (standalone, no label — original has none) ── */}
        <div className="mb-5">
          <input className={inputCls} name="state" placeholder="State" onChange={handleChange} />
        </div>

        {/* ── HOUSE ── */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#c0c0c0] mb-1.5">
            House / Flat / Building
          </label>
          <input className={inputCls} name="house" placeholder="House No, Building Name" onChange={handleChange} />
        </div>

        {/* ── AREA ── */}
        <div className="mb-5">
          <label className="block text-[11px] font-bold tracking-[0.08em] uppercase text-[#c0c0c0] mb-1.5">
            Area / Street / Colony
          </label>
          <input className={inputCls} name="area" placeholder="Road name, Area, Colony" onChange={handleChange} />
        </div>

        {/* ── SECTION DIVIDER ── */}
        <div className="flex items-center gap-2.5 my-6">
          <div className="flex-1 h-px bg-[#f0f0f0]" />
          <span className="text-[10.5px] font-bold tracking-[0.08em] uppercase text-[#d0d0d0]">
            Address Type
          </span>
          <div className="flex-1 h-px bg-[#f0f0f0]" />
        </div>

        {/* ── ADDRESS TYPE TOGGLE ── */}
        <div className="flex gap-2.5 mb-7">
          {[
            { value: "home", label: "Home", Icon: HomeIcon },
            { value: "work", label: "Work", Icon: WorkIcon },
          ].map(({ value, label, Icon }) => {
            const active = form.address_type === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setForm({ ...form, address_type: value })}
                className={`flex-1 flex items-center justify-center gap-2 px-[14px] py-[11px] rounded-[11px] font-inter text-[13.5px] font-semibold cursor-pointer border-[1.5px] transition-all duration-150
                  ${active
                    ? "bg-[#fff0f4] border-[#ff2d6b] text-[#ff2d6b]"
                    : "bg-[#f7f7f7] border-[#efefef] text-[#999] hover:border-[#ffc5d3] hover:text-[#ff2d6b] hover:bg-[#fff6f8]"
                  }`}
              >
                {/* Indicator dot */}
                <span className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-150 ${active ? "bg-[#ff2d6b]" : "bg-[#e0e0e0]"}`} />
                <Icon />
                {label}
              </button>
            );
          })}
        </div>

        {/* ── SAVE ── */}
        <button
          type="button"
          onClick={handleSave}
          className="w-full py-[15px] bg-[#ff2d6b] text-white border-none rounded-[13px] font-inter text-[15px] font-bold cursor-pointer tracking-[0.01em] flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#e01f59] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(255,45,107,0.32)] active:scale-[0.98]"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Save Address
        </button>

      </div>
    </>
  );
}

export default AddAddressForm;