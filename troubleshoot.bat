@echo off
echo ========== STUNTIFY APP TROUBLESHOOTER ==========
echo.
echo This script will help diagnose and fix connection issues
echo.

echo Step 1: Checking if required ports are free...
netstat -ano | findstr ":5000" > nul
if %errorlevel% equ 0 (
    echo WARNING: Port 5000 is already in use by another process
    echo You may need to close that process before running Flask
    echo.
) else (
    echo Port 5000 is free and available for Flask
    echo.
)

netstat -ano | findstr ":3000" > nul
if %errorlevel% equ 0 (
    echo WARNING: Port 3000 is already in use by another process
    echo You may need to close that process before running webpack-dev-server
    echo.
) else (
    echo Port 3000 is free and available for webpack-dev-server
    echo.
)

echo Step 2: Checking Node.js installation...
where node > nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
) else (
    echo Node version:
    node -v
    echo NPM version:
    npm -v
    echo Webpack CLI version:
    npx webpack-cli --version
    echo Webpack Dev Server version:
    npx webpack-dev-server --version
    echo Node.js and related tools are installed
    echo.
)

echo Step 3: Checking NPM packages...
if not exist node_modules (
    echo WARNING: node_modules folder not found
    echo You need to install packages first with: npm install
    echo.
) else (
    echo Node modules folder exists
    echo.
)

echo Step 4: Checking Python installation...
where python > nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo.
) else (
    python --version
    echo Python is properly installed
    echo.
)

echo Step 5: Verifying Flask installation...
python -c "import flask; print(f'Flask version {flask.__version__} installed')" 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Flask is not installed
    echo Run: pip install -r requirements.txt
    echo.
) else (
    echo Flask is properly installed
    echo.
)

echo Step 6: Verifying model files...
if not exist stunting_model.pkl (
    echo WARNING: stunting_model.pkl not found
    echo You may need to run: python train_model.py
    echo.
) else (
    echo ML model files exist
    echo.
)

echo =========== TROUBLESHOOTING COMPLETE ===========
echo.
echo Recommended fixes:
echo.
echo 1. If any ports are in use:
echo    - Find the process using: netstat -ano ^| findstr ":PORT"
echo    - Close the process using: taskkill /PID PROCESS_ID /F
echo.
echo 2. If Node.js packages are missing:
echo    - Run: npm install
echo.
echo 3. If Python packages are missing:
echo    - Run: pip install -r requirements.txt
echo.
echo 4. Once all checks pass, try running the app with:
echo    - Run: start-dev.bat
echo.
echo 5. Access the application at:
echo    - Flask direct: http://localhost:5000
echo    - Webpack dev server: http://localhost:3000
echo.

pause
