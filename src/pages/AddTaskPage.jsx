import TodoForm from '../components/TodoForm';

const AddTaskPage = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Task</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Fill out the form below to create a new task</p>
      </div>
      
      <TodoForm />
    </div>
  );
};

export default AddTaskPage; 