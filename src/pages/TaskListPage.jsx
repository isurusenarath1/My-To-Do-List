import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import { useTodos } from '../context/TodoContext';

const TaskListPage = () => {
  const { fetchActiveTodos, todos, allTodos } = useTodos();
  // Count only active todos for the header
  const activeCount = todos.filter(todo => !todo.completed && !todo.deleted).length;
  // Count completed todos for the button
  const completedCount = allTodos.filter(todo => todo.completed && !todo.deleted).length;
  // Count deleted todos for the button
  const deletedCount = allTodos.filter(todo => todo.deleted).length;
  
  // Fetch active todos when the component mounts
  useEffect(() => {
    fetchActiveTodos();
    // Adding empty dependency array ensures this runs only once on mount
  }, [fetchActiveTodos]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Active Tasks</h2>
          <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">({activeCount} items)</span>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            to="/completed"
            className="btn bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-100 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed ({completedCount})
          </Link>
          
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
            to="/add"
            className="btn btn-primary flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Task
          </Link>
        </div>
      </div>
      
      <TodoList showCompleted={false} showDeleted={false} />
    </div>
  );
};

export default TaskListPage; 