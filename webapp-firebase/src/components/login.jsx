import React, { useState, useEffect } from "react";
import { auth, db } from "../main";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  // Detect login state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Get user Firestore data by matching email and uniqueId (last 4 digits)
          const q = query(
            collection(db, "students"),
            where("email", "==", currentUser.email),
          );
          const qs = await getDocs(q);
          if (!qs.empty) {
            const data = qs.docs[0].data();
            setUserData({ ...data, uid: currentUser.uid });
          } else {
            console.warn("No Firestore record found for user email.");
          }
        } catch (err) {
          console.error("Error fetching user Firestore data:", err);
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !uniqueId) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Fetch Firestore document by last 4 digits of uniqueId
      const docId = uniqueId.slice(-4);
      const docRef = doc(db, "students", docId);
      const snap = await getDoc(docRef);

      if (snap.exists()) {
        const data = snap.data();
        setUserData({ ...data, uid: auth.currentUser.uid });
      } else {
        setError("No Firestore record found for this Unique ID.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials or user not found.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserData(null);
  };

  // If logged in, show user details
  if (userData) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
          Welcome, {userData.name || "Student"} 👋
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Unique ID:</strong> {userData.uniqueid}
          </p>
          <p>
            <strong>UID:</strong> {userData.uid}
          </p>
          <p>
            <strong>Class:</strong> {userData.class || "Not set"}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
        >
          Logout
        </button>
      </div>
    );
  }

  // If not logged in, show login form
  return (
    <div className="p-6 bg-white rounded-xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
        Login
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Unique ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
