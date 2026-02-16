import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../routes/api";

function FeatureCard({ title, desc }) {
  return (
    <div className="lux-card p-5">
      <div className="text-lg font-black">{title}</div>
      <p className="text-white/60 mt-2 text-sm">{desc}</p>
    </div>
  );
}

export default function Home() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const load = async () => {
      // ONLY active rooms
      const res = await api.get("/api/rooms?active=true");
      setRooms(res.data || []);
    };
    load();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="lux-card p-7 sm:p-10 overflow-hidden relative">
        <div className="absolute inset-0 opacity-60 pointer-events-none">
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
          <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>

        <div className="relative">
          <p className="text-yellow-400 font-semibold tracking-wide">STAY • DINE • RELAX</p>
          <h1 className="text-4xl sm:text-5xl font-black mt-3 leading-tight">
            Luxury Hotel & Restaurant Experience
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl">
            Premium rooms, fine dining menu, and smooth booking/reservation system — all in one place.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/rooms" className="lux-btn">Explore Rooms</Link>
            <Link to="/menu" className="lux-btn-dark">View Menu</Link>
            <Link to="/book-room" className="lux-btn-dark">Book Now</Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <FeatureCard title="Premium Rooms" desc="High-quality rooms with luxury comfort and best service." />
            <FeatureCard title="Fine Dining" desc="Curated menu with delicious meals and beautiful presentation." />
            <FeatureCard title="Fast Booking" desc="Quick booking & table reservation with admin management." />
          </div>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-3xl font-black">Featured Rooms</h2>
            <p className="text-white/60 mt-1">Only active rooms are shown here.</p>
          </div>
          <Link to="/rooms" className="lux-btn-dark">View All Rooms</Link>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.slice(0, 6).map((room) => (
            <div key={room._id} className="lux-card overflow-hidden">
              <div className="h-48 bg-black/40">
                {room.image ? (
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full grid place-items-center text-white/40">No Image</div>
                )}
              </div>
              <div className="p-5">
                <div className="text-xl font-black">{room.title}</div>
                <div className="text-white/60 text-sm mt-2">
                  PKR <span className="text-yellow-400 font-semibold">{room.price}</span> • {room.capacity} guests
                </div>

                <div className="mt-4 flex gap-2">
                  <Link to="/book-room" className="lux-btn">Book</Link>
                  <Link to="/rooms" className="lux-btn-dark">Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="mt-8 text-white/60">No active rooms yet. Add rooms from admin panel.</div>
        )}
      </section>

      {/* CTA */}
      <section className="mt-10 lux-card p-7 sm:p-10">
        <h3 className="text-3xl font-black">Ready to book?</h3>
        <p className="text-white/70 mt-2 max-w-2xl">
          Book your room or reserve your table in seconds. Admin panel manages everything.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/book-room" className="lux-btn">Book a Room</Link>
          <Link to="/reserve-table" className="lux-btn-dark">Reserve a Table</Link>
        </div>
      </section>
    </div>
  );
}
