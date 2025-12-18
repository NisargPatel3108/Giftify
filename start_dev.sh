#!/bin/bash

# Function to kill processes on exit
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT

echo "Starting Giftify Development Environment..."

# Check for node
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH."
    exit 1
fi

# Setup and start Backend
echo "Setting up Backend..."
cd server
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
echo "Starting Backend Server on port 3000..."
npm start &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start Frontend
echo "Starting Frontend..."
npm run dev
