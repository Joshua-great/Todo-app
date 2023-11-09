const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const Todo = require('../models/todo');
const userRouter = express.Router(); // Define userRouter with const

// Render the login page
userRouter.get('/', (req, res) => {
  res.render('login');
});

// Render the signup page
userRouter.get('/signup', (req, res) => {
  res.render('signup');
});

// Handle signup form submission
userRouter.post("/signup", async (req, res) => {
  const response = await authController.createUser({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  });

  if (response.code === 200) {
    res.redirect("/"); // Redirect on successful signup
  } else {
    res.render('signup', { message: response.message }); // Render signup with error message
  }
});

// Handle login form submission
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const response = await authController.login(email, password);

  if (response.code === 200) {
    // If login is successful, set a JWT cookie and redirect to the /todo page
    res.cookie('jwt', response.token, { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true });
    res.redirect('/todo');
  } else {
    // Handle login error
    res.status(response.code).json(response);
  }
});

// Route for the todo page
// userRouter.get('/todo',  async (req, res) => {
//   try {
//     // Fetch todos for the logged-in user
//     const todos = await Todo.find({ userId: req.session.user._id });
//     res.render('todo', { todo });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching todos' });
//   }
// });
userRouter.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render('todos', { todos }); // Pass the `todos` array to the template
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

// Handle the logout request
userRouter.get('/logout', authController.logout);

module.exports = userRouter;
