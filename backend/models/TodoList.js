const mongoose = require("mongoose");

const todoListSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true,
    maxlength:100,
  },

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  isPublic:{
    type: Boolean,
    default: false
  },

  shareId:String

}, {
  timestamps:true
});

module.exports = mongoose.model(
  "TodoList",
  todoListSchema
);