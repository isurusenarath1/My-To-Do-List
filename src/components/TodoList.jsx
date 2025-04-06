import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = ({ showCompleted = false, showDeleted = false }) => {
  const { todos, loading, error, refreshTodos, backendConnected } = useTodos();
  
  // Filter todos based on status - simplified logic
  const filteredTodos = todos.filter(todo => {
    // When showing deleted todos, only include todos that have deleted=true
    if (showDeleted) {
      return todo.deleted === true;
    }
    
    // For non-deleted todos, check completion status and make sure they're not deleted
    return todo.completed === showCompleted && !todo.deleted;
  });
  
  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // If showing deleted tasks, sort by deletion date (newest first)
    if (showDeleted) {
      return new Date(b.deletedAt || b.createdAt) - new Date(a.deletedAt || a.createdAt);
    }
    
    // If showing completed tasks, sort by completion date (newest first)
    if (showCompleted) {
      // Make sure to use completedAt, falling back to createdAt if needed
      return new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt);
    }
    
    // For active tasks: sort by due date (ascending)
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
      <div className="text-center p-10 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
        <p className="text-red-600 dark:text-red-400 font-medium">Error: {error}</p>
        <button 
          onClick={refreshTodos} 
          className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-800 dark:hover:bg-red-700 dark:text-red-100 rounded transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  if (!backendConnected) {
    return (
      <div className="text-center p-10 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
        <p className="text-orange-600 dark:text-orange-400 font-medium">
          Server Connection Failed
        </p>
        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">
          Please start the backend server and refresh this page.
        </p>
        <button 
          onClick={refreshTodos} 
          className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 dark:bg-orange-800 dark:hover:bg-orange-700 dark:text-orange-100 rounded transition-colors"
        >
          Retry Connection
        </button>
      </div>
    );
  }
  
  if (sortedTodos.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">
          {showDeleted
            ? "No deleted tasks yet. Tasks will appear here when you delete them."
            : showCompleted 
              ? "No completed tasks yet. Tasks will appear here once you mark them as done." 
              : "No pending tasks. Add a new task to get started!"}
        </p>
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