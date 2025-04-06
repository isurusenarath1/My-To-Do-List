import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as todoApi from '../api/todoApi';
import axios from 'axios';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]); // Store all todos including deleted ones
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(true);

  // Check if backend is running
  const checkBackendConnection = useCallback(async () => {
    try {
      await todoApi.getTodos();
      setBackendConnected(true);
      return true;
    } catch (err) {
      console.error('Backend connection error:', err);
      setBackendConnected(false);
      setError('Could not connect to the server. Please make sure the backend is running.');
      return false;
    }
  }, []);

  // Fetch all todos from the API
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        return;
      }
      
      const data = await todoApi.getTodos();
      setTodos(data);
      
      // Also fetch all todos including deleted
      await fetchAllTodos();
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to fetch todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [checkBackendConnection]);

  // Fetch all todos including deleted ones
  const fetchAllTodos = useCallback(async () => {
    try {
      // Get regular todos
      const regular = await todoApi.getTodos();
      
      // Get deleted todos
      const deleted = await todoApi.getDeletedTodos();
      
      // Combine both sets
      setAllTodos([...regular, ...deleted]);
    } catch (err) {
      console.error('Error fetching all todos:', err);
    }
  }, []);

  // Fetch only active todos
  const fetchActiveTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        return;
      }
      
      const data = await todoApi.getActiveTodos();
      setTodos(data);
      
      // Also update all todos
      await fetchAllTodos();
    } catch (err) {
      console.error('Error fetching active todos:', err);
      setError('Failed to fetch active todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [checkBackendConnection, fetchAllTodos]);

  // Fetch only completed todos
  const fetchCompletedTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        return;
      }
      
      const data = await todoApi.getCompletedTodos();
      setTodos(data);
      
      // Also update all todos
      await fetchAllTodos();
    } catch (err) {
      console.error('Error fetching completed todos:', err);
      setError('Failed to fetch completed todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [checkBackendConnection, fetchAllTodos]);

  // Fetch only deleted todos
  const fetchDeletedTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        return;
      }
      
      // Use the API to get deleted todos
      const data = await todoApi.getDeletedTodos();
      setTodos(data);
      
      // Also update all todos
      await fetchAllTodos();
    } catch (err) {
      console.error('Error fetching deleted todos:', err);
      setError('Failed to fetch deleted todos. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [checkBackendConnection, fetchAllTodos]);

  // Load todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Add a new todo
  const addTodo = async (todo) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot add todo: Backend server is not connected');
      }
      
      const newTodo = await todoApi.createTodo(todo);
      setTodos(prevTodos => [...prevTodos, newTodo]);
      
      // Also update allTodos
      setAllTodos(prevTodos => [...prevTodos, newTodo]);
      
      return newTodo;
    } catch (err) {
      console.error('Error adding todo:', err);
      setError('Failed to add todo. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot update todo: Backend server is not connected');
      }
      
      const updated = await todoApi.updateTodo(id, updatedTodo);
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? updated : todo
        )
      );
      return updated;
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mark a todo as completed
  const markAsCompleted = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot mark todo as completed: Backend server is not connected');
      }
      
      const updated = await todoApi.markTodoAsCompleted(id);
      
      // Update in current todos array
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? updated : todo
        )
      );
      
      // Also update in allTodos
      setAllTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? {...todo, completed: true, completedAt: new Date()} : todo
        )
      );
      
      return updated;
    } catch (err) {
      console.error('Error marking todo as completed:', err);
      setError('Failed to mark todo as completed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Mark a todo as active
  const markAsActive = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot mark todo as active: Backend server is not connected');
      }
      
      const updated = await todoApi.markTodoAsActive(id);
      
      // Update in current todos array
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? updated : todo
        )
      );
      
      // Also update in allTodos
      setAllTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? {...todo, completed: false, completedAt: null} : todo
        )
      );
      
      return updated;
    } catch (err) {
      console.error('Error marking todo as active:', err);
      setError('Failed to mark todo as active. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Soft delete a todo (mark as deleted)
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot delete todo: Backend server is not connected');
      }
      
      // Call the API to soft delete the todo
      const deletedTodo = await todoApi.deleteTodo(id);
      
      // Remove the deleted todo from the current list
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      
      // Update the deleted todo in allTodos
      setAllTodos(prevTodos => 
        prevTodos.map(todo => todo._id === id ? { ...todo, deleted: true, deletedAt: new Date() } : todo)
      );
      
      return deletedTodo;
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Permanently delete a todo
  const permanentlyDeleteTodo = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot permanently delete todo: Backend server is not connected');
      }
      
      await todoApi.permanentlyDeleteTodo(id);
      
      // Remove from current todos
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      
      // Also remove from allTodos
      setAllTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      
    } catch (err) {
      console.error('Error permanently deleting todo:', err);
      setError('Failed to permanently delete todo. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Restore a deleted todo
  const restoreDeletedTodo = async (id) => {
    try {
      setLoading(true);
      setError(null);
      
      // First check if backend is connected
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        setLoading(false);
        throw new Error('Cannot restore todo: Backend server is not connected');
      }
      
      const restoredTodo = await todoApi.restoreDeletedTodo(id);
      
      // Remove from current todos list when in deleted view
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
      
      // Update in allTodos
      setAllTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? {...todo, deleted: false, deletedAt: null} : todo
        )
      );
      
      return restoredTodo;
    } catch (err) {
      console.error('Error restoring todo:', err);
      setError('Failed to restore todo. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      allTodos, // Provide the allTodos array
      loading, 
      error,
      backendConnected,
      addTodo, 
      updateTodo, 
      deleteTodo,
      markAsCompleted,
      markAsActive,
      fetchDeletedTodos,
      permanentlyDeleteTodo,
      restoreDeletedTodo,
      refreshTodos: fetchTodos,
      fetchActiveTodos,
      fetchCompletedTodos
    }}>
      {children}
    </TodoContext.Provider>
  );
}; 