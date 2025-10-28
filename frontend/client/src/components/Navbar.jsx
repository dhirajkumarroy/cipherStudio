// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.js"; // ✅ Correct import

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between items-center shadow-md">
      {/* Brand */}
      <Link to="/" className="text-xl font-bold tracking-wide">
        CipherStudio ⚡
      </Link>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-gray-300">Hi, {user.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400 transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-400 transition duration-200"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
