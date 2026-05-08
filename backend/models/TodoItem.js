const mongoose = require("mongoose");

const todoItemSchema = new mongoose.Schema({

  text:{
    type: String,
    required:true
  },

  completed:{
    type: Boolean,
    default:false
  },

  tags:[{
    type:String,
    enum: [
    "urgent",
    "work",
    "low-priority"
  ]
  }],

  todoList:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"TodoList"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model(
  "TodoItem",
  todoItemSchema
);