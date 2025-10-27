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
        class: formData.class, // Added class field
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
    <main className="flex items-center justify-center min-h-screen bg-inherit font-sans px-4 sm:px-6">
      <div className="bg-white w-full max-w-md sm:max-w-lg lg:max-w-xl p-6 sm:p-8 rounded-2xl shadow-xl">
        <h2 className="text-center mb-6 text-sky-700 text-xl sm:text-2xl font-bold tracking-wide">
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

          {/* Class selection */}
          <select
            name="class"
            onChange={handleChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {[...Array(10)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Class {i + 1}
              </option>
            ))}
          </select>

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
