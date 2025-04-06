import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import { useTodos } from '../context/TodoContext';

const AddTaskPage = () => {
  const { refreshTodos } = useTodos();
  
  // Fetch all todos when component mounts
  useEffect(() => {
    refreshTodos();
  }, [refreshTodos]);
  
  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Task</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Fill out the form below to create a new task</p>
        </div>
        
        <div className="flex space-x-3">
          <Link 
            to="/"
            className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Tasks
          </Link>
        </div>
      </div>
      
      <TodoForm />
    </div>
  );
};

export default AddTaskPage; 