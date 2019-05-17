const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  status: {
    type: Boolean,
    default: false
  }
},{ timestamps: true }
);

module.exports = mongoose.model('Todo', Todo);