const express = require('express');
const todoRouter = express.Router();
const todoController = require('../controllers/todoController');

todoRouter.post('/api/todo', todoController.createTodo);
todoRouter.get('/api/todos', todoController.getAllTodos);

module.exports = todoRouter;