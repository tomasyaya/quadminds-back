const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Todo = require('../models/Todo');

class TodosController {

  async createTodo(req, res) {
    let newTodo = new Todo(req.body);
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required',
      });
    }
    try {
      const todo = await newTodo.save();
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).send({
        success: 'false',
        message: 'Unable to save to database',
      });
    }
  }
  
}

const todosController = new TodosController();
module.exports = todosController;