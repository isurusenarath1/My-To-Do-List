import { Link } from 'react-router-dom';
import TodoList from '../components/TodoList';

const TaskListPage = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Available Tasks</h2>
        </div>
        
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
      
      <TodoList />
    </div>
  );
};

export default TaskListPage; 