const express = require('express');
const todosController = require('../controllers/todoControllers');

const router = express.Router();


router.post('/todos', TodoController.createTodo);


module.exports = router;