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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, fullname, uniqueid } = form;

    if (!email || !password || !fullname || !uniqueid) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Authenticate user
      await signInWithEmailAndPassword(auth, email, password);

      // Step 2: Extract last 4 digits of unique ID
      const docId = uniqueid.slice(-4);

      // Step 3: Fetch Firestore data
      const docRef = doc(db, "students", docId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Unique ID not associated / is wrong.");
        setLoading(false);
        return;
      }

      const data = docSnap.data();

      // Step 4: Validate fullname
      if (data.fullname !== fullname) {
        alert("Name doesn’t match our records.");
        setLoading(false);
        return;
      }

      alert("Login successful!");
      window.location.href = "/"; // redirect to homepage or dashboard
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/invalid-email":
          alert("Invalid email format.");
          break;
        case "auth/user-not-found":
          alert("No user found with this email.");
          break;
        case "auth/wrong-password":
          alert("Incorrect password.");
          break;
        default:
          alert("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-inherit bg-center bg-no-repeat bg-cover text-center font-sans">
      <section className="max-w-3xl mx-auto mt-8 mb-10 bg-white p-8 rounded-2xl shadow-lg">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-gray-900">
            Login for PM Shri Kendriya Vidyalaya Ballygunge
          </h1>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="email">Enter Email ID</label>
            </h2>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email ID"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="fullname">Enter Full Name</label>
            </h2>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Enter Full Name"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="password">Enter Password</label>
            </h2>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password Required"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <h2 className="text-xl text-blue-900 mb-2 font-semibold">
              <label htmlFor="uniqueid">Enter Unique ID</label>
            </h2>
            <input
              type="text"
              id="uniqueid"
              name="uniqueid"
              value={form.uniqueid}
              onChange={handleChange}
              placeholder="Unique ID"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 text-white py-2 px-6 rounded-md transition-colors duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login to go to school website"}
          </button>
        </form>

        <br />
        <hr />
        <br />
        <a
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300"
          href="/createacc"
        >
          Create new Account
        </a>
      </section>
    </main>
  );
}
