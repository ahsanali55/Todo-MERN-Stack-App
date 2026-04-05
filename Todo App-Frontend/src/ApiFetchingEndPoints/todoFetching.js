const API_BASE_URL = "http://localhost:3000/api";

// Creating a new todo item at server
export const createTodoItemAtServer = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    });
    const data = await response.json();
    return mapServerDataToFrontend(data);
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
};

// Getting all todo items from server
export const fetchAllTodoItemsFromServer = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    const data = await response.json();

    return data.map(mapServerDataToFrontend);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Deleting a todo item at server
export const deleteTodoItemAtServer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();

    return mapServerDataToFrontend(data);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

// Adding data which is completed mark to completed field
export const AddToCompletedMarkToServer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}/completed`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return mapServerDataToFrontend(data);
  } catch (error) {
    console.error("Error updating todo completion status:", error);
    throw error;
  }
};

// Update Item at server
export const updateTodoItemAtServer = async (task, id) => {
  ("Called edit ", task, id);
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    if (!data) {
      console.log("Data never submited successfully");
    }
    return mapServerDataToFrontend(data);
  } catch (error) {
    console.log("Error while updating todoItem ", error);
  }
};

const mapServerDataToFrontend = (serverData) => {
  return {
    id: serverData._id,
    task: serverData.task,
    completed: serverData.completed,
    createdAt: serverData.createdAt,
    updatedAt: serverData.updatedAt,
  };
};
