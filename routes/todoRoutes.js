const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');




router.get('/todos', todoController.getAllTodos);



// Route to add a new TODO item
router.post('/addTodo', todoController.addTodo);

// Route to update a TODO item by ID
router.put('/updateTodo/:id', todoController.updateTodo);

// Route to delete a TODO item by ID
router.delete('/deleteTodo/:id', todoController.deleteTodo);

module.exports = router;
