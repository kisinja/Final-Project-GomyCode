const Task = require("../models/Task");
const mongoose = require("mongoose");

// GET all tasks
const getAllTasks = async (req, res) => {
    try {

        const userId = req.user._id;

        const tasks = await Task.find({ user_id: userId }).sort({ createdAt: -1 });
        res.json(tasks).status(200);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// GET a single task by ID
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid mongoose ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid task ID" });
        };

        const task = await Task.findById(id);
        if (task) {
            res.json(task).status(200);
        } else {
            return res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// POST a new task
const createTask = async (req, res) => {

    const { title, description } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    };

    if (!description) {
        emptyFields.push("description");
    };

    if (emptyFields.length > 0) {
        /* return res.status(400).json({ error: `Please provide a valid ${emptyFields}` }); */

        return res.status(400).json({ error: 'Please fill in all the required fields !!', emptyFields });
    };

    try {

        const user_id = req.user._id

        const task = await Task.create({
            title,
            description,
            user_id
        });
        if (task) {
            res.status(201).json(task);
        } else {
            return res.status(400).json({ message: "Task creation failed" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// PUT an updated task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid mongoose ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid task ID" });
        };


        const task = await Task.findByIdAndUpdate({ _id: id }, req.body, { new: true });

        if (task) {
            res.json(task).status(200);
        } else {
            return res.status(404).json({ message: "Task not found" });
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }

};

// DELETE a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the ID is a valid mongoose ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "Invalid task ID" });
        };

        const task = await Task.findByIdAndDelete({ _id: id });

        if (task) {
            res.json(task).status(200);
        } else {
            return res.status(404).json({ message: "Task not found" });
        }


    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// Search tasks by title
const searchTasks = async (req, res) => {
    try {
        const query = req.query.q;
        const tasks = await Task.find(
            {
                title: {
                    $regex: query,
                    $options: "i" // "i" makes it case-insensitive
                }
            }
        ).select("title");

        if (tasks) {
            res.json(tasks).status(200);
        } else {
            return res.status(404).json({ message: "No tasks found" });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    searchTasks
};