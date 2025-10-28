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


// import express from "express";
// import { saveProject, getProject, listProjects, deleteProject } from "../controllers/projectController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.use(protect); // all project routes require auth
// router.get("/", listProjects);
// router.get("/:id", getProject);
// router.post("/", saveProject);
// router.delete("/:id", deleteProject);
// // router.get("/:id", getProjectById);


// export default router;


// backend/routes/projectRoutes.js
// import express from "express";
// import {
//   saveProject,
//   getProject,
//   listProjects,
//   updateProject,
//   deleteProject,
// } from "../controllers/projectController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.use(protect); // all routes require login

// router.get("/", listProjects);        // list all projects
// router.post("/", saveProject);        // create new
// router.get("/:id", getProject);       // get single
// router.put("/:id", updateProject);    // update code or info
// router.delete("/:id", deleteProject); // delete

// export default router;


// backend/src/routes/projectRoutes.js
import express from "express";
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js"; // your middleware

const router = express.Router();
router.use(protect);

router.post("/", createProject);
router.get("/", listProjects);
router.get("/:id", getProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
