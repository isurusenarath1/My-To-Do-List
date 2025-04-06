import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getTodos = async (params = {}) => {
  try {
    const response = await api.get('/', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const getCompletedTodos = async () => {
  try {
    return await getTodos({ completed: 'true' });
  } catch (error) {
    console.error('Error fetching completed todos:', error);
    throw error;
  }
};

export const getActiveTodos = async () => {
  try {
    return await getTodos({ completed: 'false' });
  } catch (error) {
    console.error('Error fetching active todos:', error);
    throw error;
  }
};

export const getDeletedTodos = async () => {
  try {
    return await getTodos({ deleted: 'true' });
  } catch (error) {
    console.error('Error fetching deleted todos:', error);
    throw error;
  }
};

export const createTodo = async (todo) => {
  try {
    const response = await api.post('/', todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

export const updateTodo = async (id, updatedTodo) => {
  try {
    const response = await api.patch(`/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const markTodoAsCompleted = async (id) => {
  try {
    return await updateTodo(id, { completed: true });
  } catch (error) {
    console.error('Error marking todo as completed:', error);
    throw error;
  }
};

export const markTodoAsActive = async (id) => {
  try {
    return await updateTodo(id, { completed: false });
  } catch (error) {
    console.error('Error marking todo as active:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const permanentlyDeleteTodo = async (id) => {
  try {
    const response = await api.delete(`/${id}/permanent`);
    return response.data;
  } catch (error) {
    console.error('Error permanently deleting todo:', error);
    throw error;
  }
};

export const restoreDeletedTodo = async (id) => {
  try {
    const response = await api.patch(`/${id}/restore`);
    return response.data;
  } catch (error) {
    console.error('Error restoring todo:', error);
    throw error;
  }
}; 