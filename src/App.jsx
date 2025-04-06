import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider, useTodos } from './context/TodoContext';
import Navbar from './components/Navbar';
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import CompletedTasksPage from './pages/CompletedTasksPage';
import DeletedTasksPage from './pages/DeletedTasksPage';
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

// App Container that uses the TodoContext
const AppContent = () => {
  return (
    <>
      <LoadingIndicator />
      <Navbar />
      <div className="container mx-auto px-4 py-6 max-w-3xl">
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
