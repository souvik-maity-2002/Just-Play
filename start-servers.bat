@echo off
REM JustPlay Backend + Frontend Startup Script for Windows

echo.
echo ╔════════════════════════════════════════════════╗
echo ║          🚀 JustPlay Startup Manager 🚀        ║
echo ╚════════════════════════════════════════════════╝
echo.

setlocal enabledelayedexpansion

REM Check if dependencies are installed
echo [1/4] Checking dependencies...
if not exist "backend\node_modules" (
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
)

if not exist "frontend-app\node_modules" (
    echo Installing frontend dependencies...
    cd frontend-app
    call npm install
    cd ..
)

echo ✓ Dependencies ready
echo.

REM Start Backend
echo [2/4] Starting Backend Server on port 8000...
echo.
start "JustPlay Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

REM Start Frontend
echo [3/4] Starting Frontend Server on port 3000...
echo.
start "JustPlay Frontend" cmd /k "cd frontend-app && npm run dev"

echo.
echo [4/4] Servers started!
echo.
echo ╔════════════════════════════════════════════════╗
echo ║        ✅ Both Servers Are Running ✅          ║
echo ╠════════════════════════════════════════════════╣
echo ║                                                ║
echo ║   Backend:  http://localhost:8000             ║
echo ║   Frontend: http://localhost:3000             ║
echo ║                                                ║
echo ║   Frontend will auto-open in your browser     ║
echo ║   Check browser console for any errors        ║
echo ║                                                ║
echo ╚════════════════════════════════════════════════╝
echo.

REM Keep window open
pause
