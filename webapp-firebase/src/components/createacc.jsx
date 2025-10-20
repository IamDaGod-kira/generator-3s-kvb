import React, { useState } from "react";
import { auth, db } from "../main";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";

export default function Createacc() {
  const [selectedClass, setSelectedClass] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const showCourse = ["11", "12"].includes(selectedClass);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const redirectLogin = () => {
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.uniqueid, // using uniqueid as password for now — ideally should be a separate field
      );

      // 2️⃣ Get last 4 digits of unique ID
      const uniquePart = formData.uniqueid.slice(-4);

      // 3️⃣ Create Firestore doc in default collection (say "students")
      const collectionRef = collection(db, "students");
      const docRef = doc(collectionRef, uniquePart);

      await setDoc(docRef, {
        ...formData,
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
    <div className="flex items-center justify-center min-h-screen bg-inherit font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.2)] w-[420px] max-w-full">
        <h2 className="text-center mb-6 text-sky-400 text-[22px] font-bold tracking-wide">
          Student Enrollment Form
        </h2>
        <hr />
        <button
          onClick={redirectLogin}
          className="w-full py-3 mt-5 bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white font-bold text-base rounded-lg shadow-md hover:opacity-90 hover:-translate-y-0.5 hover:text-yellow-400 transition"
        >
          Already have account? Login here
        </button>
        <br />
        <br />
        <hr />

        <form onSubmit={handleSubmit}>
          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Full Name of Student
          </label>
          <input
            type="text"
            name="fullname"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Name of Father
          </label>
          <input
            type="text"
            name="fathername"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Name of Mother
          </label>
          <input
            type="text"
            name="mothername"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Unique ID
          </label>
          <input
            type="text"
            name="uniqueid"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Alternative Phone Number
          </label>
          <input
            type="tel"
            name="altphone"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none transition"
          />

          <label className="font-bold block mt-3 text-gray-700 text-sm">
            Address
          </label>
          <textarea
            name="address"
            rows="3"
            onChange={handleChange}
            required
            className="w-full p-2.5 mt-1 border border-gray-300 rounded-lg text-sm focus:border-blue-500 outline-none resize-none transition"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-5 bg-gradient-to-r from-[#2575fc] to-[#6a11cb] text-white font-bold text-base rounded-lg shadow-md hover:opacity-90 hover:-translate-y-0.5 hover:text-yellow-400 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Enroll Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
