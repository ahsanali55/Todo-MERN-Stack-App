const express = require('express');
const todoRouter = express.Router();
const todoController = require('../controllers/todoController');

todoRouter.post('/api/todo', todoController.createTodo);
todoRouter.get('/api/todos', todoController.getAllTodos);
todoRouter.delete('/api/todo/:id', todoController.getTodoById);
todoRouter.put('/api/todo/:id', todoController.markCompletedTodoById);
todoRouter.put('/api/todo/:id', todoController.updateTodoItemById)

module.exports = todoRouter;