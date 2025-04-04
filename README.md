# My Todo List App

A simple, clean, and responsive Todo List application built with React, Vite, and Tailwind CSS.

## Features

- Create, Read, Update, and Delete todo items
- Each todo has a title, description, and due date
- Dark mode / light mode toggle
- Responsive design for all screen sizes
- Navigation between separate pages for task management
- Data saved to local storage for persistence
- Color-coded due dates for better task prioritization

## Technologies Used

- **Frontend**: React (with Vite build tool)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API and Hooks
- **Date Formatting**: date-fns

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/isurusenarath1/My-To-Do-List.git
   cd my-todo-list
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

To build the application for production:

```
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
my-todo-list/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── TodoForm.jsx # Form for adding/editing todos
│   │   ├── TodoItem.jsx # Individual todo item
│   │   ├── TodoList.jsx # List of todos
│   │   ├── ThemeToggle.jsx # Dark/light mode toggle
│   │   └── Navbar.jsx   # Navigation bar component
│   ├── pages/           # Application pages
│   │   ├── AddTaskPage.jsx # Page for adding new tasks
│   │   └── TaskListPage.jsx # Page for viewing tasks
│   ├── context/         # React Context
│   │   ├── ThemeContext.jsx # Dark/light mode context
│   │   └── TodoContext.jsx  # Todo data context
│   ├── App.jsx          # Main App component with routing
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── index.html           # HTML entry point
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

## Application Structure

- **Navbar**: Provides navigation between available tasks and adding new tasks
- **Pages**:
  - **Task List Page**: Displays all available tasks sorted by due date with a button to add new tasks
  - **Add Task Page**: Contains the form for creating new tasks
- **Components**:
  - **TodoItem**: Displays a single task with editing/deletion capabilities
  - **TodoList**: Shows all available tasks
  - **TodoForm**: Form for adding/editing tasks
  - **ThemeToggle**: Button for switching between dark and light mode
