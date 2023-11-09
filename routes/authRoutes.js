const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');
const Todo = require('../models/todo');
const userRouter = express.Router(); 


userRouter.get('/', (req, res) => {
  res.render('login');
});


userRouter.get('/signup', (req, res) => {
  res.render('signup');
});
// userRouter.get('/todo', (req, res) => {
 
//   res.render('todo'); 
// });
userRouter.post('/login', async (req, res) => {
  try{
  const response = await authController.login(req, res);

  if (response && response.code == 200) {
  
    // If login is successful, set a JWT cookie and redirect to the blog page
    res.cookie('jwt', response.token, { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true });
  
    res.redirect('/todo');

  } 
}catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal Server Error' });
  res.render('login', { message: 'An error occurred.' });
}
});

userRouter.post("/signup", async (req, res) => {
  const response = await authController.createUser({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password
  });

  if (response.code === 200) {
    res.redirect("/"); 
  } else {
    res.render('signup', { message: response.message }); // Render signup with error message
  }
});



userRouter.get('/todo', async (req, res) => {
  try {
      const todos = await Todo.find();
      res.render('todo');
  } catch (error) {
      res.status(500).json({ error: 'Error fetching todos' });
  }
});



userRouter.get('/logout', authController.logout);

module.exports = userRouter;
