#!/bin/bash
# JustPlay Backend + Frontend Startup Script for Mac/Linux

echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║          🚀 JustPlay Startup Manager 🚀        ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Check if dependencies are installed
echo "[1/4] Checking dependencies..."

if [ ! -d "backend/node_modules" ]; then
    echo "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

if [ ! -d "frontend-app/node_modules" ]; then
    echo "Installing frontend dependencies..."
    cd frontend-app
    npm install
    cd ..
fi

echo "✓ Dependencies ready"
echo ""

# Start Backend in background
echo "[2/4] Starting Backend Server on port 8000..."
echo ""
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start Frontend
echo "[3/4] Starting Frontend Server on port 3000..."
echo ""
cd frontend-app
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "[4/4] Servers started!"
echo ""
echo "╔════════════════════════════════════════════════╗"
echo "║        ✅ Both Servers Are Running ✅          ║"
echo "╠════════════════════════════════════════════════╣"
echo "║                                                ║"
echo "║   Backend:  http://localhost:8000             ║"
echo "║   Frontend: http://localhost:3000             ║"
echo "║                                                ║"
echo "║   Frontend will auto-open in your browser     ║"
echo "║   Check browser console for any errors        ║"
echo "║                                                ║"
echo "║   Press Ctrl+C to stop both servers           ║"
echo "║                                                ║"
echo "╚════════════════════════════════════════════════╝"
echo ""

# Keep script running
wait
