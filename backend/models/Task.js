// backend/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, default: 'low' }, // 'low', 'medium', 'high'
  status: { type: String, default: 'pending' }, // 'pending', 'completed'
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: String }],
});

module.exports = mongoose.model('Task', TaskSchema);
