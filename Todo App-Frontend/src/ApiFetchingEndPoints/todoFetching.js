const API_BASE_URL = "http://localhost:3000/api";

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

const mapServerDataToFrontend = (serverData) => {
  return {
    id: serverData._id,
    task: serverData.task,
    completed: serverData.completed,
    createdAt: serverData.createdAt,
    updatedAt: serverData.updatedAt
  } 
}