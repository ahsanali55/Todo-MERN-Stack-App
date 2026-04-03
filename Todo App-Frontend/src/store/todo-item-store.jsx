import React, { createContext, useEffect, useReducer, useState } from "react";
import {
  AddToCompletedMarkToServer,
  createTodoItemAtServer,
  deleteTodoItemAtServer,
  fetchAllTodoItemsFromServer,
  updateTodoItemAtServer,
} from "../ApiFetchingEndPoints/todoFetching";

// create context
export const TodoItemContext = createContext({
  todoList: [],
  addTodo: () => {},
  deleteTodo: () => {},
  markCompleted: () => {},
  updateItem: () => {},
});

const reduceTodoList = (currTodo, action) => {
  let newTodo = currTodo;

  if (action.type === "ADD_TODO") {
    return (newTodo = [
      ...currTodo,
      {
        id: action.payload.Id,
        task: action.payload.task,
        completed: action.payload.completed,
      },
    ]);
  } else if (action.type === "SET_TODOS") {
    return (newTodo = action.payload);
  } else if (action.type === "DELETE_ITEM") {
    newTodo = currTodo.filter((item) => {
      return item.id !== action.payload.id;
    });
  } else if (action.type === "EDIT_ITEM") {
    return (
      newTodo = newTodo.map((todo) => {
        if (todo.id === action.payload.id){
          return todo.task = action.payload.task
        }
        return todo;
      })
    )
  } else if (action.type === "UPDATE_CHECKED") {
    newTodo = currTodo.map((item) => {
      if (item.id === action.payload.updatedTodo.id) {
        return {
          ...item,
          completed: !item.completed, // toggle method concept
        };
      }
      return item;
    });
  }
  return newTodo;
};

const TodoItemProvider = ({ children }) => {
  let counter = 0;
  // Fetch data when component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllTodoItemsFromServer();
        console.log("Data from backend:", data);

        dispatchTodoList({
          type: "SET_TODOS",
          payload: data,
        });
      } catch (error) {
        console.log("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);
  const [todoList, dispatchTodoList] = useReducer(reduceTodoList, []);
  console.log("Todo List at Frontend ", todoList);

  const addTodo = async (item) => {
    const newTodo = await createTodoItemAtServer({ item });
    console.log("The new ", newTodo);

    dispatchTodoList({
      type: "ADD_TODO",
      payload: {
        Id: newTodo.id,
        task: newTodo.task,
        completed: newTodo.completed,
      },
    });
  };

  const deleteTodo = async (id) => {
    const deletedTodo = await deleteTodoItemAtServer(id);
    console.log("The Deleted Item from the server ", deletedTodo);
    dispatchTodoList({
      type: "DELETE_ITEM",
      payload: {
        id: deletedTodo.id,
      },
    });
  };

  // Update item
  const markCompleted = async (id) => {
    console.log(id);
    const updatedTodo = await AddToCompletedMarkToServer(id);
    console.log("The Updated Item from the server ", updatedTodo);
    dispatchTodoList({
      type: "UPDATE_CHECKED",
      payload: {
        updatedTodo: updatedTodo,
      },
    });
  };
  // Update item
  const updateItem = async (newTask, id) => {
    const itemToEdit = await updateTodoItemAtServer(newTask, id);
    console.log("Finally data came from the backend to the update item ", updateItem);
    dispatchTodoList({
      type: "EDIT_ITEM",
      payload: {
        task: itemToEdit.task,
        id: itemToEdit.id,
      },
    });
  };
  return (
    <TodoItemContext.Provider
      value={{
        todoList,
        addTodo,
        deleteTodo,
        markCompleted,
        updateItem,
      }}
    >
      {children}
    </TodoItemContext.Provider>
  );
};

export default TodoItemProvider;
