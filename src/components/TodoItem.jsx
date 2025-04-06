import { useState, useEffect, useRef } from 'react';
import { format, isPast, isToday, isTomorrow, differenceInDays } from 'date-fns';
import { useTodos } from '../context/TodoContext';
import { createPortal } from 'react-dom';

const TodoItem = ({ todo }) => {
  const { 
    updateTodo, 
    deleteTodo, 
    markAsCompleted, 
    markAsActive, 
    permanentlyDeleteTodo, 
    restoreDeletedTodo 
  } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [isPermanentlyDeleting, setIsPermanentlyDeleting] = useState(false);
  
  // For status dropdown
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const statusButtonRef = useRef(null);
  const statusMenuRef = useRef(null);

  // Calculate position for dropdown when it's shown
  useEffect(() => {
    if (showStatusMenu && statusButtonRef.current) {
      const buttonRect = statusButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: buttonRect.top,
        left: buttonRect.left
      });
    }
  }, [showStatusMenu]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showStatusMenu && 
        statusMenuRef.current && 
        !statusMenuRef.current.contains(event.target) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(event.target)
      ) {
        setShowStatusMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStatusMenu]);

  // Hide dropdown when the component unmounts
  useEffect(() => {
    return () => {
      setShowStatusMenu(false);
    };
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : ''
    });
  };

  const handleSave = async () => {
    try {
      setIsCompleting(true);
      await updateTodo(todo._id, editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsCompleting(false);
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

  const handleMarkDone = async (e) => {
    e.stopPropagation();
    try {
      setIsCompleting(true);
      await markAsCompleted(todo._id);
    } catch (error) {
      console.error('Failed to mark todo as done:', error);
    } finally {
      setIsCompleting(false);
      setShowStatusMenu(false);
    }
  };

  const handleMarkActive = async (e) => {
    e.stopPropagation();
    try {
      setIsCompleting(true);
      await markAsActive(todo._id);
    } catch (error) {
      console.error('Failed to mark todo as active:', error);
    } finally {
      setIsCompleting(false);
      setShowStatusMenu(false);
    }
  };

  const toggleStatusMenu = (e) => {
    e.stopPropagation();
    setShowStatusMenu(!showStatusMenu);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
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

  // Dropdown portal component
  const StatusDropdown = () => {
    if (!showStatusMenu) return null;
    
    return createPortal(
      <div 
        ref={statusMenuRef}
        className="status-dropdown"
        style={{
          position: 'absolute',
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`,
        }}
      >
        <div className="py-1" role="menu" aria-orientation="vertical">
          <button
            onClick={handleMarkDone}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${todo.completed ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200'}`}
            role="menuitem"
            disabled={isCompleting || todo.completed}
          >
            {todo.completed ? '✓ Completed' : 'Mark as Complete'}
          </button>
          <button
            onClick={handleMarkActive}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${!todo.completed ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-200'}`}
            role="menuitem"
            disabled={isCompleting || !todo.completed}
          >
            {!todo.completed ? '✓ Active' : 'Mark as Incomplete'}
          </button>
        </div>
      </div>,
      document.body
    );
  };

  // Handle restoration of deleted todo
  const handleRestore = async () => {
    try {
      setIsRestoring(true);
      await restoreDeletedTodo(todo._id);
    } catch (error) {
      console.error('Error restoring todo:', error);
    } finally {
      setIsRestoring(false);
    }
  };

  // Handle permanent deletion of todo
  const handlePermanentDelete = async () => {
    if (window.confirm("Are you sure you want to permanently delete this task? This action cannot be undone.")) {
      try {
        setIsPermanentlyDeleting(true);
        await permanentlyDeleteTodo(todo._id);
      } catch (error) {
        console.error('Error permanently deleting todo:', error);
      } finally {
        setIsPermanentlyDeleting(false);
      }
    }
  };

  return isEditing ? (
    <div className="space-y-3">
      <input
        type="text"
        name="title"
        value={editForm.title}
        onChange={handleChange}
        className="input w-full"
        placeholder="Title"
        disabled={isCompleting}
      />
      <textarea
        name="description"
        value={editForm.description}
        onChange={handleChange}
        className="input w-full"
        placeholder="Description"
        rows="3"
        disabled={isCompleting}
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={editForm.dueDate}
        onChange={handleChange}
        className="input w-full"
        disabled={isCompleting}
      />
      <div className="flex space-x-2 mt-3">
        <button 
          onClick={handleSave} 
          className={`btn btn-primary ${isCompleting ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isCompleting}
        >
          {isCompleting ? 'Saving...' : 'Save'}
        </button>
        <button 
          onClick={handleCancel} 
          className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          disabled={isCompleting}
        >
          Cancel
        </button>
      </div>
    </div>
  ) : (
    <div className={`p-4 border rounded-lg shadow-sm transition-colors duration-200 
      ${todo.deleted 
        ? 'bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-700' 
        : todo.completed 
          ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' 
          : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'}`}>
      {todo.completed && !todo.deleted && (
        <div className="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
          Completed
        </div>
      )}
      {todo.deleted && (
        <div className="mb-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
          Deleted
        </div>
      )}
      <div className="flex justify-between items-start">
        <h3 className={`text-lg font-semibold ${
          todo.deleted 
            ? 'text-gray-500 dark:text-gray-400'
            : todo.completed 
              ? 'text-gray-600 dark:text-gray-300'
              : 'text-gray-800 dark:text-white'
        }`}>
          {todo.title}
        </h3>
        <div className="text-right">
          <div className={`text-sm ${dueDateInfo.className} dark:text-opacity-90 font-medium ${todo.deleted ? 'opacity-60' : ''}`}>
            {dueDateInfo.status}
          </div>
          {dueDateInfo.formattedDate && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {dueDateInfo.formattedDate}
            </div>
          )}
        </div>
      </div>
      <p className={`mt-2 whitespace-pre-line ${
        todo.deleted 
          ? 'text-gray-500 dark:text-gray-500'
          : 'text-gray-700 dark:text-gray-300'
      }`}>
        {displayWithLineBreaks(todo.description)}
      </p>
      
      {/* Date information */}
      <div className="text-xs mt-2 space-y-1">
        {formattedCreationDate && (
          <div className="text-gray-500 dark:text-gray-500">
            Created: {formattedCreationDate}
          </div>
        )}
        
        {todo.completedAt && (
          <div className="text-green-600 dark:text-green-400">
            Completed: {format(new Date(todo.completedAt), 'MMM dd, yyyy h:mm a')}
          </div>
        )}
        
        {todo.deletedAt && (
          <div className="text-red-600 dark:text-red-400">
            Deleted: {format(new Date(todo.deletedAt), 'MMM dd, yyyy h:mm a')}
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="mt-4 flex justify-end space-x-2">
        {!todo.deleted ? (
          <>
            <button
              ref={statusButtonRef}
              onClick={toggleStatusMenu}
              className={`px-3 py-1.5 rounded text-sm font-medium flex items-center ${
                todo.completed
                  ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800'
              }`}
              disabled={isCompleting}
            >
              <span>Status</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1.5 bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 rounded text-sm font-medium"
            >
              Edit
            </button>
            
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800 rounded text-sm font-medium flex items-center"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleRestore}
              className="px-3 py-1.5 bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700 rounded text-sm font-medium flex items-center"
              disabled={isRestoring}
            >
              {isRestoring ? 'Restoring...' : 'Restore'}
            </button>
            
            <button
              onClick={handlePermanentDelete}
              className="px-3 py-1.5 bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800 rounded text-sm font-medium flex items-center"
              disabled={isPermanentlyDeleting}
            >
              {isPermanentlyDeleting ? 'Deleting...' : 'Delete Permanently'}
            </button>
          </>
        )}
      </div>
      
      <StatusDropdown />
    </div>
  );
};

export default TodoItem; 