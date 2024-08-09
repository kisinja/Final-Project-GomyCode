const express = require("express");

const router = express.Router();

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    searchTasks
} = require("../controllers/tasks");

// require Auth for all task routes
const requireAuth = require("../middleware/requireAuth");

// Apply the middleware to all routes
router.use(requireAuth);

// GET all tasks
router.get("/", getAllTasks);

// GET tasks by title => Search
router.get("/search", searchTasks);

// GET a single task by ID
router.get("/:id", getTaskById);

// POST a new task
router.post("/", createTask);

// PUT an updated task
router.put("/:id", updateTask);

// DELETE a task
router.delete("/:id", deleteTask);

module.exports = router;