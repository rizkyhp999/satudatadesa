"use client";
import { useState } from "react";

export default function HomePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("Data berhasil dikirim!");
      setName("");
      setEmail("");
    } else {
      setMessage(`Error: ${data.error}`);
    }
    setLoading(false);
  };

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Form Input ke Google Sheets</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2"
          disabled={loading}
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </main>
  );
}
