import { useEffect, useState } from "react";
import { api } from "../../routes/api";

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // form states
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchRooms = async () => {
    const res = await api.get("/api/rooms/all");
    setRooms(res.data || []);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const createRoom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/api/rooms", {
        title,
        price: Number(price),
        capacity: Number(capacity),
        isActive,
      });

      setTitle("");
      setPrice("");
      setCapacity("");
      setIsActive(true);

      await fetchRooms();
      alert("Room created!");
    } catch (err) {
      alert(err?.response?.data?.message || "Create failed");
    } finally {
      setLoading(false);
    }
  };

  const deleteRoom = async (id) => {
    if (!confirm("Delete this room?")) return;
    try {
      await api.delete(`/api/rooms/${id}`);
      await fetchRooms();
      alert("Deleted!");
    } catch (err) {
      alert(err?.response?.data?.message || "Delete failed");
    }
  };

  const toggleActive = async (room) => {
    try {
      await api.put(`/api/rooms/${room._id}`, { isActive: !room.isActive });
      await fetchRooms();
    } catch (err) {
      alert(err?.response?.data?.message || "Update failed");
    }
  };

  const uploadImage = async (roomId, file) => {
    try {
      if (!file) return;

      const form = new FormData();
      form.append("image", file);

      await api.post(`/api/rooms/${roomId}/image`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchRooms();
      alert("Image uploaded!");
    } catch (err) {
      alert(err?.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-[60vh]">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black">Rooms</h1>
          <p className="text-white/60 mt-1">Create, update, delete rooms + upload images.</p>
        </div>
        <button onClick={fetchRooms} className="lux-btn-dark">
          Refresh
        </button>
      </div>

      {/* Create form */}
      <div className="mt-6 lux-card p-5">
        <h2 className="text-xl font-bold">Create Room</h2>

        <form onSubmit={createRoom} className="mt-4 grid gap-3 sm:grid-cols-4">
          <input
            className="lux-border bg-black/40 rounded-xl px-4 py-3 sm:col-span-2 outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Room title (e.g. Executive Room)"
            required
          />
          <input
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price (PKR)"
            type="number"
            required
          />
          <input
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Capacity"
            type="number"
            required
          />

          <div className="sm:col-span-2 flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
              Active
            </label>

            <button disabled={loading} className="ml-auto lux-btn disabled:opacity-60">
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>

      {/* List */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div key={room._id} className="lux-card overflow-hidden">
            <div className="h-44 bg-black/40 flex items-center justify-center overflow-hidden">
              {room.image ? (
                <img src={room.image} alt={room.title} className="h-full w-full object-cover" />
              ) : (
                <div className="text-white/40 text-sm">No Image</div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-lg font-bold">{room.title}</div>
                  <div className="text-white/60 text-sm">
                    PKR {room.price} • {room.capacity} guests
                  </div>
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full border ${
                    room.isActive
                      ? "bg-green-500/10 text-green-300 border-green-500/20"
                      : "bg-red-500/10 text-red-300 border-red-500/20"
                  }`}
                >
                  {room.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 grid gap-2">
                <button onClick={() => toggleActive(room)} className="lux-btn-dark">
                  Toggle Active
                </button>

                {/* ✅ YOUR LABEL FULL (lux style) */}
                <label className="lux-btn-dark text-center cursor-pointer">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => uploadImage(room._id, e.target.files?.[0])}
                  />
                </label>

                <button onClick={() => deleteRoom(room._id)} className="lux-btn">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && <div className="mt-8 text-white/60">No rooms yet. Create one above.</div>}
    </div>
  );
}
