const express = require("express");

const router = express.Router();

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");


// CREATE PROJECT
router.post(
  "/",
  authMiddleware,
  adminMiddleware,

  async (req, res) => {

    try {

      const project = await Project.create({
        name: req.body.name,
        description: req.body.description,
        createdBy: req.user.id,
        members: req.body.members
      });

      res.json(project);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);


// GET ALL PROJECTS
router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const projects = await Project.find()
        .populate("members", "name email");

      res.json(projects);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

module.exports = router;