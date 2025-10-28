// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthProvider.jsx";
import ProjectProvider from "./context/ProjectProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import StudioPage from "./pages/StudioPage.jsx";
import ProjectDetailPage from "./pages/ProjectDetailPage.jsx";
import EditorPage from "./pages/EditorPage.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/studio"
            element={
              <ProtectedRoute>
                <StudioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studio/:projectId"
            element={
              <ProtectedRoute>
                <ProjectDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoute>
                <EditorPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ProjectProvider>
    </AuthProvider>
  );
}
