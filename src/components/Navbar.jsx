import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4 mb-8">
      <div className="container mx-auto px-4 max-w-3xl flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Todo List</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-md font-medium ${
              location.pathname === '/' 
                ? 'text-blue-600 dark:text-blue-400 underline' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Available Tasks
          </Link>
          
          <Link 
            to="/add" 
            className={`text-md font-medium ${
              location.pathname === '/add' 
                ? 'text-blue-600 dark:text-blue-400 underline' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
            }`}
          >
            Add New Task
          </Link>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 