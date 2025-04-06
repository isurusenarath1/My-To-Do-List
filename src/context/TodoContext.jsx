import { createContext, useContext, useEffect, useState } from 'react';
import * as todoApi from '../api/todoApi';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from the API
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await todoApi.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (todo) => {
    try {
      setLoading(true);
      const newTodo = await todoApi.createTodo(todo);
      setTodos(prevTodos => [...prevTodos, newTodo]);
      return newTodo;
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      setLoading(true);
      const updated = await todoApi.updateTodo(id, updatedTodo);
      setTodos(prevTodos => 
        prevTodos.map(todo => 
          todo._id === id ? updated : todo
        )
      );
      return updated;
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      setLoading(true);
      await todoApi.deleteTodo(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      loading, 
      error, 
      addTodo, 
      updateTodo, 
      deleteTodo,
      refreshTodos: fetchTodos 
    }}>
      {children}
    </TodoContext.Provider>
  );
}; 