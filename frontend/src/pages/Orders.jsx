import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../utils/auth";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mo-root {
    min-height: 100vh;
    background: #f5f5f5;
    font-family: 'Inter', sans-serif;
    padding-bottom: 5rem;
  }

  /* ── HERO ── */
  .mo-hero {
    background: #111;
    padding: 4rem 4rem 3.5rem;
    position: relative;
    overflow: hidden;
  }
  .mo-hero::after {
    content: '';
    position: absolute; inset: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px,
      transparent 1px, transparent 44px
    );
    pointer-events: none;
  }
  .mo-hero-inner { position: relative; z-index: 1; }

  .mo-hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 100px;
    padding: 5px 15px 5px 10px;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 1.2rem;
    background: rgba(255,255,255,0.06);
  }
  .mo-hero-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #ff2d6b; animation: pulse 2s infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }

  .mo-hero-title {
    font-size: 3.2rem; font-weight: 800;
    color: #fff; line-height: 1.1; margin-bottom: 0.7rem;
    letter-spacing: -0.03em;
  }
  .mo-hero-title span { color: #ff2d6b; }

  .mo-hero-sub {
    font-size: 15px; color: rgba(255,255,255,0.38);
    font-weight: 400; line-height: 1.5;
  }

  /* ── BODY ── */
  .mo-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  /* ── EMPTY ── */
  .mo-empty {
    display: flex; flex-direction: column;
    align-items: center; padding: 7rem 2rem; text-align: center;
  }
  .mo-empty-icon {
    width: 88px; height: 88px; border-radius: 50%;
    background: #fff0f4;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1.5rem;
  }
  .mo-empty-title { font-size: 1.3rem; font-weight: 700; color: #444; margin-bottom: 0.5rem; }
  .mo-empty-sub { font-size: 15px; color: #aaa; line-height: 1.7; }

  /* ── ORDER CARD ── */
  .mo-card {
    background: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1.75rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.05);
    animation: cardIn 0.4s both;
  }
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* card header */
  .mo-card-header {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #f2f2f2;
    flex-wrap: wrap; gap: 12px;
  }

  .mo-order-meta { display: flex; flex-direction: column; gap: 5px; }

  .mo-order-id {
    font-size: 16px; font-weight: 700; color: #111;
  }
  .mo-order-date {
    font-size: 13px; color: #aaa; font-weight: 400;
  }

  /* status badge */
  .mo-status {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 7px 16px; border-radius: 100px;
    font-size: 12px; font-weight: 600;
    letter-spacing: 0.04em;
  }
  .mo-status-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; }

  .mo-status.pending    { background: #fff8ed; color: #b45309; }
  .mo-status.pending    .mo-status-dot { background: #f5a623; }
  .mo-status.cancelled  { background: #fff0f3; color: #c01f45; }
  .mo-status.cancelled  .mo-status-dot { background: #ff2d6b; }
  .mo-status.delivered  { background: #edfaf4; color: #1a7f4b; }
  .mo-status.delivered  .mo-status-dot { background: #22c55e; }
  .mo-status.shipped    { background: #eff6ff; color: #1d4ed8; }
  .mo-status.shipped    .mo-status-dot { background: #3b82f6; }
  .mo-status.processing { background: #f5f3ff; color: #6d28d9; }
  .mo-status.processing .mo-status-dot { background: #8b5cf6; }

  /* items */
  .mo-items { padding: 0 2rem; }

  .mo-item {
    display: flex; align-items: center; gap: 1.25rem;
    padding: 1.4rem 0;
    border-bottom: 1px solid #f5f5f5;
  }
  .mo-item:last-child { border-bottom: none; }

  .mo-item-img {
    width: 88px; height: 88px;
    object-fit: cover; border-radius: 14px;
    background: #f5f5f5; flex-shrink: 0;
    border: 1px solid #efefef;
  }

  .mo-item-info { flex: 1; min-width: 0; }

  .mo-item-name {
    font-size: 15px; font-weight: 600; color: #111;
    margin-bottom: 6px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .mo-item-meta { display: flex; gap: 12px; align-items: center; }
  .mo-item-qty  { font-size: 13px; color: #aaa; font-weight: 400; }
  .mo-item-price{ font-size: 15px; font-weight: 700; color: #111; }

  /* card footer */
  .mo-card-footer {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 1.4rem 2rem;
    background: #fafafa;
    border-top: 1px solid #f2f2f2;
    flex-wrap: wrap; gap: 14px;
  }

  .mo-total-label {
    font-size: 12px; font-weight: 500;
    color: #aaa; text-transform: uppercase;
    letter-spacing: 0.06em; margin-bottom: 4px;
  }
  .mo-total-amount {
    font-size: 1.4rem; font-weight: 800;
    color: #111; letter-spacing: -0.02em;
  }

  /* cancel btn */
  .mo-cancel-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 11px 22px;
    background: #fff;
    border: 1.5px solid #ffc5d3;
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    font-size: 14px; font-weight: 600;
    color: #ff2d6b; cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.15s, box-shadow 0.15s;
  }
  .mo-cancel-btn:hover:not(:disabled) {
    background: #fff0f4; border-color: #ff2d6b;
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(255,45,107,0.15);
  }
  .mo-cancel-btn:disabled {
    opacity: 0.45; cursor: not-allowed; border-color: #eee; color: #bbb;
  }

  /* spinner */
  .mo-spinner {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,45,107,0.2);
    border-top-color: #ff2d6b;
    border-radius: 50%;
    animation: spin 0.7s linear infinite; flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
`;

const STATUS_MAP = {
  pending: "pending", cancelled: "cancelled",
  delivered: "delivered", shipped: "shipped", processing: "processing",
};

function StatusBadge({ status }) {
  const key = STATUS_MAP[status] || "pending";
  const labels = {
    pending: "Pending", cancelled: "Cancelled",
    delivered: "Delivered", shipped: "Shipped", processing: "Processing",
  };
  return (
    <span className={`mo-status ${key}`}>
      <span className="mo-status-dot" />
      {labels[key] || status}
    </span>
  );
}

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // ── FETCH ORDERS (logic unchanged) ──
  const fetchOrders = () => {
    axios
      .get("http://127.0.0.1:8000/api/orders/", {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      })
      .then((res) => { console.log("API RESPONSE:", res.data); setOrders(res.data); })
      .catch((err) => { console.log("Order fetch error:", err); });
  };

  useEffect(() => { fetchOrders(); }, []);

  // ── CANCEL ORDER (logic unchanged) ──
  const cancelOrder = async (orderId) => {
    try {
      setLoadingId(orderId);
      await axios.post(
        `http://127.0.0.1:8000/api/orders/${orderId}/cancel/`,
        {},
        { headers: { Authorization: `Bearer ${getAccessToken()}` } }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Cannot cancel this order");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="mo-root">

        {/* HERO */}
        <div className="mo-hero">
          <div className="mo-hero-inner">
            <div className="mo-hero-tag">
              <span className="mo-hero-dot" />
              Account
            </div>
            <h1 className="mo-hero-title">
              My <span>Orders</span>
            </h1>
            <p className="mo-hero-sub">
              {orders.length > 0
                ? `You have ${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
                : "Track and manage your purchases"}
            </p>
          </div>
        </div>

        {/* BODY */}
        <div className="mo-body">
          {orders.length === 0 ? (
            <div className="mo-empty">
              <div className="mo-empty-icon">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="mo-empty-title">No orders yet</p>
              <p className="mo-empty-sub">When you place an order,<br />it will appear here.</p>
            </div>
          ) : (
            orders.map((order, idx) => {
              const status = order.status?.toLowerCase() || "pending";
              return (
                <div key={order.id} className="mo-card" style={{ animationDelay: `${idx * 0.07}s` }}>

                  {/* HEADER */}
                  <div className="mo-card-header">
                    <div className="mo-order-meta">
                      <span className="mo-order-id">Order #{order.id}</span>
                      {order.created_at && (
                        <span className="mo-order-date">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <StatusBadge status={status} />
                  </div>

                  {/* ITEMS */}
                  <div className="mo-items">
                    {order.items?.map((item) => (
                      <div key={item.id} className="mo-item">
                        <img
                          className="mo-item-img"
                          src={item.product_image}
                          alt={item.product_name}
                          onError={e => { e.target.src = "https://picsum.photos/88"; }}
                        />
                        <div className="mo-item-info">
                          <p className="mo-item-name">{item.product_name}</p>
                          <div className="mo-item-meta">
                            <span className="mo-item-qty">Qty: {item.quantity}</span>
                            <span className="mo-item-price">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="mo-card-footer">
                    <div>
                      <p className="mo-total-label">Order Total</p>
                      <p className="mo-total-amount">₹{order.total_amount}</p>
                    </div>
                    {status === "pending" && (
                      <button
                        className="mo-cancel-btn"
                        disabled={loadingId === order.id}
                        onClick={() => cancelOrder(order.id)}
                      >
                        {loadingId === order.id ? (
                          <><span className="mo-spinner" />Cancelling…</>
                        ) : (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <line x1="15" y1="9" x2="9" y2="15"/>
                              <line x1="9" y1="9" x2="15" y2="15"/>
                            </svg>
                            Cancel Order
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default MyOrders;