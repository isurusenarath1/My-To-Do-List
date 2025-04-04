import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { TodoProvider } from './context/TodoContext';
import Navbar from './components/Navbar';
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <TodoProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <div className="container mx-auto px-4 py-6 max-w-3xl">
              <main>
                <Routes>
                  <Route path="/" element={<TaskListPage />} />
                  <Route path="/add" element={<AddTaskPage />} />
                </Routes>
              </main>
              
              <footer className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
                <p>My Todo List App - All Right Reserved - Copyright© Isuru Senarath</p>
              </footer>
            </div>
          </div>
        </TodoProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
