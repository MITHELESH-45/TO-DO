const TodoList = require("../models/TodoList");
const TodoItem = require("../models/TodoItem");
const { nanoid } = require("nanoid");

exports.createList = async (req,res) => {

  try {

    const list = await TodoList.create({
      title: req.body.title,
      user: req.user.id
    });

    res.status(201).json(list);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getLists = async (req,res) => {

  try {

    const lists = await TodoList.find({
      user: req.user.id
    });

    res.json(lists);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.renameList = async(req,res) => {

  try {

    const updated = await TodoList.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.deleteList = async(req,res) => {

  try {

    await TodoItem.deleteMany({
      todoList: req.params.id
    });

    await TodoList.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "List deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.generateShareLink = async (req, res) => {

  try {

    const shareId = nanoid(10);

    const updated = await TodoList.findByIdAndUpdate(
      req.params.id,
      {
        isPublic: true,
        shareId
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

exports.getPublicList = async(req, res) => {

  try {

    const list = await TodoList.findOne({
      shareId:req.params.shareId,
      isPublic: true
    });

    if (!list) {
      return res.status(404).json({
        message: "List not found"
      });
    }

    const items = await TodoItem.find({
      todoList: list._id
    });

    res.json({
      list,
      items
    });

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

};

exports.getStats = async (req, res) => {

  try {

    const items = await TodoItem.find({
      todoList: req.params.id
    });

    const completed = items.filter(
      item => item.completed
    ).length;

    const pending = items.filter(
      item => !item.completed
    ).length;

    const tags = {};

    items.forEach(item => {

      if (item.tags.length === 0) {
        tags["No Tag"] =
          (tags["No Tag"] || 0) + 1;
      }

      item.tags.forEach(tag => {
        tags[tag] = (tags[tag] || 0) + 1;
      });

    });

    res.json({
      total: items.length,
      completed,
      pending,
      tags
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};