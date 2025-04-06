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
echo   Starting My Todo List App...
echo ========================================
echo.
npm run dev:all
pause 