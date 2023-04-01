const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  }
});

module.exports = mongoose.model('TASK', taskSchema);


