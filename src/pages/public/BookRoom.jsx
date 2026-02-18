import { useEffect, useMemo, useState } from "react";
import { api } from "../../routes/api";

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  // form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        setLoadingRooms(true);
        const res = await api.get("/api/rooms?active=true");
        setRooms(res.data || []);
      } catch (e) {
        alert(e?.response?.data?.message || "Rooms load failed");
      } finally {
        setLoadingRooms(false);
      }
    })();
  }, []);

  const selectedRoom = useMemo(
    () => rooms.find((r) => r._id === roomId),
    [rooms, roomId]
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const inD = new Date(checkIn);
    const outD = new Date(checkOut);
    const diff = Math.ceil((outD - inD) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [checkIn, checkOut]);

  const total = useMemo(() => {
    if (!selectedRoom) return 0;
    return (selectedRoom.price || 0) * (nights || 0);
  }, [selectedRoom, nights]);

  const submitBooking = async (e) => {
    e.preventDefault();

    if (!name || !phone || !roomId || !checkIn || !checkOut) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/api/bookings", {
        name,
        phone,
        room: roomId, // ✅ backend expects "room"
        checkIn,
        checkOut,
        guests: Number(guests),
      });

      alert("Booking submitted!");
      setName("");
      setPhone("");
      setRoomId("");
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
    } catch (err) {
      alert(err?.response?.data?.message || "Booking failed");
    }
  };

  const payNow = async () => {
    try {
      if (!roomId) return alert("Select a room first");
      if (!nights) return alert("Select valid dates first");

      const res = await api.post("/api/payments/checkout-room", {
        roomId,
        nights,
      });

      window.location.href = res.data.url;
    } catch (err) {
      alert(err?.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-[#3a2f12] bg-black/70 backdrop-blur p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,215,0,0.08)]">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Book a Room
        </h1>
        <p className="mt-2 text-sm text-[#d7c58a]">
          Luxury stay reservation request + optional payment.
        </p>

        <form onSubmit={submitBooking} className="mt-6 grid gap-3">
          <input
            className="w-full rounded-2xl bg-black/60 border border-[#3a2f12] px-4 py-3 text-white outline-none focus:border-[#c8a33a]"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full rounded-2xl bg-black/60 border border-[#3a2f12] px-4 py-3 text-white outline-none focus:border-[#c8a33a]"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <select
            className="w-full rounded-2xl bg-black/60 border border-[#3a2f12] px-4 py-3 text-white outline-none focus:border-[#c8a33a]"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            <option value="">
              {loadingRooms ? "Loading rooms..." : "Select Room"}
            </option>
            {rooms.map((room) => (
              <option key={room._id} value={room._id}>
                {room.title} (PKR {room.price})
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className="w-full rounded-2xl bg-black/60 border border-[#3a2f12] px-4 py-3 text-white outline-none focus:border-[#c8a33a]"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
            <input
              type="date"
              className="w-full rounded-2xl bg-black/60 border border-[#3a2f12] px-4 py-3 text-white outline-none focus:border-[#c8a33a]"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>

          <input
            type="number"
            min={1}
            className="w-full rounded-2xl bg-black/60 border border-[#3a2f12] px-4 py-3 text-white outline-none focus:border-[#c8a33a]"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            placeholder="Guests"
          />

          <div className="text-sm text-[#d7c58a] mt-1">
            Selected: <b>{selectedRoom?.title || "-"}</b> • Nights:{" "}
            <b>{nights}</b> • Total: <b>PKR {total}</b>
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-2xl bg-[#c8a33a] text-black font-bold py-3 hover:opacity-95"
          >
            Submit Booking
          </button>

          <button
            type="button"
            onClick={payNow}
            className="w-full rounded-2xl border border-[#c8a33a] text-[#d7c58a] font-semibold py-3 hover:bg-[#c8a33a]/10"
          >
            Pay Now (Stripe)
          </button>
        </form>
      </div>
    </div>
  );
}
