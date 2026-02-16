import { useEffect, useState } from "react";
import { api } from "../../routes/api";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get("/api/orders");
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const setStatus = async (id, status) => {
    await api.put(`/api/orders/${id}/status`, { status });
    fetchOrders();
  };

  return (
    <div>
      <h1>Orders Admin</h1>

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((o) => (
            <div key={o._id} style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 12 }}>
              <b>{o.customerName}</b> — {o.phone}
              <div style={{ color: "#666", marginTop: 6 }}>
                Total: <b>PKR {o.total}</b> • Status: <b>{o.status}</b>
              </div>
              {o.address && <div style={{ color: "#666", marginTop: 6 }}>Address: {o.address}</div>}
              {o.notes && <div style={{ color: "#666", marginTop: 6 }}>Notes: {o.notes}</div>}

              <div style={{ marginTop: 10 }}>
                <b>Items</b>
                <div style={{ marginTop: 6, display: "grid", gap: 6 }}>
                  {o.items.map((it, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{it.name} × {it.qty}</span>
                      <span>PKR {it.price * it.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button onClick={() => setStatus(o._id, "confirmed")} style={btn}>Confirm</button>
                <button onClick={() => setStatus(o._id, "delivered")} style={btn}>Delivered</button>
                <button onClick={() => setStatus(o._id, "cancelled")} style={btn}>Cancel</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const btn = { padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" };
