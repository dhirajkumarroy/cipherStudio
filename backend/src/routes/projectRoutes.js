// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import {
//   saveProject,
//   getProject,
//   updateProject,
//   deleteProject,
//   listProjects
// } from "../controllers/projectController.js";

// const router = express.Router();

// router.use(protect); // ✅ all routes below require login

// router.post("/", saveProject);
// router.get("/", listProjects);
// router.get("/:id", getProject);
// router.put("/:id", updateProject);
// router.delete("/:id", deleteProject);

// export default router;


import express from "express";
import { saveProject, getProject, listProjects, deleteProject } from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // all project routes require auth
router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", saveProject);
router.delete("/:id", deleteProject);

export default router;
