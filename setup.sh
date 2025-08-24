#!/bin/bash

echo "🏥 Healthcare Voice Assistant Setup"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Create backend directory if it doesn't exist
if [ ! -d "backend" ]; then
    echo "📁 Creating backend directory..."
    mkdir -p backend
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/logs
mkdir -p backend/uploads

# Create environment files if they don't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating frontend .env file..."
    cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Healthcare Voice Assistant
EOF
fi

if [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cat > backend/.env << EOF
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/healthcare_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=30d

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-3.5-turbo

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_ROUNDS=12
SESSION_SECRET=your-session-secret

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# Health Check
HEALTH_CHECK_INTERVAL=300000
EOF
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Update backend/.env with your actual values:"
echo "   - MONGODB_URI (your MongoDB connection string)"
echo "   - JWT_SECRET (a secure random string)"
echo "   - OPENAI_API_KEY (your OpenAI API key)"
echo ""
echo "2. Start MongoDB (if using local installation):"
echo "   mongod"
echo ""
echo "3. Start the backend server:"
echo "   cd backend && npm run dev"
echo ""
echo "4. Start the frontend server:"
echo "   npm run dev"
echo ""
echo "5. Access the application:"
echo "   Frontend: http://localhost:5173"
echo "   Backend: http://localhost:5000"
echo "   Health Check: http://localhost:5000/health"
echo ""
echo "📚 For detailed setup instructions, see setup.md" 