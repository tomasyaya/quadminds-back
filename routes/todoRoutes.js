const express = require('express');
const todosController = require('../controllers/todoControllers');

const router = express.Router();


router.post('/todos', todosController.createTodo);
router.put('/todos/:id', todosController.updateTodo);
router.get('/todos', todosController.getAllTodos);
router.delete('/todos/:id', TodoController.deleteTodo);


module.exports = router;