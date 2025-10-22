// src/context/ProjectProvider.jsx
import { useState, useEffect } from "react";
import { ProjectContext } from "./ProjectContext";
import { getAllProjects, createProject, updateProject, deleteProject } from "../api/projectApi";

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load projects on mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data || []);
    } catch (err) {
      console.error("❌ Failed to fetch projects:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (projectData) => {
    try {
      const newProject = await createProject(projectData);
      setProjects((prev) => [...prev, newProject]);
    } catch (err) {
      console.error("❌ Failed to create project:", err);
      throw err;
    }
  };

  const editProject = async (id, updates) => {
    try {
      const updated = await updateProject(id, updates);
      setProjects((prev) => prev.map((p) => (p._id === id ? updated : p)));
    } catch (err) {
      console.error("❌ Failed to update project:", err);
      throw err;
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete project:", err);
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        error,
        loadProjects,
        addProject,
        editProject,
        removeProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
