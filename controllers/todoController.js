const Todo = require('../models/todo');

const addTodo = async (req, res) => {
  const { newtask } = req.body;

  if (!newtask) {
    return res.status(400).json({ error: 'Task description is required.' });
  }

  try {
    const response = await fetch('/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newtask }),
    });

    if (response.ok) {
      // Handle successful response (e.g., create a new todo item in your UI)
      const todo = await response.json();

      // Create a new list item for the todo
      const newItem = document.createElement('li');
      newItem.innerHTML = `
        <input type="checkbox">
        <label>${todo.description}</label>
        <input type="text">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      `;

      // Add the new item to the "new-todo-items" container
      const newTodoItemsContainer = document.getElementById('new-todo-items');
      newTodoItemsContainer.appendChild(newItem);
    } else {
      // Handle error response
      console.error('Error adding a new TODO item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};


// To update a TODO item
const updateTodo = async (id, description) => {
  try {
    const response = await fetch(`/updateTodo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ description }),
    });

    if (response.ok) {
      // Handle successful response (e.g., update the TODO item in your UI)
      const updatedTodo = await response.json();
      console.log('Updated TODO item:', updatedTodo);
    } else {
      // Handle error response
      console.error('Error updating TODO item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

// To delete a TODO item
const deleteTodo = async (id) => {
  try {
    const response = await fetch(`/deleteTodo/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Handle successful response (e.g., remove the TODO item from your UI)
      console.log('TODO item deleted');
    } else {
      // Handle error response
      console.error('Error deleting TODO item');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
module.exports = {
  addTodo,
  updateTodo,
  deleteTodo,
};