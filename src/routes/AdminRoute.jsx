import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken"); // abhi dummy

  if (!adminToken) return <Navigate to="/admin-login" replace />;
  return children;
}
