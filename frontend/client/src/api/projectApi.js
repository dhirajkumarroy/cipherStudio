// import api from "./axiosInstance";

// export const fetchProjects = async () => {
//   const res = await api.get("/projects", {
//     headers: { "Cache-Control": "no-cache" }, // <-- Add this
//   });
//   return res.data;
// };


// src/api/projectApi.js
import axiosInstance from "./axiosInstance";

// ✅ Fetch all projects (GET /api/projects)
export const getAllProjects = async () => {
  try {
    const res = await axiosInstance.get("/projects");
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching projects:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ✅ Fetch a single project by ID (GET /api/projects/:id)
export const getProjectById = async (id) => {
  try {
    const res = await axiosInstance.get(`/projects/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching project:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ✅ Create a new project (POST /api/projects)
export const createProject = async (projectData) => {
  try {
    const res = await axiosInstance.post("/projects", projectData);
    return res.data;
  } catch (err) {
    console.error("❌ Error creating project:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ✅ Update a project (PUT /api/projects/:id)
export const updateProject = async (id, updates) => {
  try {
    const res = await axiosInstance.put(`/projects/${id}`, updates);
    return res.data;
  } catch (err) {
    console.error("❌ Error updating project:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};

// ✅ Delete a project (DELETE /api/projects/:id)
export const deleteProject = async (id) => {
  try {
    const res = await axiosInstance.delete(`/projects/${id}`);
    return res.data;
  } catch (err) {
    console.error("❌ Error deleting project:", err.response?.data || err.message);
    throw err.response?.data || err;
  }
};
