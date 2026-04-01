const todoItem = require("../models/todoItem");

exports.createTodo = async (req, res, next) => {
  try {
    console.log("Data comes from frontend to Backend ", req.body)
    const { item } = req.body;

    const createItem =  new todoItem({ task: item });
    createItem.save().then((savedItem) => {
      res.status(201).json(savedItem);
    }).catch((error) => {
      console.log("Error saving item: ", error);
      res.status(500).json({ error: 'An error occurred while saving the todo item.' });
    });   

  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'An error occurred while creating the todo item.' });
  }
}

exports.getAllTodos = async (req, res, next) => {
  try {
    const todoList = await todoItem.find();
    res.status(200).json(todoList);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'An error occurred while fetching the todo items.' });

  }
}