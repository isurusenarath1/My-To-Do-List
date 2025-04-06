@echo off
echo ========================================
echo   Testing MongoDB Connection...
echo ========================================
node backend/test-db-connection.js
if %errorlevel% neq 0 (
  echo.
  echo Error: Failed to connect to MongoDB
  echo Please check your .env file and ensure the MONGODB_URI is correct
  echo.
  pause
  exit /b 1
)

echo.
echo ========================================
echo   My Todo List App - Startup Guide
echo ========================================
echo.
echo The application needs to be started in two separate terminals:
echo.
echo 1. Start the backend server:
echo    Open a terminal and run:
echo    npm run server
echo.
echo 2. Start the frontend development server:
echo    Open another terminal and run:
echo    npm run dev
echo.
echo Once both are running, the Todo List app will be available at:
echo http://localhost:5173
echo.
echo Press Ctrl+C in each terminal to stop the servers when done.
echo.
pause 