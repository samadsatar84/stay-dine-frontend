import { useState } from "react";
import { api } from "../../routes/api";

export default function ReserveTable() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [persons, setPersons] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !date || !time || !persons) return alert("Fill all fields");

    await api.post("/api/reservations", {
      name,
      phone,
      date,
      time,
      persons: Number(persons),
    });

    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setPersons("");

    alert("Reservation submitted (pending). Admin panel me show hogi.");
  };

  return (
    <div>
      <h1>Reserve a Table</h1>

      <form onSubmit={submit} style={{ marginTop: 16, display: "grid", gap: 10, maxWidth: 520 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
          <input
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            placeholder="Persons"
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }}
          />
        </div>

        <button style={{ padding: 10, borderRadius: 8, background: "black", color: "white" }}>
          Submit Reservation
        </button>
      </form>
    </div>
  );
}
