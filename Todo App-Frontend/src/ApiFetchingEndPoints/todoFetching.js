const API_BASE_URL = "http://localhost:3000/api";

// Creating a new todo item at server
export const createTodoItemAtServer = async (todoData) => {
  console.log("Data received in createTodo function: ", todoData);
  try {
    const response = await fetch(`${API_BASE_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(todoData)
    });
    const data = await response.json();
    console.log("The data is ", data)
    return mapServerDataToFrontend(data);
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error;
  }
}

// Getting all todo items from server
export const fetchAllTodoItemsFromServer = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    const data = await response.json();
    console.log("Data received from server: ", data);
    return data.map(mapServerDataToFrontend);
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

// Deleting a todo item at server
export const deleteTodoItemAtServer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "DELETE"
    });
    const data = await response.json();
    console.log("Data received from server after deletion: ", data);
    return mapServerDataToFrontend(data);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;    
  }
}

// Adding data which is completed mark to completed field
export const AddToCompletedMarkToServer = async (id ) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todo/${id}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log("Data received from server after updating completion status: ", data);
    return mapServerDataToFrontend(data);
  } catch (error) {
    console.error("Error updating todo completion status:", error);
    throw error;
  }
}

// Edit Item at server
// export const editTodoItemAtServer = async (id, )
const mapServerDataToFrontend = (serverData) => {
  return {
    id: serverData._id,
    task: serverData.task,
    completed: serverData.completed,
    createdAt: serverData.createdAt,
    updatedAt: serverData.updatedAt
  } 
}