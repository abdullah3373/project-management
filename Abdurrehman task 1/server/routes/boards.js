import express from 'express';
import Board from '../models/Board.js';

const router = express.Router();

// Create a new board
router.post('/', async (req, res) => {
  const { name, description, createdBy } = req.body;
  const newBoard = new Board({ name, description, createdBy });

  try {
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all boards
router.get('/', async (req, res) => {
  try {
    const boards = await Board.find().populate('createdBy members');
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific board
router.get('/:id', async (req, res) => {
  try {
    const board = await Board.findById(req.params.id).populate('createdBy members');
    if (!board) return res.status(404).json({ message: 'Board not found' });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a board
router.put('/:id', async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBoard) return res.status(404).json({ message: 'Board not found' });
    res.json(updatedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a board
router.delete('/:id', async (req, res) => {
  try {
    const deletedBoard = await Board.findByIdAndDelete(req.params.id);
    if (!deletedBoard) return res.status(404).json({ message: 'Board not found' });
    res.json({ message: 'Board deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
