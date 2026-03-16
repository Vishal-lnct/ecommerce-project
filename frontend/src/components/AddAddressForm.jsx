import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  .aaf-wrap {
    font-family: 'Inter', sans-serif;
    padding: 1.5rem 1.75rem 2rem;
    background: #fff;
  }

  /* ── BACK ── */
  .aaf-back {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 600; color: #aaa;
    background: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; padding: 0;
    margin-bottom: 1.5rem;
    transition: color 0.15s;
  }
  .aaf-back:hover { color: #ff2d6b; }

  /* ── HEADING ── */
  .aaf-heading { margin-bottom: 1.75rem; }
  .aaf-title {
    font-size: 20px; font-weight: 800; color: #111;
    margin-bottom: 4px; letter-spacing: -0.02em;
  }
  .aaf-sub { font-size: 13.5px; color: #bbb; font-weight: 400; }

  /* ── FIELD ── */
  .aaf-field { margin-bottom: 1.25rem; }

  .aaf-label {
    display: block;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #c0c0c0; margin-bottom: 7px;
  }

  .aaf-input {
    width: 100%;
    padding: 13px 14px;
    background: #f7f7f7;
    border: 1.5px solid #efefef;
    border-radius: 11px;
    font-family: 'Inter', sans-serif;
    font-size: 14.5px; color: #111;
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }
  .aaf-input::placeholder { color: #ccc; }
  .aaf-input:focus {
    border-color: #ff2d6b; background: #fff;
    box-shadow: 0 0 0 3px rgba(255,45,107,0.09);
  }

  /* ── 2-COL ── */
  .aaf-row2 {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 14px; margin-bottom: 1.25rem;
  }

  /* ── SECTION DIVIDER ── */
  .aaf-sep {
    display: flex; align-items: center; gap: 10px;
    margin: 1.5rem 0 1.25rem;
  }
  .aaf-sep-line { flex: 1; height: 1px; background: #f0f0f0; }
  .aaf-sep-text {
    font-size: 10.5px; font-weight: 700;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: #d0d0d0;
  }

  /* ── ADDRESS TYPE ── */
  .aaf-type-row { display: flex; gap: 10px; margin-bottom: 1.75rem; }

  .aaf-type-btn {
    flex: 1;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 11px 14px;
    background: #f7f7f7;
    border: 1.5px solid #efefef;
    border-radius: 11px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px; font-weight: 600; color: #999;
    cursor: pointer;
    transition: all 0.15s;
  }
  .aaf-type-btn:hover { border-color: #ffc5d3; color: #ff2d6b; background: #fff6f8; }
  .aaf-type-btn.active {
    background: #fff0f4; border-color: #ff2d6b; color: #ff2d6b;
  }

  .aaf-type-indicator {
    width: 8px; height: 8px; border-radius: 50%;
    background: #e0e0e0; transition: background 0.15s; flex-shrink: 0;
  }
  .aaf-type-btn.active .aaf-type-indicator { background: #ff2d6b; }

  /* ── SAVE BTN ── */
  .aaf-save {
    width: 100%; padding: 15px;
    background: #ff2d6b; color: #fff;
    border: none; border-radius: 13px;
    font-family: 'Inter', sans-serif;
    font-size: 15px; font-weight: 700;
    cursor: pointer; letter-spacing: 0.01em;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }
  .aaf-save:hover {
    background: #e01f59;
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(255,45,107,0.32);
  }
  .aaf-save:active { transform: scale(0.98); }
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

function AddAddressForm({ fetchAddresses, setShowForm }) {

  const [form, setForm] = useState({
    name: "", phone: "", pincode: "", state: "",
    city: "", house: "", area: "", type: "home"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SAVE ADDRESS TO BACKEND — logic unchanged
  const handleSave = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const res = await fetch("http://127.0.0.1:8000/api/addresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
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
      <style>{styles}</style>
      <div className="aaf-wrap">

        {/* BACK */}
        <button type="button" className="aaf-back" onClick={() => setShowForm(false)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          Back to saved addresses
        </button>

        {/* HEADING */}
        <div className="aaf-heading">
          <p className="aaf-title">Add New Address</p>
          <p className="aaf-sub">Fill in your delivery details below</p>
        </div>

        {/* NAME + PHONE */}
        <div className="aaf-row2">
          <div>
            <label className="aaf-label">Full Name</label>
            <input className="aaf-input" name="name" placeholder="John Doe" onChange={handleChange} />
          </div>
          <div>
            <label className="aaf-label">Phone</label>
            <input className="aaf-input" name="phone" placeholder="+91 XXXXXXXXXX" onChange={handleChange} />
          </div>
        </div>

        {/* PINCODE + CITY */}
        <div className="aaf-row2">
          <div>
            <label className="aaf-label">Pincode</label>
            <input className="aaf-input" name="pincode" placeholder="400001" onChange={handleChange} />
          </div>
          <div>
            <label className="aaf-label">City</label>
            <input className="aaf-input" name="city" placeholder="Mumbai" onChange={handleChange} />
          </div>
        </div>

        {/* HOUSE */}
        <div className="aaf-field">
          <label className="aaf-label">House / Flat / Building</label>
          <input className="aaf-input" name="house" placeholder="House No, Building Name" onChange={handleChange} />
        </div>

        {/* AREA */}
        <div className="aaf-field">
          <label className="aaf-label">Area / Street / Colony</label>
          <input className="aaf-input" name="area" placeholder="Road name, Area, Colony" onChange={handleChange} />
        </div>

        {/* DIVIDER */}
        <div className="aaf-sep">
          <div className="aaf-sep-line" />
          <span className="aaf-sep-text">Address Type</span>
          <div className="aaf-sep-line" />
        </div>

        {/* TYPE TOGGLE */}
        <div className="aaf-type-row">
          <button
            type="button"
            className={"aaf-type-btn" + (form.type === "home" ? " active" : "")}
            onClick={() => setForm({ ...form, type: "home" })}
          >
            <span className="aaf-type-indicator" />
            <HomeIcon /> Home
          </button>
          <button
            type="button"
            className={"aaf-type-btn" + (form.type === "work" ? " active" : "")}
            onClick={() => setForm({ ...form, type: "work" })}
          >
            <span className="aaf-type-indicator" />
            <WorkIcon /> Work
          </button>
        </div>

        {/* SAVE */}
        <button type="button" className="aaf-save" onClick={handleSave}>
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