// import { useEffect, useState } from "react";
// import { loadMenu, saveMenu } from "../../routes/storage";


// export default function MenuAdmin() {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");

// const [items, setItems] = useState(() => {
//   const stored = loadMenu();
//   return stored.length
//     ? stored
//     : [
//         { id: 1, name: "Chicken Karahi", category: "Main", price: 1600 },
//         { id: 2, name: "Mint Margarita", category: "Drinks", price: 350 },
//       ];
// });
// useEffect(() => {
//   saveMenu(items);
// }, [items]);


//   const addItem = (e) => {
//     e.preventDefault();
//     if (!name || !category || !price) return alert("Fill all fields");

//     const newItem = { id: Date.now(), name, category, price: Number(price) };
//     setItems([newItem, ...items]);

//     setName("");
//     setCategory("");
//     setPrice("");
//   };

//   const deleteItem = (id) => {
//     setItems(items.filter((x) => x.id !== id));
//   };

//   return (
//     <div>
//       <h1>Menu Admin</h1>

//       <form onSubmit={addItem} style={{ marginTop: 12, display: "grid", gap: 10, maxWidth: 520 }}>
//         <input
//           placeholder="Item Name (e.g. Zinger Burger)"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
//         />
//         <input
//           placeholder="Category (e.g. Fast Food)"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
//         />
//         <input
//           placeholder="Price (PKR)"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
//         />

//         <button style={{ padding: 10, borderRadius: 8, background: "black", color: "white" }}>
//           Add Menu Item
//         </button>
//       </form>

//       <div style={{ marginTop: 20, display: "grid", gap: 10 }}>
//         {items.map((i) => (
//           <div
//             key={i.id}
//             style={{
//               border: "1px solid #ddd",
//               borderRadius: 12,
//               padding: 12,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <div>
//               <b>{i.name}</b>
//               <div style={{ color: "#666" }}>{i.category} • PKR {i.price}</div>
//             </div>
//             <button
//               onClick={() => deleteItem(i.id)}
//               style={{ padding: "8px 10px", borderRadius: 8, border: "1px solid #ddd" }}
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { api } from "../../routes/api";

export default function MenuAdmin() {
  const [items, setItems] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("General");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [eName, setEName] = useState("");
  const [eCategory, setECategory] = useState("");
  const [ePrice, setEPrice] = useState("");
  const [eDescription, setEDescription] = useState("");
  const [eActive, setEActive] = useState(true);

  const fetchAll = async () => {
    const res = await api.get("/api/menu/admin");
    setItems(res.data);
  };

  useEffect(() => { fetchAll(); }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (!name || !price) return alert("Name & price required");

    await api.post("/api/menu", { name, category, price: Number(price), description });
    setName(""); setCategory("General"); setPrice(""); setDescription("");
    fetchAll();
  };

  const startEdit = (m) => {
    setEditingId(m._id);
    setEName(m.name);
    setECategory(m.category || "General");
    setEPrice(String(m.price));
    setEDescription(m.description || "");
    setEActive(Boolean(m.isActive));
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    await api.put(`/api/menu/${editingId}`, {
      name: eName, category: eCategory, price: Number(ePrice),
      description: eDescription, isActive: eActive,
    });
    setEditingId(null);
    fetchAll();
  };

  const del = async (id) => {
    if (!confirm("Delete menu item?")) return;
    await api.delete(`/api/menu/${id}`);
    fetchAll();
  };

  return (
    <div>
      <h1>Menu Admin</h1>

      <form onSubmit={addItem} style={{ marginTop: 12, display: "grid", gap: 10, maxWidth: 520 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dish name" style={inp} />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" style={inp} />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (PKR)" style={inp} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" style={{ ...inp, minHeight: 90 }} />
        <button style={blackBtn}>Add Menu Item</button>
      </form>

      {editingId && (
        <form onSubmit={saveEdit} style={{ marginTop: 16, maxWidth: 520, display: "grid", gap: 10, padding: 12, border: "1px solid #eee", borderRadius: 16, background: "white" }}>
          <b>Edit Item</b>
          <input value={eName} onChange={(e) => setEName(e.target.value)} style={inp} />
          <input value={eCategory} onChange={(e) => setECategory(e.target.value)} style={inp} />
          <input value={ePrice} onChange={(e) => setEPrice(e.target.value)} style={inp} />
          <textarea value={eDescription} onChange={(e) => setEDescription(e.target.value)} style={{ ...inp, minHeight: 90 }} />

          <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="checkbox" checked={eActive} onChange={(e) => setEActive(e.target.checked)} />
            Active
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <button style={blackBtn}>Save</button>
            <button type="button" onClick={() => setEditingId(null)} style={btn}>Cancel</button>
          </div>
        </form>
      )}

      <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
        {items.map((m) => (
          <div key={m._id} style={{ background: "white", border: "1px solid #eee", borderRadius: 16, padding: 12, display: "flex", justifyContent: "space-between", gap: 12 }}>
            <div>
              <b>{m.name}</b>
              <div style={{ color: "#666", marginTop: 6 }}>
                {m.category} • PKR {m.price} • {m.isActive ? "Active" : "Hidden"}
              </div>
              {m.description && <div style={{ color: "#666", marginTop: 6 }}>{m.description}</div>}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => startEdit(m)} style={btn}>Edit</button>
              <button onClick={() => del(m._id)} style={btn}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inp = { padding: 10, border: "1px solid #ddd", borderRadius: 10 };
const btn = { padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" };
const blackBtn = { padding: 10, borderRadius: 10, background: "black", color: "white", cursor: "pointer" };
