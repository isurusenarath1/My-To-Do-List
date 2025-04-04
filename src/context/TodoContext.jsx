import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export const useTodos = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add a new todo
  const addTodo = (todo) => {
    setTodos(prevTodos => [
      ...prevTodos,
      { ...todo, id: Date.now().toString() }
    ]);
  };

  // Update an existing todo
  const updateTodo = (id, updatedTodo) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
}; 