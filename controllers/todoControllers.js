const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const Todo = require('../models/Todos');

class TodosController {

  async getAllTodos(req, res) {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(400).json({
        success: 'false',
        message: 'Unable to get all todos'
      });
    }
  }

  async getTodo(req, res) {
    const { id } = req.params;
    try {
      const todo = await Todo.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({
        success: 'false',
        message: 'Unable to get todo',
      });
    }
  }

  async createTodo(req, res) {
    let newTodo = new Todo(req.body);
    if (!req.body.title) {
      return res.status(400).json({
        success: 'false',
        message: 'title is required',
      });
    }
    try {
      const todo = await newTodo.save();
      res.status(200).json(todo);
    } catch (error) {
      res.status(400).json({
        success: 'false',
        message: 'Unable to save to database',
      });
    }
  }

  async updateTodo(req, res){
    const { id } = req.params;
    const { title,  body } = req.body;
    if(!ObjectId.isValid(id) && !id.match(/^[a-fA-F0-9]{24}$/)){
      return res.status(404).json({
        success: 'false',
        message: 'todo does not exist',
      });
    }

    try {
      if(!title || ! body) {
        const todo = await Todo.findById(id)
        const { status } = todo
        const updated = await Todo.findByIdAndUpdate(id, { status: !status }, {new:true});
        return res.status(200).json(updated);
      }
      if(title && body) { 
        const newTodo = { title, body }
        const updated = await Todo.findByIdAndUpdate(id, newTodo, {new:true});
        return res.status(200).json(updated);
      }
    } catch (error) {
      es.status(404).json({
        success: 'false',
        message: 'Unable to update todo',
      });
    }
  }

  async deleteTodo(req, res){
    const {id} = req.params;
    if(!ObjectId.isValid(id) && !id.match(/^[a-fA-F0-9]{24}$/)){
      return res.status(404).json({
        success: 'false',
        message: 'todo does not exist',
      });
    }
    try {
      const deleted = await Todo.findByIdAndRemove(id);
      return res.status(200).json(deleted);
    } catch (error) {
      res.status(400).json({
        success: 'false',
        message: 'Unable to delete from database',
      });
    }
  }

}

const todosController = new TodosController();
module.exports = todosController;