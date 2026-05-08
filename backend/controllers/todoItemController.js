const TodoItem = require("../models/TodoItem");

exports.createItem = async (req, res) => {

  try {

    const item = await TodoItem.create({
      text: req.body.text,
      tags: req.body.tags || [],
      todoList: req.body.todoList
    });

    res.status(201).json(item);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getItems = async (req, res) => {

  try {

    const filter = {
      todoList: req.params.listId
    };

    if (req.query.tag) {
      filter.tags = req.query.tag;
    }

    const items = await TodoItem.find(filter);

    res.json(items);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.toggleComplete = async (req, res) => {

  try {

    const item = await TodoItem.findById(
      req.params.id
    );

    item.completed = !item.completed;

    await item.save();

    res.json(item);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.renameItem = async (req, res) => {

  try {

    const updated = await TodoItem.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
        tags: req.body.tags
      },
      { new: true }
    );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteItem = async (req, res) => {

  try {

    await TodoItem.findByIdAndDelete(req.params.id);
      

    res.json({
      message: "Item deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};