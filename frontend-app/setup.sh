#!/bin/bash
# Quick Start Guide for JustPlay Frontend

echo "🚀 Setting up JustPlay Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your backend URL if needed."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run dev     - Start development server (http://localhost:3000)"
echo "  npm run build   - Build for production"
echo "  npm run preview - Preview production build"
echo ""
echo "To start the development server, run: npm run dev"
