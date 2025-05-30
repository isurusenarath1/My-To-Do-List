import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodos } from '../context/TodoContext';

const TodoForm = () => {
  const navigate = useNavigate();
  const { addTodo } = useTodos();
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    dueDate: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!todo.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await addTodo(todo);
      
      // Reset form
      setTodo({
        title: '',
        description: '',
        dueDate: ''
      });
      setError('');
      
      // Navigate to the task list page
      navigate('/');
    } catch (err) {
      setError('Failed to add todo. Please try again.');
      console.error('Error adding todo:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-8 p-5 border rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={todo.title}
            onChange={handleChange}
            className="input w-full"
            placeholder="What needs to be done?"
            disabled={isSubmitting}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={todo.description}
            onChange={handleChange}
            className="input w-full"
            placeholder="Add some details..."
            rows="3"
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={todo.dueDate}
            onChange={handleChange}
            className="input w-full"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            className={`btn btn-primary flex-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm; 