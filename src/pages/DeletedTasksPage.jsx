import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import { useTodos } from '../context/TodoContext';

const DeletedTasksPage = () => {
  const { fetchDeletedTodos, todos, allTodos } = useTodos();
  
  // Fetch deleted todos when the component mounts
  useEffect(() => {
    fetchDeletedTodos();
  }, [fetchDeletedTodos]);
  
  // Count deleted todos from todos which should contain only deleted ones on this page
  const deletedCount = todos.length;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Deleted Tasks</h2>
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">({deletedCount} items)</span>
        </div>
        
        <Link 
          to="/"
          className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Back to Tasks
        </Link>
      </div>
      
      <TodoList showDeleted={true} />
    </div>
  );
};

export default DeletedTasksPage; 