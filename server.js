const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tasks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database');
}).catch((err) => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

// Define Task schema
const taskSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  priority: String,
  status: String,
  addedOn: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

// Parse request body as JSON
app.use(bodyParser.json());

// Define routes

// Create new task
app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task.save().then(() => {
    res.status(201).send(task);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const { search, skip = 0, limit = 10 } = req.query;

  const query = {};

  if (search) {
    query.name = new RegExp(search, 'i');
  }

  Task.find(query).sort({ addedOn: -1 }).skip(parseInt(skip)).limit(parseInt(limit))
    .then((tasks) => {
      res.send(tasks);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

// Get task by ID
app.get('/tasks/:id', (req, res) => {
  Task.findById(req.params.id).then((task) => {
    if (!task) {
      res.status(404).send({ error: 'Task not found' });
    } else {
      res.send(task);
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// Update task by ID
app.put('/tasks/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((task) => {
    if (!task) {
      res.status(404).send({ error: 'Task not found' });
    } else {
      res.send(task);
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// Delete task by ID
app.delete('/tasks/:id', (req, res) => {
  Task.findByIdAndDelete(req.params.id).then((task) => {
    if (!task) {
      res.status(404).send({ error: 'Task not found' });
    } else {
      res.send({ message: 'Task deleted successfully' });
    }
  }).catch((err) => {
    res.status(500).send(err);
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});