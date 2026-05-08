const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");


// CREATE TASK
router.post(
  "/",
  authMiddleware,
  adminMiddleware,

  async (req, res) => {

    try {

      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        project: null,
        assignedTo: null,
        deadline: null
      });

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);


// GET ALL TASKS
router.get(
  "/",
  authMiddleware,

  async (req, res) => {

    try {

      const tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "name");

      res.json(tasks);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);


// UPDATE TASK STATUS
router.put(
  "/:id",
  authMiddleware,

  async (req, res) => {

    try {

      const task = await Task.findByIdAndUpdate(
        req.params.id,

        {
          status: req.body.status
        },

        { new: true }
      );

      res.json(task);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  }
);

module.exports = router;