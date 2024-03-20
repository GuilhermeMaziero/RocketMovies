const { Router } = require('express');

const ClassUserController = require('../controllers/UsersController');

const userRoutes = Router();

const usersController = new ClassUserController();

userRoutes.post('/', usersController.create);
userRoutes.put('/:id', usersController.update);

module.exports = userRoutes;