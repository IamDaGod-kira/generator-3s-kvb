import React, { useState } from "react";
import { auth, db } from "../main";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";

export default function Createacc() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uniquePart = formData.uniqueid.slice(-4);
      const docRef = doc(collection(db, "students"), uniquePart);

      await setDoc(docRef, {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        uniqueid: formData.uniqueid,
        password: formData.password,
        createdAt: new Date().toISOString(),
        uid: userCredential.user.uid,
      });

      alert("Account created successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error creating account:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#d3f3ff]/30 to-[#fff0a5]/30 font-sans">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[500px] max-w-full">
        <h2 className="text-center mb-6 text-sky-700 text-[22px] font-bold tracking-wide">
          Student Enrollment Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullname"
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Password (min 6 chars)"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="uniqueid"
            onChange={handleChange}
            required
            placeholder="Unique ID"
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white font-bold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Enroll Now"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/login"
            className="text-blue-700 hover:underline font-medium"
          >
            Already have an account? Login here
          </a>
        </div>
      </div>
    </main>
  );
}
