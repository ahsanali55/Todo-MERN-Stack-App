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
    return (newTodo = newTodo.map((todo) => {
      if (todo.id === action.payload.id) {
        return action.payload;
      }
      return todo;
    }));
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

  const addTodo = async (item) => {
    const newTodo = await createTodoItemAtServer({ item });

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

    dispatchTodoList({
      type: "DELETE_ITEM",
      payload: {
        id: deletedTodo.id,
      },
    });
  };

  // Update item
  const markCompleted = async (id) => {
    id;
    const updatedTodo = await AddToCompletedMarkToServer(id);

    dispatchTodoList({
      type: "UPDATE_CHECKED",
      payload: {
        updatedTodo: updatedTodo,
      },
    });
  };
  // Update item
  const updateItem = async (task, id) => {
    const itemToEdit = await updateTodoItemAtServer({ task }, id);

    dispatchTodoList({
      type: "EDIT_ITEM",
      payload: {
        ...itemToEdit,
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
