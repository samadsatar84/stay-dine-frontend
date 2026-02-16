import { useState } from "react";
import { api } from "../../routes/api";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      // If you have /api/messages, use it. Otherwise it will fail — still UI works.
      await api.post("/api/messages", { name, phone, message });
      alert("Message sent!");
      setName("");
      setPhone("");
      setMessage("");
    } catch (err) {
      // fallback: still let user proceed
      alert("Saved/Send feature not connected yet (optional).");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h1 className="text-4xl font-black">Contact</h1>
        <p className="text-white/60 mt-2">
          For bookings, events, and queries — contact us anytime.
        </p>

        <div className="mt-6 lux-card p-6">
          <div className="text-lg font-black">Stay & Dine</div>
          <div className="text-white/60 mt-2 text-sm">
            Address: Main Boulevard, Lahore (example) <br />
            Phone: +92 300 0000000 <br />
            Email: staydine@example.com
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <a className="lux-btn-dark" href="tel:+923000000000">Call</a>
            <a className="lux-btn" href="mailto:staydine@example.com">Email</a>
          </div>
        </div>
      </div>

      <div className="lux-card p-6">
        <h2 className="text-2xl font-black">Send a Message</h2>
        <p className="text-white/60 text-sm mt-2">We reply ASAP.</p>

        <form onSubmit={submit} className="mt-4 grid gap-3">
          <input
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <textarea
            className="lux-border bg-black/40 rounded-xl px-4 py-3 outline-none min-h-[140px]"
            placeholder="Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="lux-btn">Send</button>
        </form>
      </div>
    </div>
  );
}
