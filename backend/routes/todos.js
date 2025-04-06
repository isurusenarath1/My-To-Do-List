const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/', async (req, res) => {
  try {
    // Get query parameters
    const { completed, deleted } = req.query;
    
    // Build query
    const query = {};
    
    // Handle completed parameter
    if (completed !== undefined) {
      // Parse the parameter as a boolean
      query.completed = completed === 'true';
    }
    
    // Handle deleted parameter
    if (deleted !== undefined) {
      // Parse the parameter as a boolean
      query.deleted = deleted === 'true';
    } else {
      // By default, don't return deleted todos
      query.deleted = false;
    }
    
    // Get todos with sorting
    let sortOption = { dueDate: 1 }; // Default sorting
    
    if (deleted === 'true') {
      sortOption = { deletedAt: -1 }; // Newest deleted first
    } else if (completed === 'true') {
      sortOption = { completedAt: -1 }; // Newest completed first
    }
    
    // Execute the query
    const todos = await Todo.find(query).sort(sortOption);
    
    res.json(todos);
  } catch (err) {
    console.error('Error in GET /todos:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    completed: req.body.completed || false,
    completedAt: req.body.completed ? new Date() : null
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific todo
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a todo
router.patch('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // If setting completed status to true, add completedAt timestamp
    if (updates.completed === true) {
      updates.completedAt = new Date();
    }
    
    // If setting completed status to false, remove completedAt timestamp
    if (updates.completed === false) {
      updates.completedAt = null;
    }
    
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Mark a todo as deleted (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    console.log(`DELETE /todos/${req.params.id} - Soft deleting todo`);
    
    // Find the todo first to check if it exists
    const existingTodo = await Todo.findById(req.params.id);
    if (!existingTodo) {
      console.log(`Todo with ID ${req.params.id} not found`);
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    console.log(`Found todo to delete:`, {
      id: existingTodo._id,
      title: existingTodo.title,
      deleted: existingTodo.deleted
    });
    
    // Soft delete by updating the todo
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: true,
        deletedAt: new Date()
      },
      { new: true }
    );
    
    console.log(`Successfully marked todo as deleted:`, {
      id: todo._id,
      title: todo.title,
      deleted: todo.deleted,
      deletedAt: todo.deletedAt
    });
    
    res.json(todo);
  } catch (err) {
    console.error('Error in DELETE /todos/:id:', err);
    res.status(500).json({ message: err.message });
  }
});

// Permanently delete a todo (hard delete)
router.delete('/:id/permanent', async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restore a deleted todo
router.patch('/:id/restore', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        deleted: false,
        deletedAt: null
      },
      { new: true }
    );
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 