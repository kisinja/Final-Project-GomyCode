const express = require('express');
const router = express.Router();

const { getUserTasks, createTask, updateTask, deleteTask, getTask } = require('../controllers/tasks');

router.get('/:id', getUserTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/:id', getTask);

module.exports = router;