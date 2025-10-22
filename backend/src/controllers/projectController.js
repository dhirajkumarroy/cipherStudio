import Project from "../models/Project.js";
import { v4 as uuidv4 } from "uuid";

export const saveProject = async (req, res, next) => {
  try {
    const { name, description, files, projectId } = req.body;
    const owner = req.userId;

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ message: "files array required" });
    }

    let project;
    if (!projectId) {
      project = await Project.create({
        projectId: uuidv4(),
        name,
        description,
        files,
        owner,
      });
    } else {
      project = await Project.findOneAndUpdate(
        { projectId, owner },
        { name, description, files },
        { new: true }
      );
      if (!project)
        return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      projectId: req.params.id,
      owner: req.userId,
    });
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
};

export const listProjects = async (req, res, next) => {
  try {
    const projects = await Project.find(
      { owner: req.userId },
      { files: 0 }
    ).sort({ updatedAt: -1 });
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const removed = await Project.findOneAndDelete({
      projectId: req.params.id,
      owner: req.userId,
    });
    if (!removed)
      return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    next(err);
  }
};

// 👇 New export
export const updateProject = async (req, res, next) => {
  try {
    const { name, description, files } = req.body;
    const project = await Project.findOneAndUpdate(
      { projectId: req.params.id, owner: req.userId },
      { name, description, files },
      { new: true }
    );

    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    next(err);
  }
};
