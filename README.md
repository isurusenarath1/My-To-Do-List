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

3. Run the application
   ```
   npm start
   ```

   On first run, you'll be prompted to:
   - Enter your MongoDB Atlas password
   - The application will automatically create the .env file
   - Test the MongoDB connection
   - Start both backend and frontend servers

### Running the Application

After initial setup, just run:

```
npm start
```

This will:
1. Test your MongoDB connection (or set it up if not configured)
2. Start the backend server (on port 5000)
3. Start the frontend development server (on port 5173)
4. Display color-coded logs in a single terminal

The application will be available at http://localhost:5173 in your browser.

**Note:** Press Ctrl+C to stop both servers when you're done.

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

To build the frontend React application with Vite for production use:

```
npm run build
```

This will build the frontend React application with Vite for production use.

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
├── run-all.js           # All-in-one startup script (backend, frontend)
├── index.html           # HTML entry point
├── .env                 # Environment variables
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
   - Ensure your MongoDB Atlas password is correct in the `.env` file
   - Check that your IP address is whitelisted in MongoDB Atlas
   - Verify the connection string format in your `.env` file

2. **Application Not Starting**:
   - Check that both the frontend and backend are running
   - Frontend runs on port 5173 by default (using Vite)
   - Backend runs on port 5000 by default
   - Ensure no other applications are using these ports

3. **Missing Environment Variables**:
   - Make sure your `.env` file exists in the root directory
   - Ensure it contains the following variables:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@tododb.cyj0ozm.mongodb.net/?retryWrites=true&w=majority&appName=todoDB
     PORT=5000
     VITE_API_URL=http://localhost:5000/api/todos
     ```
   
4. **Other Issues**:
   - Check the console for error messages
   - Try restarting the application with `npm start`
   - Ensure all dependencies are installed correctly with `npm install`

## License

MIT
