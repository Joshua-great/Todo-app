const express = require('express');
const router = express.Router();
const { addTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// Add a new todo
router.post('/addTodo', addTodo);

// Update a todo
router.put('/updateTodo/:id', updateTodo);

// Delete a todo
router.delete('/deleteTodo/:id', deleteTodo);

// Export the router
module.exports = router;
