import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";

import PublicLayout from "./layout/PublicLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./pages/public/Home";
import Rooms from "./pages/public/Rooms";
import BookRoom from "./pages/public/BookRoom";
import ReserveTable from "./pages/public/ReserveTable";
import Menu from "./pages/public/Menu";

import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import RoomsAdmin from "./pages/admin/RoomsAdmin";
import BookingsAdmin from "./pages/admin/BookingsAdmin";
import ReservationsAdmin from "./pages/admin/ReservationsAdmin";
import MenuAdmin from "./pages/admin/MenuAdmin";
import OrdersAdmin from "./pages/admin/OrdersAdmin";
import PaymentSuccess from "./pages/public/PaymentSuccess";
import PaymentCancel from "./pages/public/PaymentCancel";



import Contact from "./pages/public/Contact";



export default function App() {
  return (
   
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="book-room" element={<BookRoom />} />
          <Route path="reserve-table" element={<ReserveTable />} />
          <Route path="menu" element={<Menu />} />       
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentCancel />} />
        </Route>

        {/* ADMIN LOGIN (public route) */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN (protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
          
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="rooms" element={<RoomsAdmin />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="reservations" element={<ReservationsAdmin />} />
          <Route path="menu" element={<MenuAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
        </Route>
      </Routes>
   
  );
}

<Route
  path="/admin/reservations"
  element={
    <ProtectedRoute>
      <ReservationsAdmin />
    </ProtectedRoute>
  }
/>
