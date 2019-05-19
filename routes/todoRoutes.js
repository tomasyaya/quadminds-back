const express = require('express');
const todosController = require('../controllers/todoControllers');

const router = express.Router();


router.post('/todos', todosController.createTodo);
router.put('/todos/:id', todosController.updateTodo);
router.get('/todos', todosController.getAllTodos);
router.get('/todos/:id', todosController.getTodo);
router.delete('/todos/:id', todosController.deleteTodo);


// tessstting

module.exports = router;