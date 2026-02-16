import { NavLink, Outlet, useNavigate } from "react-router-dom";

const navItem = "px-3 py-2 rounded-xl hover:bg-yellow-500/10 border border-transparent hover:border-yellow-500/20";
const activeItem = "bg-yellow-500/10 border border-yellow-500/20";

export default function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        
        {/* Sidebar */}
        <aside className="lux-card p-5 h-fit sticky top-6">
          <div className="text-2xl font-black tracking-tight">
            <span className="lux-gold">Admin</span> Panel
          </div>
          <p className="text-white/60 text-sm mt-1">Manage rooms, bookings & reservations.</p>

          <div className="mt-6 grid gap-2">
            <NavLink to="/admin" end className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Dashboard</NavLink>
            <NavLink to="/admin/rooms" className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Rooms</NavLink>
            <NavLink to="/admin/reservations" className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Reservations</NavLink>
            <NavLink to="/admin/bookings" className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Bookings</NavLink>
            <NavLink to="/admin/menu" className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Menu</NavLink>
            <NavLink to="/admin/orders" className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Orders</NavLink>
            <NavLink to="/admin/messages" className={({isActive}) => `${navItem} ${isActive?activeItem:""}`}>Messages</NavLink>
          </div>

          <button onClick={logout} className="mt-6 w-full lux-btn-dark">
            Logout
          </button>
        </aside>

        {/* Content */}
        <section className="lux-card p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
