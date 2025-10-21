import React, { useState } from "react";
import { auth, db } from "../main";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    uniqueid: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, fullname, uniqueid } = form;
    if (!email || !password || !fullname || !uniqueid) return alert("Please fill all fields.");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const docId = uniqueid.slice(-4);
      const docSnap = await getDoc(doc(db, "students", docId));

      if (!docSnap.exists()) return alert("Unique ID not associated / is wrong.");
      const data = docSnap.data();
      if (data.fullname !== fullname) return alert("Name doesn’t match our records.");

      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      const map = {
        "auth/invalid-email": "Invalid email format.",
        "auth/user-not-found": "No user found with this email.",
        "auth/wrong-password": "Incorrect password.",
      };
      alert(map[error.code] || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-inherit font-sans">
      <section className="bg-white w-[420px] max-w-full p-6 rounded-2xl shadow-md">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <h1 className="text-xl font-bold text-blue-900 text-center">
            Login to PM Shri KV Ballygunge
          </h1>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter Email ID"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="uniqueid"
            value={form.uniqueid}
            onChange={handleChange}
            placeholder="Unique ID"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-blue-600 text-white rounded-md font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/createacc"
            className="text-blue-700 hover:underline font-medium"
          >
            Create new Account
          </a>
        </div>
      </section>
    </main>
  );
}
