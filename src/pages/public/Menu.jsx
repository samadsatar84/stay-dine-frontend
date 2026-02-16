import { useEffect, useState } from "react";
import { api } from "../../routes/api";

const tabs = ["All", "Breakfast", "Lunch", "Dinner", "Drinks"];

export default function Menu() {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("All");

  useEffect(() => {
    const load = async () => {
      // Expecting backend: GET /api/menu returns [{_id,title,price,category,image,isActive}]
      const res = await api.get("/api/menu");
      const onlyActive = Array.isArray(res.data) ? res.data.filter((x) => x.isActive !== false) : [];
      setItems(onlyActive);
    };
    load();
  }, []);

  const filtered =
    tab === "All" ? items : items.filter((x) => String(x.category || "").toLowerCase() === tab.toLowerCase());

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-4xl font-black">Menu</h1>
          <p className="text-white/60 mt-2">Luxury dining — curated items.</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl border text-sm font-semibold transition ${
              tab === t ? "bg-yellow-500/10 border-yellow-500/20" : "border-yellow-500/10 hover:bg-yellow-500/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div key={item._id} className="lux-card overflow-hidden">
            <div className="h-44 bg-black/40">
              {item.image ? (
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              ) : (
                <div className="h-full grid place-items-center text-white/40">No Image</div>
              )}
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="text-lg font-black">{item.title}</div>
                <div className="text-yellow-400 font-black">PKR {item.price}</div>
              </div>
              <div className="text-white/60 text-sm mt-2">
                Category: <span className="text-white/80">{item.category || "General"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 text-white/60">No menu items yet. Add from admin panel.</div>
      )}
    </div>
  );
}
