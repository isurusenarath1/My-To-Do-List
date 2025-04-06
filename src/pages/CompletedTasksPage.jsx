import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import { useTodos } from '../context/TodoContext';

const CompletedTasksPage = () => {
  const { fetchCompletedTodos, todos, allTodos } = useTodos();
  // Count only the completed todos that aren't deleted
  const completedCount = todos.filter(todo => todo.completed && !todo.deleted).length;
  // Count deleted todos for the button using allTodos
  const deletedCount = allTodos.filter(todo => todo.deleted).length;
  
  // Fetch completed todos when the component mounts
  useEffect(() => {
    fetchCompletedTodos();
    // Adding empty dependency array ensures this runs only once on mount
  }, [fetchCompletedTodos]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Completed Tasks</h2>
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">({completedCount} items)</span>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            to="/deleted"
            className="btn bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900 dark:hover:bg-red-800 dark:text-red-100 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Trash ({deletedCount})
          </Link>
          
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
      </div>
      
      <TodoList showCompleted={true} showDeleted={false} />
    </div>
  );
};

export default CompletedTasksPage; 