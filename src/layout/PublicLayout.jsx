import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Outlet />
      </main>

      <footer className="mt-14 border-t border-yellow-500/20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-white/60">
          © {new Date().getFullYear()} <span className="lux-gold font-semibold">Stay & Dine</span> — Luxury Hotel & Restaurant
        </div>
      </footer>
    </div>
  );
}
