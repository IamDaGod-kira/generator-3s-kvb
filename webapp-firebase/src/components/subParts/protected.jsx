// ./src/components/ProtectedRoute.jsx
import { lazy, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
const Loading = lazy(() => import("./loading"));

export default function Protected({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) return <Loading />;

  return user ? children : <Navigate to="/login" replace />;
}
