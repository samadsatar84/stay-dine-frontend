import { useEffect, useMemo, useState } from "react";
import { api } from "../../routes/api";

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");

  const selectedRoom = useMemo(
    () => rooms.find((r) => String(r._id) === String(roomId)),
    [rooms, roomId]
  );

  // simple nights calc
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const inD = new Date(checkIn);
    const outD = new Date(checkOut);
    const diff = Math.ceil((outD - inD) / (1000 * 60 * 60 * 24));
    return Number.isFinite(diff) && diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const fetchRooms = async () => {
    // NOTE: backend should return active rooms only OR filter here
    const res = await api.get("/api/rooms?active=true");

    // if your backend returns all rooms, keep only active:
    const onlyActive = Array.isArray(res.data) ? res.data.filter((r) => r.isActive !== false) : [];
    setRooms(onlyActive);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      if (!name || !phone || !roomId || !checkIn || !checkOut || !guests) {
        return alert("Fill all fields");
      }

      // booking API (agar tumhara endpoint different hai, bata dena)
      await api.post("/api/bookings", {
        name,
        phone,
        roomId,
        checkIn,
        checkOut,
        guests: Number(guests),
      });

      alert("Booking submitted! Admin panel me show hoga.");

      setName("");
      setPhone("");
      setRoomId("");
      setCheckIn("");
      setCheckOut("");
      setGuests("");
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  // ✅ FULL payNow
  const payNow = async () => {
    try {
      if (!roomId) return alert("Select room first");
      if (!checkIn || !checkOut) return alert("Select check-in & check-out");

      const res = await api.post("/api/payments/checkout-room", {
        roomId,
        nights,
      });

      // Stripe checkout URL
      window.location.href = res.data.url;
    } catch (err) {
      alert(err?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-black">Book a Room</h1>
        <p className="text-white/60 mt-2">Luxury stay reservation request + optional payment.</p>
      </div>

      <form onSubmit={submitBooking} className="lux-card p-6 grid gap-4">
        <input
          className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        <input
          className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />

        <select
          className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.title} (PKR {room.price})
            </option>
          ))}
        </select>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="date"
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="date"
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <input
          className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Guests"
          type="number"
        />

        {/* price preview */}
        {selectedRoom && (
          <div className="text-sm text-white/70">
            Selected: <span className="lux-gold font-semibold">{selectedRoom.title}</span> • Nights:{" "}
            <span className="lux-gold font-semibold">{nights}</span> • Total:{" "}
            <span className="lux-gold font-semibold">PKR {Number(selectedRoom.price) * nights}</span>
          </div>
        )}

        <button className="lux-btn w-full">Submit Booking</button>

        {/* ✅ Pay now */}
        <button type="button" onClick={payNow} className="lux-btn-dark w-full">
          Pay Now (Stripe)
        </button>
      </form>
    </div>
  );
}
