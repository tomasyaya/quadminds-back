const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Todo = require('../models/Todos');

class TodosController {

  async getAllTodos(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      console.log(error);
    }
  }

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

  async updateTodo(req, res){
    const { id } = req.params;
    const { title,  body } = req.body;

    if(!ObjectId.isValid(id) && !id.match(/^[a-fA-F0-9]{24}$/)){
      return res.status(404).send({
        success: 'false',
        message: 'todo does not exist',
      });
    }

    try {
      if(!title || ! body) {
        const todo = await Todo.findById(id)
        const { done } = todo
        const updated = await Todo.findByIdAndUpdate(id, { done: !done }, {new:true});
        return res.status(200).json(updated);
      }
      if(title && body) {
        const todo = { title, body }
        const updated = await Todo.findByIdAndUpdate(id, { todo }, {new:true});
        return res.status(200).json(updated);
      }
    } catch (error) {
      res.json(error);
    }
  }

}

const todosController = new TodosController();
module.exports = todosController;