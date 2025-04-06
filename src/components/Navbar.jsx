import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useTodos } from '../context/TodoContext';

const Navbar = () => {
  const location = useLocation();
  const { todos, allTodos } = useTodos();
  
  // Count active, completed, and deleted todos
  // Active count - only count non-completed, non-deleted todos
  const activeCount = allTodos.filter(todo => !todo.completed && !todo.deleted).length;
    
  // Completed count - only count completed, non-deleted todos
  const completedCount = allTodos.filter(todo => todo.completed && !todo.deleted).length;
    
  // Deleted count - all deleted todos
  const deletedCount = allTodos.filter(todo => todo.deleted).length;
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 mb-8">
      <div className="container mx-auto px-4 max-w-3xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Todo List</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-md font-medium flex items-center ${
              location.pathname === '/' 
                ? 'text-blue-600 dark:text-blue-400 underline' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Active
            {activeCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                {activeCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/add" 
            className={`text-md font-medium ${
              location.pathname === '/add' 
                ? 'text-blue-600 dark:text-blue-400 underline' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Add Task
          </Link>
          
          <Link 
            to="/completed" 
            className={`text-md font-medium flex items-center ${
              location.pathname === '/completed' 
                ? 'text-blue-600 dark:text-blue-400 underline' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Completed
            {completedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 text-xs rounded-full">
                {completedCount}
              </span>
            )}
          </Link>
          
          <Link 
            to="/deleted" 
            className={`text-md font-medium flex items-center ${
              location.pathname === '/deleted' 
                ? 'text-blue-600 dark:text-blue-400 underline' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Trash
            {deletedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-300 text-xs rounded-full">
                {deletedCount}
              </span>
            )}
          </Link>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 