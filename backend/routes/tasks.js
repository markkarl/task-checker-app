// backend/routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const auth = require('../middleware/auth'); // Middleware for JWT authentication

const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { title, description, dueDate, priority, assignee } = req.body;
  try {
    const task = new Task({ title, description, dueDate, priority, assignee });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignee');
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
