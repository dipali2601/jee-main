#!/bin/bash

echo "========================================"
echo "JEE Main Mock Test - Setup Script"
echo "========================================"
echo ""

echo "[1/3] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "Error: Failed to install dependencies"
    exit 1
fi
echo ""

echo "[2/3] Dependencies installed successfully!"
echo ""

echo "[3/3] Starting development server..."
echo ""
echo "Your app will open at: http://localhost:3000"
echo ""
echo "Demo Admin Credentials:"
echo "Email: admin@jee.com"
echo "Password: admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

npm run dev
