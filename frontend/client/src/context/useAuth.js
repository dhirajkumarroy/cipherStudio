// src/context/useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext.js";

// ✅ Default export (no curly braces when importing)
export default function useAuth() {
  return useContext(AuthContext);
}
