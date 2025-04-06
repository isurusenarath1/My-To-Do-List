import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos, loading, error, refreshTodos } = useTodos();
  
  // Sort todos by due date (ascending order)
  const sortedTodos = [...todos].sort((a, b) => {
    // Handle cases where due date might not be set
    if (!a.dueDate) return 1; // Items without due date go to the end
    if (!b.dueDate) return -1; // Items with due date come first
    
    // Compare due dates (ascending order - earlier dates first)
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  if (loading) {
    return (
      <div className="text-center p-10 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading tasks...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10 border rounded-lg bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400 mb-3">{error}</p>
        <button 
          onClick={refreshTodos} 
          className="text-sm px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:hover:bg-red-700 text-red-600 dark:text-red-200 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (sortedTodos.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTodos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList; 