const userRouter=require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const auth=require('../middleware/auth')
const logger = require('../config/logger');

const createUser = async ({email, first_name, last_name, password})=>{
  logger.info('[CreateUser] => Signup process started')
    const userInfo = {email, first_name, last_name, password}
    const existingUser = await User.findOne({email:userInfo.email})
    if(existingUser){
      return{
        message:"user already exist",
        code:409
      }
    }
    const newUser = await User.create({
        email:userInfo.email,
        first_name:userInfo.first_name,
        last_name:userInfo.last_name,
        password:userInfo.password
    })
    logger.info('[CreateUser] => User with email ' + newUser.email + ' created successfully');
    return{
        message:"successful signup",
        code:200,
        newUser
    }
}


const login = async (email, password) => {
  try {
    if (!email || !password) {
      return { code: 400, message: "Email and Password required" };
    }

    const user = await User.findOne({ email });

    if (!user) {
      return { code: 404, message: "User not found" };
    }

    const validPassword = await user.isValidPassword(password);

    if (!validPassword) {
      return { code: 422, message: "Email or password is incorrect" };
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return { code: 200, message: "Successful login", user, token };
  } catch (err) {
    logger.error(err.message);
    return { code: 500, message: 'Server Error' };
  }
};

const logout = (req, res) => {
  
  res.json({ message: 'Logout successful' });
};


module.exports={login, createUser, logout}
