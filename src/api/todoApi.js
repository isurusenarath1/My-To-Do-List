import axios from 'axios';

// API base URL - default to localhost if environment variable is not available
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';

console.log('API base URL:', baseURL);

// Create axios instance with base URL and timeout
const api = axios.create({ 
  baseURL,
  timeout: 10000 // 10 seconds timeout
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // You can add any auth headers here if needed
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for better error handling
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout. Server might be down.');
      throw new Error('Connection timeout. The server is taking too long to respond.');
    }
    
    if (!error.response) {
      console.error('Network error. Server might be down or unreachable.');
      throw new Error('Could not connect to the server. Please make sure the backend is running or try again later.');
    }
    
    console.error('API error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Check connection to API
export const checkConnection = async () => {
  try {
    await api.get('/');
    return true;
  } catch (error) {
    console.error('API connection check failed:', error.message);
    return false;
  }
};

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