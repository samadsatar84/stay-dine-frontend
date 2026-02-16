import { NavLink, Link } from "react-router-dom";

const linkBase =
  "px-3 py-2 rounded-xl text-sm font-semibold transition border border-transparent hover:border-yellow-500/20 hover:bg-yellow-500/10";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-black/50 border-b border-yellow-500/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-yellow-500/15 border border-yellow-500/25 grid place-items-center">
            <span className="text-yellow-400 font-black">S</span>
          </div>
          <div className="leading-tight">
            <div className="font-black text-lg">
              <span className="text-yellow-400">Stay</span> &amp; Dine
            </div>
            <div className="text-xs text-white/60 -mt-1">Luxury Hotel & Restaurant</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? "bg-yellow-500/10 border-yellow-500/20" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/rooms" className={({ isActive }) => `${linkBase} ${isActive ? "bg-yellow-500/10 border-yellow-500/20" : ""}`}>
            Rooms
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => `${linkBase} ${isActive ? "bg-yellow-500/10 border-yellow-500/20" : ""}`}>
            Menu
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `${linkBase} ${isActive ? "bg-yellow-500/10 border-yellow-500/20" : ""}`}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/book-room" className="lux-btn hidden sm:inline-block">
            Book Room
          </Link>
          <Link to="/reserve-table" className="lux-btn-dark hidden sm:inline-block">
            Reserve Table
          </Link>
          <Link to="/admin-login" className="px-3 py-2 rounded-xl border border-yellow-500/20 hover:bg-yellow-500/10 text-sm font-semibold">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
