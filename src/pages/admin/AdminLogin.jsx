import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../routes/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@stay.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      alert(err?.response?.data?.message || "Invalid login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-2xl p-6 shadow-sm">
        <h1 className="text-3xl font-extrabold">Admin Login</h1>
        <p className="text-gray-500 mt-2">Login karo to admin panel unlock hoga.</p>

        <form onSubmit={submit} className="mt-6 grid gap-3">
          <input
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black/10"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            disabled={loading}
            className="bg-black text-white rounded-xl py-3 font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
