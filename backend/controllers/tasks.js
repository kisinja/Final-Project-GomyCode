const Task = require('../models/Task');
const User = require('../models/User');

const getUserTasks = async (req, res) => {

    const user = req.params.id;
    const userExists = await User.findById(user);
    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }

    try {
        const tasks = await Task.find({ userId: user });
        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks found' });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

// Create Task
const createTask = async (req, res) => {
    const userId = req.body.userId;
    const userExists = await User.findById(userId);
    if (!userExists) {
        return res.status(404).json({ message: 'User not found' });
    }
    try {
        const task = await Task.create({
            ...req.body,
            userId,
        });
        if (!task) {
            return res.status(400).json({ message: 'Task creation failed' });
        }

        res.status(201).json({ task });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err.message);
    }
};

// Update Task
const updateTask = async (req, res) => {
    try {
        const user = req.user._id;

        const taskExists = await Task.findOne({ userId: user, _id: req.params.id });
        if (!taskExists) {
            return res.status(404).json({ message: 'Task not found' });
        }

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!task) {
            return res.status(400).json({ message: 'Task update failed' });
        }

        res.status(200).json({ task });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(400).json({ message: 'Task deletion failed' });
        }

        res.status(200).json({ message: 'Task deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

// Get task by id
const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ task });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
};

module.exports = {
    getUserTasks,
    createTask,
    updateTask,
    deleteTask,
    getTask
};