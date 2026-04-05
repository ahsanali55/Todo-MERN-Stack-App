const todoItem = require("../models/todoItem");

exports.createTodo = async (req, res, next) => {
  try {
    
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

// Delete a todo item by ID
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("ID from frontend: ", id);
    const deletedItem = await todoItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({error: 'Todo item not found.'});
    }
    
    return res.status(200).json(deletedItem);
    
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'An error occurred while fetching the todo item.' });
  }
}

// Update a todo item by ID
exports.markCompletedTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedItem = await todoItem.findByIdAndUpdate(id);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Todo item not found.' });
  }
  updatedItem.completed = !updatedItem.completed; // Toggle the completed status

    updatedItem.save().then((savedItem) => {
      res.status(200).json(savedItem);
    }).catch((error) => {
      console.log("Error saving updated item: ", error);
      res.status(500).json({ error: 'An error occurred while saving the updated todo item.' });
    }
   
    );
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: 'An error occurred while updating the todo item.' });
  }
}

exports.updateTodoItemById = async (req, res, next) => {
  const { task } = req.body;
  const { id } = req.params;
  const updatedItem = await todoItem.findByIdAndUpdate(id);
  if (!updatedItem) {
    console.log("Updated Item not found at database ", updatedItem);
  }
  updatedItem.task = task;
  updatedItem.save().then((Item)  => {
      res.status(200).json(Item);
      console.log("Updated Item at Backend: ", Item);
  }).catch ((error) => {
      console.log("Error ", error);
      res.status(500).json({error: "An error occured while updating the todo item"});
  })
}