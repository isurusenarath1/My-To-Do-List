import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useTodos();
  
  // Sort todos by due date (ascending order)
  const sortedTodos = [...todos].sort((a, b) => {
    // Handle cases where due date might not be set
    if (!a.dueDate) return 1; // Items without due date go to the end
    if (!b.dueDate) return -1; // Items with due date come first
    
    // Compare due dates (ascending order - earlier dates first)
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList; 