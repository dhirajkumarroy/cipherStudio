import React, { useState, useEffect, createContext, useContext } from 'react';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject
} from '../api/projectApi';
// Make sure this import path is correct for your project
import useAuth from './useAuth'; 

// 1. Create the context
export const ProjectContext = createContext(null);

// 2. Create a custom hook for easy access
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

// 3. Define the Provider component
const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useAuth(); // Get auth state and logout function

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        // Token is now automatically added by axiosInstance
        const data = await fetchProjects();
        setProjects(data);
      } catch (err) {
        // This is line 19 (or near it)
        console.error("❌ Failed to load projects:", err.response?.data || err);
        
        // If we get a 401, the token is bad (e.g., expired), so log out.
        // This will change 'user' to null, the effect will re-run,
        // and the 'if (user)' check below will fail, stopping the loop.
        if (err.response?.status === 401) {
          logout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    // --- THIS IS THE FIX ---
    // Only attempt to load projects if the 'user' object exists.
    if (user) {
      loadProjects();
    } else {
      // If there is no user, clear the projects list.
      setProjects([]);
    }
    
    // This effect runs whenever the 'user' or 'logout' function changes
  }, [user, logout]); 

  // --- (Recommended) Add auth error handling to other functions ---
  
  const addProject = async (newProject) => {
    try {
      const created = await createProject(newProject);
      setProjects((prev) => [...prev, created]);
    } catch (err) {
      console.error("Failed to create project:", err);
      if (err.response?.status === 401) logout();
    }
  };

  const editProject = async (id, updates) => {
    try {
      const updated = await updateProject(id, updates);
      setProjects((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
    } catch (err) {
      console.error("Failed to edit project:", err);
      if (err.response?.status === 401) logout();
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
      if (err.response?.status === 401) logout();
    }
  };


  return (
    <ProjectContext.Provider
      value={{ projects, isLoading, addProject, editProject, removeProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;

