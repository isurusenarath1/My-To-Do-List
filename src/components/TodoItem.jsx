import { useState } from 'react';
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { useTodos } from '../context/TodoContext';

const TodoItem = ({ todo }) => {
  const { deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTodo({ ...todo });
  };

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      await updateTodo(todo._id, editedTodo);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteTodo(todo._id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setIsDeleting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Format and style the due date
  const getDueDateInfo = () => {
    if (!todo.dueDate) return { 
      status: 'No due date', 
      formattedDate: '', 
      className: 'text-gray-500' 
    };
    
    const dueDate = new Date(todo.dueDate);
    const formattedDate = format(dueDate, 'MMM dd, yyyy');
    const daysUntilDue = differenceInDays(dueDate, new Date());
    
    // Check if due date is in the past
    if (isPast(dueDate) && !isToday(dueDate)) {
      return { 
        status: 'Overdue', 
        formattedDate,
        className: 'text-red-600 font-semibold' 
      };
    }
    
    // Check if due date is today
    if (isToday(dueDate)) {
      return { 
        status: 'Due Today!', 
        formattedDate,
        className: 'text-red-600 font-semibold' 
      };
    }
    
    // Check if due date is tomorrow
    if (isTomorrow(dueDate)) {
      return { 
        status: 'Due Tomorrow', 
        formattedDate,
        className: 'text-red-600 font-semibold' 
      };
    }
    
    // Apply new color pattern based on days remaining
    if (daysUntilDue <= 2) {
      // Red for tasks due within 2 days
      return { 
        status: `Due in ${daysUntilDue} days`, 
        formattedDate,
        className: 'text-red-600 font-semibold' 
      };
    } else if (daysUntilDue <= 5) {
      // Yellow for tasks due within 5 days
      return { 
        status: `Due in ${daysUntilDue} days`, 
        formattedDate,
        className: 'text-yellow-600 font-semibold' 
      };
    } else {
      // Green for all other tasks
      return { 
        status: `Due in ${daysUntilDue} days`,
        formattedDate, 
        className: 'text-green-600 font-semibold' 
      };
    }
  };

  const dueDateInfo = getDueDateInfo();
  
  // Format the creation date if available
  const formattedCreationDate = todo.createdAt
    ? format(new Date(todo.createdAt), 'MMM dd, yyyy h:mm a')
    : '';

  // Function to display text with line breaks
  const displayWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleChange}
            className="input w-full"
            placeholder="Title"
            disabled={isUpdating}
          />
          <textarea
            name="description"
            value={editedTodo.description}
            onChange={handleChange}
            className="input w-full"
            placeholder="Description"
            rows="3"
            disabled={isUpdating}
          ></textarea>
          <input
            type="date"
            name="dueDate"
            value={editedTodo.dueDate ? editedTodo.dueDate.split('T')[0] : ''}
            onChange={handleChange}
            className="input w-full"
            disabled={isUpdating}
          />
          <div className="flex space-x-2 mt-3">
            <button 
              onClick={handleSave} 
              className={`btn btn-primary ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isUpdating}
            >
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button 
              onClick={handleCancel} 
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              disabled={isUpdating}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{todo.title}</h3>
            <div className="text-right">
              <div className={`text-sm ${dueDateInfo.className} dark:text-opacity-90 font-medium`}>
                {dueDateInfo.status}
              </div>
              {dueDateInfo.formattedDate && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {dueDateInfo.formattedDate}
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-line">
            {todo.description}
          </p>
          {formattedCreationDate && (
            <div className="text-xs text-gray-500 dark:text-gray-500 mt-2">
              Created: {formattedCreationDate}
            </div>
          )}
          <div className="flex space-x-2 mt-4">
            <button 
              onClick={handleEdit} 
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              disabled={isDeleting}
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              className={`btn btn-danger ${isDeleting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem; 