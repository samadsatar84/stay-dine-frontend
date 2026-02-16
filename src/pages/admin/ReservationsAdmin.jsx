import { useEffect, useState } from "react";
import { api } from "../../routes/api";

export default function ReservationsAdmin() {
  const [bookings, setBookings] = useState([]);

  const load = async () => {
    const res = await api.get("/api/bookings");
    setBookings(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id, status) => {
    await api.put(`/api/bookings/${id}/status`, { status });
    await load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bookings</h1>

      <div className="grid gap-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white shadow rounded p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">{b.name} — {b.phone}</div>
              <div className="text-sm text-gray-600">
                Room: {b.room?.title} | {b.checkIn?.slice(0,10)} → {b.checkOut?.slice(0,10)}
              </div>
              <div className="text-sm mt-1">
                Status: <span className="font-semibold">{b.status}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStatus(b._id, "approved")}
                className="px-3 py-2 rounded bg-green-600 text-white"
              >
                Approve
              </button>
              <button
                onClick={() => setStatus(b._id, "rejected")}
                className="px-3 py-2 rounded bg-red-600 text-white"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
