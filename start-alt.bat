@echo off
echo ===============================
echo STUNTIFY ALTERNATIVE LAUNCHER
echo ===============================
echo.
echo This script uses a different method to start the development servers
echo Use this if the regular start-dev.bat doesn't work
echo.

echo Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Checking Python installation...
where python >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH!
    echo Please install Python 3.x
    echo.
    pause
    exit /b 1
)

echo Checking if ports are already in use...
netstat -ano | findstr ":5000" >nul
if %errorlevel% equ 0 (
    echo WARNING: Port 5000 is already in use!
    echo Flask server may not start properly.
    echo.
)

netstat -ano | findstr ":3000" >nul
if %errorlevel% equ 0 (
    echo WARNING: Port 3000 is already in use!
    echo Webpack dev server may not start properly.
    echo.
)

echo.
echo Starting Flask server on port 5000...
start cmd /k "title Flask Server && color 0A && python app.py"

echo Waiting for Flask to initialize...
timeout /t 3 /nobreak >nul

echo Building webpack assets in watch mode...
start cmd /k "title Webpack Watch && color 0B && npx webpack --mode development --watch"

echo.
echo ===============================
echo SERVERS STARTED SUCCESSFULLY!
echo ===============================
echo.
echo Flask API and Web Server: http://localhost:5000
echo.
echo IMPORTANT: This mode uses Flask for both API and serving HTML.
echo Webpack will build assets but Flask will serve them.
echo.
echo IMPORTANT: To stop the servers, close both command windows.
echo If you encounter any issues, run troubleshoot.bat
echo.

pause
