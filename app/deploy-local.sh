#!/bin/bash

# Local Llama 3.2 Deployment Script for Montreal Restaurant Guide
# This script helps you set up and run the application with local Llama 3.2

set -e

echo "🚀 Setting up Montreal Restaurant Guide with Local Llama 3.2"
echo "=========================================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the 'app' directory"
    exit 1
fi

# Step 1: Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Step 2: Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo ""
    echo "⚙️  Creating .env.local file..."
    cat > .env.local << EOF
# Local Llama 3.2 Configuration
LLAMA_API_URL=http://localhost:11434/api/generate
LLAMA_MODEL=llama3.2
EOF
    echo "✅ Created .env.local with default configuration"
    echo "   You can edit this file to customize your setup"
else
    echo "✅ .env.local already exists"
fi

# Step 3: Test Llama connection
echo ""
echo "🧪 Testing Llama 3.2 connection..."
if npm run test-llama; then
    echo "✅ Llama 3.2 connection successful!"
else
    echo ""
    echo "⚠️  Llama 3.2 connection failed. Please ensure:"
    echo "   1. Your local Llama server is running"
    echo "   2. The API endpoint is correct in .env.local"
    echo "   3. The model name matches your installation"
    echo ""
    echo "   For Ollama users:"
    echo "   - Run: ollama serve"
    echo "   - Check models: ollama list"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Step 4: Start the development server
echo ""
echo "🌐 Starting development server..."
echo "   The app will be available at: http://localhost:3000"
echo "   Press Ctrl+C to stop the server"
echo ""

npm run dev 