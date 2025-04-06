@echo off
echo ========================================
echo   MongoDB Atlas Setup Helper
echo ========================================
echo.
echo This script will help you set up your MongoDB Atlas connection.
echo.

set /p password="Enter your MongoDB Atlas password: "

echo.
echo Updating .env file with your password...
echo.

(
  echo # MongoDB Atlas Configuration
  echo MONGODB_URI=mongodb+srv://isurusenarath:%password%@tododb.cyj0ozm.mongodb.net/?retryWrites=true^&w=majority^&appName=todoDB
  echo PORT=5000
) > .env

echo .env file has been updated with your MongoDB password.
echo.
echo ========================================
echo   Testing Connection...
echo ========================================

node backend/test-db-connection.js
if %errorlevel% neq 0 (
  echo.
  echo Error: Failed to connect to MongoDB
  echo Please check your MongoDB Atlas credentials and try again
  echo.
  pause
  exit /b 1
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo You can now run the application using:
echo   npm run dev:all
echo.
echo Or by running:
echo   start-app.bat
echo.

pause 