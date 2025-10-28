import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import useAuth from "../context/useAuth.js"; // ✅ FIXED



export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
