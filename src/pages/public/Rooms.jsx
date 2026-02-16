import { useEffect, useState } from "react";
import { api } from "../../routes/api";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await api.get("/api/rooms?active=true");

      setRooms(res.data);
    };
    fetchRooms();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10">
        Our Rooms
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition">
            <div className="h-52 bg-gray-100">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5">
              <h2 className="text-xl font-bold">{room.title}</h2>
              <p className="text-gray-500 mt-2">
                PKR {room.price} • {room.capacity} Guests
              </p>

              <a
                href="/book-room"
                className="mt-4 inline-block bg-black text-white px-5 py-2 rounded-xl"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No rooms available yet.
        </div>
      )}
    </div>
  );
}
