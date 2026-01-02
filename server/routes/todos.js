import express from 'express';
import Todo from '../models/Todo.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todo = new Todo({
      title: title.trim(),
      userId: req.user.userId,
      completed: false
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.user.userId });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    if (title !== undefined) {
      todo.title = title.trim();
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }

    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
