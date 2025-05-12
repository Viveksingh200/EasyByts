const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const isAuthenticated = require("../middleware/isAuthenticated");
const isProjectOwnerOrAdmin = require("../middleware/isProjectOwnerOrAdmin");

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate('author', 'username');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// POST a new project (Create)
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newProject = new Project({
      ...req.body,
      author: req.user._id,
    });

    await newProject.save();
    res.status(201).json({ message: "Project created", project: newProject });
  } catch (err) {
    res.status(400).json({ message: "Failed to create project", error: err.message });
  }
});

// PUT /:id (Update a project)
router.put("/:id", isAuthenticated, isProjectOwnerOrAdmin, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project updated", project: updatedProject });
  } catch (err) {
    res.status(400).json({ message: "Failed to update project", error: err.message });
  }
});

// DELETE /:id (Delete a project)
router.delete("/:id", isAuthenticated, isProjectOwnerOrAdmin, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted", project: deletedProject });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
