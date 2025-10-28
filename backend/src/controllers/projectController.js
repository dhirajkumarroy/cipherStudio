// import Project from "../models/Project.js";
// import { v4 as uuidv4 } from "uuid";

// export const saveProject = async (req, res, next) => {
//   try {
//     const { name, description, files, projectId } = req.body;
//     const owner = req.userId;

//     if (!files || !Array.isArray(files)) {
//       return res.status(400).json({ message: "files array required" });
//     }

//     let project;
//     if (!projectId) {
//       project = await Project.create({
//         projectId: uuidv4(),
//         name,
//         description,
//         files,
//         owner,
//       });
//     } else {
//       project = await Project.findOneAndUpdate(
//         { projectId, owner },
//         { name, description, files },
//         { new: true }
//       );
//       if (!project)
//         return res.status(404).json({ message: "Project not found" });
//     }

//     res.json(project);
//   } catch (err) {
//     next(err);
//   }
// };

// export const getProject = async (req, res, next) => {
//   try {
//     const project = await Project.findOne({
//       projectId: req.params.id,
//       owner: req.userId,
//     });
//     if (!project) return res.status(404).json({ message: "Not found" });
//     res.json(project);
//   } catch (err) {
//     next(err);
//   }
// };

// export const listProjects = async (req, res, next) => {
//   try {
//     const projects = await Project.find(
//       { owner: req.userId },
//       { files: 0 }
//     ).sort({ updatedAt: -1 });
//     res.json(projects);
//   } catch (err) {
//     next(err);
//   }
// };

// export const deleteProject = async (req, res, next) => {
//   try {
//     const removed = await Project.findOneAndDelete({
//       projectId: req.params.id,
//       owner: req.userId,
//     });
//     if (!removed)
//       return res.status(404).json({ message: "Project not found" });
//     res.json({ message: "Project deleted" });
//   } catch (err) {
//     next(err);
//   }
// };

// // 👇 New export
// export const updateProject = async (req, res, next) => {
//   try {
//     const { name, description, files } = req.body;
//     const project = await Project.findOneAndUpdate(
//       { projectId: req.params.id, owner: req.userId },
//       { name, description, files },
//       { new: true }
//     );

//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (err) {
//     next(err);
//   }
// };


// import Project from "../models/Project.js";

// // ✅ Create new project
// export const saveProject = async (req, res, next) => {
//   try {
//     const { name, description } = req.body;

//     // validation
//     if (!name || !description) {
//       return res.status(400).json({ message: "Name and description are required" });
//     }

//     // ✅ attach owner from JWT middleware
//     const project = await Project.create({
//       name,
//       description,
//       owner: req.userId,
//     });

//     res.status(201).json({
//       message: "Project created successfully",
//       project,
//     });
//   } catch (err) {
//     console.error("❌ Error saving project:", err);
//     res.status(500).json({ message: "Failed to create project", error: err.message });
//   }
// };

// // ✅ Get all projects for logged-in user
// export const listProjects = async (req, res, next) => {
//   try {
//     const projects = await Project.find({ owner: req.userId }).sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (err) {
//     console.error("❌ Error fetching projects:", err);
//     res.status(500).json({ message: "Failed to fetch projects" });
//   }
// };

// // ✅ Get single project by ID
// export const getProject = async (req, res, next) => {
//   try {
//     const project = await Project.findOne({ _id: req.params.id, owner: req.userId });
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (err) {
//     console.error("❌ Error fetching project:", err);
//     res.status(500).json({ message: "Failed to get project" });
//   }
// };

// // ✅ Delete project
// export const deleteProject = async (req, res, next) => {
//   try {
//     const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.userId });
//     if (!project) return res.status(404).json({ message: "Project not found or unauthorized" });

//     res.json({ message: "Project deleted successfully" });
//   } catch (err) {
//     console.error("❌ Error deleting project:", err);
//     res.status(500).json({ message: "Failed to delete project" });
//   }
// };

// // GET /api/projects/:id
// export const getProjectById = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// };


// backend/controllers/projectController.js
// import Project from "../models/Project.js";

// // ✅ Create a new project
// export const saveProject = async (req, res, next) => {
//   try {
//     const { name, description } = req.body;

//     if (!name || !description) {
//       return res.status(400).json({ message: "Name and description are required" });
//     }

//     const project = await Project.create({
//       name,
//       description,
//       owner: req.userId,
//     });

//     res.status(201).json({
//       message: "Project created successfully",
//       project,
//     });
//   } catch (err) {
//     console.error("❌ Error saving project:", err);
//     res.status(500).json({ message: "Failed to create project", error: err.message });
//   }
// };

// // ✅ Get all projects for logged-in user
// export const listProjects = async (req, res, next) => {
//   try {
//     const projects = await Project.find({ owner: req.userId }).sort({ createdAt: -1 });
//     res.json(projects);
//   } catch (err) {
//     console.error("❌ Error fetching projects:", err);
//     res.status(500).json({ message: "Failed to fetch projects" });
//   }
// };

// // ✅ Get single project by ID
// export const getProject = async (req, res, next) => {
//   try {
//     const project = await Project.findOne({ _id: req.params.id, owner: req.userId });
//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json(project);
//   } catch (err) {
//     console.error("❌ Error fetching project:", err);
//     res.status(500).json({ message: "Failed to get project" });
//   }
// };

// // ✅ Update project (used by editor)
// export const updateProject = async (req, res, next) => {
//   try {
//     const { name, description, code } = req.body;

//     const project = await Project.findOneAndUpdate(
//       { _id: req.params.id, owner: req.userId },
//       { name, description, code },
//       { new: true }
//     );

//     if (!project) return res.status(404).json({ message: "Project not found" });
//     res.json({ message: "Project updated successfully", project });
//   } catch (err) {
//     console.error("❌ Error updating project:", err);
//     res.status(500).json({ message: "Failed to update project" });
//   }
// };

// // ✅ Delete project
// export const deleteProject = async (req, res, next) => {
//   try {
//     const project = await Project.findOneAndDelete({ _id: req.params.id, owner: req.userId });
//     if (!project) return res.status(404).json({ message: "Project not found or unauthorized" });

//     res.json({ message: "Project deleted successfully" });
//   } catch (err) {
//     console.error("❌ Error deleting project:", err);
//     res.status(500).json({ message: "Failed to delete project" });
//   }
// };


// backend/src/controllers/projectController.js
import Project from "../models/Project.js";

// Create new project
export const createProject = async (req, res) => {
  try {
    const { name, description, files } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const project = await Project.create({
      name,
      description: description || "",
      files: files || {},
      owner: req.userId,
    });

    res.status(201).json({ project });
  } catch (err) {
    console.error("createProject err", err);
    res.status(500).json({ message: err.message });
  }
};

// List user's projects
export const listProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.userId }).select("-files").sort({ updatedAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single project (with files)
export const getProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, owner: req.userId });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update project (name/description/files)
export const updateProject = async (req, res) => {
  try {
    const { name, description, files } = req.body;
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      { name, description, files },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
export const deleteProject = async (req, res) => {
  try {
    const removed = await Project.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!removed) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
