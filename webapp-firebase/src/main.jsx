import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqwNa_qpYJiMVKWqMQc2le-wZMEpaysnU",
  authDomain: "sssg-hackathon-kvb.firebaseapp.com",
  projectId: "sssg-hackathon-kvb",
  storageBucket: "sssg-hackathon-kvb.firebasestorage.app",
  messagingSenderId: "163541329249",
  appId: "1:163541329249:web:1eea803eddbd3cbb191120",
  measurementId: "G-XSN6VXPQ4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
