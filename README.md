# My Todo List App

A simple, clean, and responsive Todo List application built with React, Vite, MongoDB Atlas, and Express.

## Features

- Create, Read, Update, and Delete todo items
- Each todo has a title, description, and due date
- Dark mode / light mode toggle
- Responsive design for all screen sizes
- Navigation between separate pages for task management
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
   git clone <repository-url>
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

After completing the setup, you can start the application with:

```
node start.js
```

Or using npm scripts:

```
npm run dev:all
```

This will start both the backend server and the frontend development server.

Windows users can also use the batch files:
- `setup-mongodb.bat` - To configure MongoDB connection
- `start-app.bat` - To start the application

### Testing MongoDB Connection

To test only the MongoDB connection:

```
npm run test-db
```

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
│   │   └── TaskListPage.jsx # Page for viewing tasks
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
- **Components**:
  - **TodoItem**: Displays a single task with editing/deletion capabilities
  - **TodoList**: Shows all available tasks
  - **TodoForm**: Form for adding/editing tasks
  - **ThemeToggle**: Button for switching between dark and light mode

## Backend Architecture

The backend is built with Express.js and connects to MongoDB Atlas to provide persistent storage for todo items. It follows a RESTful API design with the following endpoints:

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `GET /api/todos/:id` - Get a specific todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Troubleshooting

If you encounter issues:

1. **MongoDB Connection Problems**:
   - Ensure your MongoDB Atlas password is correct
   - Check that your IP address is whitelisted in MongoDB Atlas
   - Run `npm run test-db` to test the connection

2. **Application Won't Start**:
   - Ensure both frontend and backend dependencies are installed
   - Check the .env file exists with proper MongoDB URI
   - Ensure ports 5000 and 5173 are available

3. **Data Not Saving**:
   - Check browser console for API errors
   - Verify MongoDB connection is working
   - Check network tab in browser dev tools for API calls

## License

MIT
