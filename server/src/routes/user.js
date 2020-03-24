const express = require('express');
const validator = require('validator');
const isEmpty = require('lodash/isEmpty');
const User = require('../models/user');
const bcrypt = require('bcrypt');;
const jwt = require("jsonwebtoken");
const { secretKey } = require('../constants');

let router = express.Router();

// this router provides these APIs
// 1. POST - register, login
// 2. Check if a username or email has been registered 
// GET - get a user by its identifier (email or username)
// Retrieve user profile --> when a user logs in, we should 
// also provide the user id in the token
// so that when the client sends a request, it can pass in the
// user_id


// users table: username, email, password, role
// password confirmation will be asked when a user registers
// but this information won't be stored in the table
router.get('/', (req, res) => {
  const { id, username, email, role } = req.user;

  res.json({
    error: false,
    data: { id, username, email, role },
  });
});

// 1. remember to keep consistent with actions axios requst endpoint
// 2. add role to user table
router.post('/register', (req, res) => {
  inputValidation(req.body, basicInputValidation).then(
    ({ errors, isValid }) => {
    if (isValid) {

      // const { username, password, email } = req.body;
      // assuming front end will pass role as it will check role anyways
      const { username, password, email, role } = req.body;

      const password_digest = bcrypt.hashSync(password, 10);
  
      User.forge({
        username, password_digest, email, role
      }, { hasTimeStamp: true }).save()
        .then(user => res.json({
          userInformation: user,
          success: true
        }))
        .catch(err => res.status(500).json({ errors: err }))
    } else {
      res.status(400).json(errors);
    }
  });
});

// either username or email works
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const model = await User.where({
      email
    }).fetch();

    const data = model.toJSON();
    const isValidPassword = bcrypt.compareSync(password, data.password_digest);

    if(!isValidPassword){
      return res.status(422).json({
        errors: true,
        message: "Invalid Credentials"
      })   
    }

    const token = jwt.sign(
      { id: data.id, username: data.username, email: data.email, role: data.role },
      secretKey,
    );
    
    res.json({
      errors:false,
      token
    });
  } catch (err) {
    res.status(401).json({
      errors: true, 
      data: {
        message: err.message
      }})
  }
});

// adding role
const basicInputValidation = (data) => {
  let errors = {};

  if (validator.isEmpty(data.username)) {
    errors.username = "The field is required";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "The field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "The field is required";
  }

  if (validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = "The field is required";
  }

  if (!validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

const inputValidation = (data, basicInputValidation) => {
  // basicInputValidation will return an object with error and isValid
  let { errors } = basicInputValidation(data);

  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  })
    .fetch()
    .then((user) => {
      if (user) {
        if (user.get("email") === data.email) {
          errors.email = "This is email has been registered!"
        }

        if (user.get("username") === data.username) {
          errors.username = "This is username has been registered!"
        }
      }

      return {
        errors,
        isValid: isEmpty(errors)
      };
    }).catch(e => {
      return {
        errors: e,
        isValid: true
      };
    });
};

module.exports = router;