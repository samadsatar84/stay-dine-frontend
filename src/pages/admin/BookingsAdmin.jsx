import { useEffect, useState } from "react";
import { api } from "../../routes/api";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await api.get("/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/api/bookings/${id}/status`, { status });
    fetchBookings();
  };

  return (
    <div>
      <h1>Bookings Admin (MongoDB)</h1>

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b._id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
              <b>{b.name}</b> — {b.phone}

              <div style={{ color: "#666", marginTop: 6 }}>
                Room: {b.room?.title || "—"} • Guests: {b.guests} • {b.checkIn} → {b.checkOut}
              </div>

              <div style={{ marginTop: 8 }}>
                Status: <b>{b.status}</b>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <button
                  onClick={() => updateStatus(b._id, "confirmed")}
                  style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd" }}
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(b._id, "cancelled")}
                  style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
