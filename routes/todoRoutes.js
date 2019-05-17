const express = require('express');
const todosController = require('../controllers/todoControllers');

const router = express.Router();


router.post('/todos', todosController.createTodo);


module.exports = router;