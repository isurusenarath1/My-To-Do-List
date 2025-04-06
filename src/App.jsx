import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider, useTodos } from './context/TodoContext';
import Navbar from './components/Navbar';
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import DeletedTasksPage from './pages/DeletedTasksPage';
import { useEffect, useState } from 'react';
import { checkConnection } from './api/todoApi';
import './index.css';

// Loading indicator component
const LoadingIndicator = () => {
  const { loading } = useTodos();
  
  if (!loading) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1.5 bg-blue-100 overflow-hidden z-50">
      <div className="h-full bg-blue-600 w-full animate-pulse-x"></div>
    </div>
  );
};

// Backend Connection Error component
const BackendConnectionError = ({ isConnected, retryConnection }) => {
  if (isConnected) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
          Backend Connection Error
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Could not connect to the server. This could be because:
        </p>
        <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-4">
          <li>The backend server is not running</li>
          <li>There is a network issue</li>
          <li>The API URL is incorrect</li>
        </ul>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Current API URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos'}
        </p>
        <div className="flex justify-end">
          <button 
            onClick={retryConnection}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
};

// App Container that uses the TodoContext
const AppContent = () => {
  const { error, loading, backendConnected } = useTodos();
  const [showConnectionError, setShowConnectionError] = useState(false);
  
  // Check backend connection
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!backendConnected) {
        setShowConnectionError(true);
      }
    }, 2000); // Show error after 2 seconds if backend is not connected
    
    return () => clearTimeout(timer);
  }, [backendConnected]);
  
  const handleRetryConnection = async () => {
    const isConnected = await checkConnection();
    if (isConnected) {
      setShowConnectionError(false);
      window.location.reload(); // Reload the page to refresh data
    }
  };
  
  return (
    <>
      <LoadingIndicator />
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
        {error && !loading && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
            {error}
          </div>
        )}
        
        <main>
          <Routes>
            <Route path="/" element={<TaskListPage />} />
            <Route path="/add" element={<AddTaskPage />} />
            <Route path="/completed" element={<CompletedTasksPage />} />
            <Route path="/deleted" element={<DeletedTasksPage />} />
          </Routes>
        </main>
        
        <footer className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>My Todo List App - All Right Reserved - Copyright© Isuru Senarath</p>
        </footer>
      </div>
      
      <BackendConnectionError 
        isConnected={backendConnected || !showConnectionError} 
        retryConnection={handleRetryConnection}
      />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TodoProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <AppContent />
          </div>
        </TodoProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
