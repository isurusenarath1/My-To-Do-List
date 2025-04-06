# My Todo List App

A simple, clean, and responsive Todo List application built with React, Vite, MongoDB Atlas, and Express.

## Features

- Create, Read, Update, and Delete todo items
- Each todo has a title, description, and due date
- Dark mode / light mode toggle
- Responsive design for all screen sizes
- Navigation between separate pages for task management
- Mark tasks as completed and view completed task history
- Trash bin for deleted tasks with restoration capability
- Data saved to MongoDB Atlas for persistence across sessions and devices
- Color-coded due dates for better task prioritization

## Technologies Used

- **Frontend**: React (with Vite build tool)
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API and Hooks
- **Date Formatting**: date-fns
- **Backend**: Express.js & Node.js
- **Database**: MongoDB Atlas
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account

### Setup and Configuration

1. Clone the repository
   ```
   git clone https://github.com/isurusenarath1/My-To-Do-List.git
   cd my-todo-list
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Set up MongoDB connection
   ```
   node setup.js
   ```
   This interactive script will:
   - Ask for your MongoDB Atlas password
   - Create and configure the .env file
   - Test the connection to MongoDB Atlas

### Running the Application

After completing the setup, you need to start both the backend and frontend in separate terminals:

1. Start the backend server:
```
npm run server
```

2. In a separate terminal, start the frontend:
```
npm run dev
```

This will start the backend server on port 5000 and the frontend development server on port 5173.

Windows users can also use the batch file:
- `setup-mongodb.bat` - To configure MongoDB connection
- `start-app.bat` - To see instructions for starting the application

### Testing MongoDB Connection

To test only the MongoDB connection:

```
npm run test-db
```

## Application Features

### Task Management

- **Active Tasks**: View all pending tasks sorted by due date
- **Add Task**: Create new tasks with title, description, and due date
- **Task History**: View completed tasks sorted by completion date
- **Trash Bin**: View deleted tasks with options to restore or permanently delete them

### Task Actions

- **Mark as Done**: Complete a task, moving it to the history page
- **Mark as Active**: Reactivate a completed task, moving it back to active tasks
- **Edit**: Modify a task's details
- **Delete**: Move a task to the trash bin
- **Restore**: Recover a deleted task from the trash bin
- **Permanently Delete**: Remove a task permanently from the trash bin

### Visual Indicators

- **Color-coded due dates**:
  - Red: Tasks due within 2 days
  - Yellow: Tasks due within 5 days
  - Green: Tasks due in more than 5 days
- **Status badges**:
  - Completed tasks are marked with a "Completed" badge
  - Deleted tasks are marked with a "Deleted" badge
- **Timestamps**: View creation, completion, and deletion dates for each task

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
│   ├── api/             # API services
│   │   └── todoApi.js   # Todo API service
│   ├── components/      # React components
│   │   ├── TodoForm.jsx # Form for adding/editing todos
│   │   ├── TodoItem.jsx # Individual todo item
│   │   ├── TodoList.jsx # List of todos
│   │   ├── ThemeToggle.jsx # Dark/light mode toggle
│   │   └── Navbar.jsx   # Navigation bar component
│   ├── pages/           # Application pages
│   │   ├── AddTaskPage.jsx # Page for adding new tasks
│   │   ├── TaskListPage.jsx # Page for viewing active tasks
│   │   ├── CompletedTasksPage.jsx # Page for viewing completed tasks
│   │   └── DeletedTasksPage.jsx # Page for viewing deleted tasks
│   ├── context/         # React Context
│   │   ├── ThemeContext.jsx # Dark/light mode context
│   │   └── TodoContext.jsx  # Todo data context
│   ├── App.jsx          # Main App component with routing
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles with Tailwind
├── backend/             # Backend code
│   ├── models/          # MongoDB models
│   │   └── Todo.js      # Todo schema
│   ├── routes/          # API routes
│   │   └── todos.js     # Todo routes
│   └── server.js        # Express server
├── setup.js             # MongoDB setup script (cross-platform)
├── start.js             # Application startup script (cross-platform)
├── setup-mongodb.bat    # MongoDB setup script (Windows)
├── start-app.bat        # Application startup script (Windows)
├── index.html           # HTML entry point
├── .env                 # Environment variables (created by setup script)
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

## Application Structure

- **Navbar**: Provides navigation between available tasks and adding new tasks
- **Pages**:
  - **Task List Page**: Displays all available tasks sorted by due date with a button to add new tasks
  - **Add Task Page**: Contains the form for creating new tasks
  - **Completed Tasks Page**: Displays completed tasks
  - **Deleted Tasks Page**: Displays deleted tasks
- **Components**:
  - **TodoItem**: Displays a single task with editing/deletion capabilities
  - **TodoList**: Shows all available tasks
  - **TodoForm**: Form for adding/editing tasks
  - **ThemeToggle**: Button for switching between dark and light mode

## Backend Architecture

The backend is built with Express.js and connects to MongoDB Atlas to provide persistent storage for todo items. It follows a RESTful API design with the following endpoints:

- `GET /api/todos` - Get all todos (can filter by completed or deleted status)
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Soft delete a todo (marks as deleted)
- `DELETE /api/todos/:id/permanent` - Permanently delete a todo
- `PATCH /api/todos/:id/restore` - Restore a deleted todo

## Troubleshooting

If you encounter issues:

1. **MongoDB Connection Problems**:
   - Ensure your MongoDB Atlas password is correct
   - Check that your IP address is whitelisted in MongoDB Atlas
   - Run `npm run test-db` to test the connection

2. **Application Not Starting**:
   - Check that both the frontend and backend are running
   - Frontend runs on port 3000 by default
   - Backend runs on port 5000 by default
   - Ensure no other applications are using these ports

3. **Missing Environment Variables**:
   - If you get environment variable errors, run the setup script again
   - Or manually create a .env file with MONGODB_URI variable
   
4. **Other Issues**:
   - Check the console for error messages
   - Try restarting the application
   - Ensure all dependencies are installed correctly

## License

MIT
