import React, { createContext, useEffect, useReducer, useState } from "react";

// create context
export const TodoItemContext = createContext({
  todoList: [],
  addTodo: () => {},
  deleteTodo: () => {},
});

const reduceTodoList = (currTodo, action) => {
  let newTodo = currTodo;

  if (action.type === "ADD_TODO") {
    newTodo = [
      {
        id: action.payload.Id,
        value: action.payload.item,
        isChecked: action.payload.check,
      },
      ...currTodo,
    ];
  } else if (action.type === "DELETE_ITEM") {
    newTodo = currTodo.filter((item) => {
      return item.value !== action.payload.itemName;
    });
  } else if (action.type === "UPDATE_CHECKED") {
    newTodo = currTodo.map((item) => {
      if (item.id === action.payload.id) {
        return {
          ...item,
          isChecked: !item.isChecked, // toggle method concept
        };
      }
      return item;
    });
  }
  return newTodo;
};

const TodoItemProvider = ({ children }) => {
  let counter = 0;
  const [todoList, dispatchTodoList] = useReducer(reduceTodoList, []);

  const addTodo = (item) => {
    dispatchTodoList({
      type: "ADD_TODO",
      payload: {
        Id: Date.now(),
        item,
        check: false,
      },
    });
  };

  const deleteTodo = (itemName) => {
    dispatchTodoList({
      type: "DELETE_ITEM",
      payload: {
        itemName,
      },
    });
  };

  // Update item
  const updateItem = (id) => {
    dispatchTodoList({
      type: "UPDATE_CHECKED",
      payload: {
        id,
      },
    });
  };
  return (
    <TodoItemContext.Provider
      value={{
        todoList,
        addTodo,
        deleteTodo,
        updateItem,
      }}
    >
      {children}
    </TodoItemContext.Provider>
  );
};

export default TodoItemProvider;
