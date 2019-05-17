const express = require('express');
const todosController = require('../controllers/todoControllers');

const router = express.Router();


router.post('/todos', todosController.createTodo);
router.get('/todos', todosController.getAllTodos);


module.exports = router;