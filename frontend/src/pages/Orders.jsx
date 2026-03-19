import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../utils/auth";

// Only keyframes and font import — things Tailwind can't handle without custom config
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
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .animate-pulse-dot { animation: pulse 2s infinite; }
  .animate-card-in   { animation: cardIn 0.4s both; }
  .animate-spin-sm   { animation: spin 0.7s linear infinite; }

  .font-inter { font-family: 'Inter', sans-serif; }
`;

const STATUS_MAP = {
  pending: "pending", cancelled: "cancelled",
  delivered: "delivered", shipped: "shipped", processing: "processing",
};

const STATUS_STYLES = {
  pending:    { wrap: "bg-[#fff8ed] text-[#b45309]", dot: "bg-[#f5a623]" },
  cancelled:  { wrap: "bg-[#fff0f3] text-[#c01f45]", dot: "bg-[#ff2d6b]" },
  delivered:  { wrap: "bg-[#edfaf4] text-[#1a7f4b]", dot: "bg-[#22c55e]" },
  shipped:    { wrap: "bg-[#eff6ff] text-[#1d4ed8]",  dot: "bg-[#3b82f6]" },
  processing: { wrap: "bg-[#f5f3ff] text-[#6d28d9]", dot: "bg-[#8b5cf6]" },
};

const STATUS_LABELS = {
  pending: "Pending", cancelled: "Cancelled",
  delivered: "Delivered", shipped: "Shipped", processing: "Processing",
};

function StatusBadge({ status }) {
  const key = STATUS_MAP[status] || "pending";
  const s = STATUS_STYLES[key];
  return (
    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.04em] ${s.wrap}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {STATUS_LABELS[key] || status}
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
      <style>{keyframes}</style>

      <div className="min-h-screen bg-[#f5f5f5] font-inter pb-20">

        {/* ── HERO ── */}
        <div
          className="bg-[#111] px-16 pt-16 pb-14 relative overflow-hidden"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 44px)",
          }}
        >
          <div className="relative z-10">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 border border-white/15 rounded-full px-[15px] py-[5px] pl-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-white/45 mb-5 bg-white/[0.06]">
              <span className="w-2 h-2 rounded-full bg-[#ff2d6b] animate-pulse-dot" />
              Account
            </div>

            <h1 className="text-[3.2rem] font-extrabold text-white leading-[1.1] mb-2.5 tracking-[-0.03em]">
              My <span className="text-[#ff2d6b]">Orders</span>
            </h1>

            <p className="text-[15px] text-white/[0.38] font-normal leading-relaxed">
              {orders.length > 0
                ? `You have ${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
                : "Track and manage your purchases"}
            </p>
          </div>
        </div>

        {/* ── BODY ── */}
        <div className="max-w-[900px] mx-auto px-8 py-12">

          {/* Empty state */}
          {orders.length === 0 ? (
            <div className="flex flex-col items-center py-28 px-8 text-center">
              <div className="w-[88px] h-[88px] rounded-full bg-[#fff0f4] flex items-center justify-center mb-6">
                <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#ff2d6b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="text-[1.3rem] font-bold text-[#444] mb-2">No orders yet</p>
              <p className="text-[15px] text-[#aaa] leading-[1.7]">
                When you place an order,<br />it will appear here.
              </p>
            </div>
          ) : (
            orders.map((order, idx) => {
              const status = order.status?.toLowerCase() || "pending";
              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#e8e8e8] rounded-[20px] overflow-hidden mb-7 shadow-[0_2px_16px_rgba(0,0,0,0.05)] animate-card-in"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                >
                  {/* HEADER */}
                  <div className="flex items-center justify-between flex-wrap gap-3 px-8 py-6 border-b border-[#f2f2f2]">
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-bold text-[#111]">Order #{order.id}</span>
                      {order.created_at && (
                        <span className="text-[13px] text-[#aaa] font-normal">
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <StatusBadge status={status} />
                  </div>

                  {/* ITEMS */}
                  <div className="px-8">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-5 py-[1.4rem] border-b border-[#f5f5f5] last:border-b-0"
                      >
                        <img
                          className="w-[88px] h-[88px] object-cover rounded-[14px] bg-[#f5f5f5] flex-shrink-0 border border-[#efefef]"
                          src={item.product_image}
                          alt={item.product_name}
                          onError={(e) => { e.target.src = "https://picsum.photos/88"; }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-semibold text-[#111] mb-1.5 truncate">
                            {item.product_name}
                          </p>
                          <div className="flex gap-3 items-center">
                            <span className="text-[13px] text-[#aaa] font-normal">Qty: {item.quantity}</span>
                            <span className="text-[15px] font-bold text-[#111]">₹{item.price}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between flex-wrap gap-3.5 px-8 py-[1.4rem] bg-[#fafafa] border-t border-[#f2f2f2]">
                    <div>
                      <p className="text-[12px] font-medium text-[#aaa] uppercase tracking-[0.06em] mb-1">
                        Order Total
                      </p>
                      <p className="text-[1.4rem] font-extrabold text-[#111] tracking-[-0.02em]">
                        ₹{order.total_amount}
                      </p>
                    </div>

                    {status === "pending" && (
                      <button
                        disabled={loadingId === order.id}
                        onClick={() => cancelOrder(order.id)}
                        className="inline-flex items-center gap-2 px-[22px] py-[11px] bg-white border-[1.5px] border-[#ffc5d3] rounded-xl font-inter text-sm font-semibold text-[#ff2d6b] cursor-pointer transition-all duration-150 hover:enabled:bg-[#fff0f4] hover:enabled:border-[#ff2d6b] hover:enabled:-translate-y-px hover:enabled:shadow-[0_4px_16px_rgba(255,45,107,0.15)] disabled:opacity-45 disabled:cursor-not-allowed disabled:border-[#eee] disabled:text-[#bbb]"
                      >
                        {loadingId === order.id ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-[rgba(255,45,107,0.2)] border-t-[#ff2d6b] rounded-full flex-shrink-0 animate-spin-sm" />
                            Cancelling…
                          </>
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