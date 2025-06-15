@echo off
echo ===============================
echo STUNTIFY DEVELOPMENT LAUNCHER
echo ===============================
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

echo Checking for node_modules...
if not exist node_modules (
    echo Installing Node.js dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Node.js dependencies!
        pause
        exit /b 1
    )
) else (
    echo Node.js dependencies already installed.
)

echo Checking Python dependencies...
pip show flask >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Python dependencies...
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Python dependencies!
        pause
        exit /b 1
    )
) else (
    echo Python dependencies already installed.
)

echo.
echo Starting Flask server on port 5000...
start cmd /k "title Flask Server && color 0A && python app.py"

echo Waiting for Flask to initialize...
timeout /t 3 /nobreak >nul

echo Starting Webpack dev server on port 3000...
start cmd /k "title Webpack Dev Server && color 0B && npx webpack serve --mode development --no-open"

echo.
echo ===============================
echo SERVERS STARTED SUCCESSFULLY!
echo ===============================
echo.
echo Flask API: http://localhost:5000
echo Webpack Dev Server: http://localhost:3000
echo.
echo Your browser should open automatically to http://localhost:3000
echo.
echo IMPORTANT: To stop the servers, close both command windows.
echo If you encounter any issues, run troubleshoot.bat
echo.

pause
