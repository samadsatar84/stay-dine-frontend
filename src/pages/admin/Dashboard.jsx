import { useEffect, useState } from "react";
import { api } from "../../routes/api";

function Stat({ label, value }) {
  return (
    <div className="lux-card p-5">
      <div className="text-white/60 text-sm">{label}</div>
      <div className="text-3xl font-black mt-2 lux-gold">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({ rooms: 0, bookings: 0, reservations: 0, menu: 0 });

  useEffect(() => {
    const load = async () => {
      const [rooms, bookings, reservations, menu] = await Promise.all([
        api.get("/api/rooms"),
        api.get("/api/bookings"),
        api.get("/api/reservations"),
        api.get("/api/menu"),
      ]);
      setStats({
        rooms: rooms.data?.length || 0,
        bookings: bookings.data?.length || 0,
        reservations: reservations.data?.length || 0,
        menu: menu.data?.length || 0,
      });
    };
    load();
  }, []);

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black">Dashboard</h1>
          <p className="text-white/60 mt-1">Quick overview of your system.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total Rooms" value={stats.rooms} />
        <Stat label="Bookings" value={stats.bookings} />
        <Stat label="Reservations" value={stats.reservations} />
        <Stat label="Menu Items" value={stats.menu} />
      </div>

      <div className="mt-6 lux-card p-5">
        <div className="text-lg font-bold">Today’s Note</div>
        <p className="text-white/60 mt-2">
          Tip: Keep only “Active” rooms visible on public site. Upload high quality images for luxury feel.
        </p>
      </div>
    </div>
  );
}
