const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true } // adds createdAt & updatedAt fields to the schema
);

module.exports = mongoose.model('TodoItem', todoItemSchema);