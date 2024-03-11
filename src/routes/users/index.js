const express = require('express');
const usersRouter = express.Router({ caseSensitive: true });

const { usersController } = require('./../../controllers/users');

usersRouter
  // id starts from 1 and can be up to 9 digits long
  .route('/:id([1-9]\\d{0,8})/')
  .get(usersController.getUserById)
  .post(usersController.updateUser)
  .delete(usersController.deleteUser);

usersRouter.get('/active/', usersController.getActiveUsers);

usersRouter
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

module.exports = { usersRouter };
