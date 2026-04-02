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

// Delete a todo item by ID
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("ID from frontend: ", id);
    const deletedItem = await todoItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({error: 'Todo item not found.'});
    }
    
    return res.status(200).json({ message: "Todo item deleted successfully." });
    
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: 'An error occurred while fetching the todo item.' });
  }
}

// Update a todo item by ID
exports.updateTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;

    console.log("ID from frontend for update: ", id);
    const updatedItem = await todoItem.findByIdAndUpdate(id);
  if (!updatedItem) {
    return res.status(404).json({ error: 'Todo item not found.' });
  }
  updatedItem.completed = !updatedItem.completed; // Toggle the completed status

    updatedItem.save().then((savedItem) => {
      res.status(200).json(savedItem);
      console.log("Updated Item at Backend: ", updatedItem);
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