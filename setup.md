# Healthcare Voice Assistant - Complete Setup Guide

This guide will help you set up the complete healthcare voice assistant application with both frontend and backend components.

## 🏗️ Project Structure

```
project/
├── src/                    # Frontend (React + TypeScript)
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   └── data/              # Static data
├── backend/               # Backend (Node.js + Express)
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── utils/         # Utility functions
│   │   └── types/         # TypeScript types
│   └── package.json       # Backend dependencies
└── package.json           # Frontend dependencies
```

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or MongoDB Atlas)
- **OpenAI API Key** (for AI health advice)
- **Git** (for version control)

### 2. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd project

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Configuration

#### Frontend Environment (.env)
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Healthcare Voice Assistant
```

#### Backend Environment (.env)
Create a `.env` file in the `backend` directory:

```env
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
```

### 4. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# On Windows: Download from https://www.mongodb.com/try/download/community
# On macOS: brew install mongodb-community
# On Ubuntu: sudo apt install mongodb

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in backend `.env`

### 5. Start the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
# In the root directory
npm run dev 
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🔧 Development Setup

### Frontend Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development

```bash
cd backend

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## 📊 Database Models

The application includes the following database models:

### User
- Authentication and authorization
- Role-based access control (patient, doctor, admin, staff)
- Password hashing with bcrypt

### Appointment
- Patient appointment management
- Status tracking (pending, confirmed, completed, cancelled)
- Doctor assignment and scheduling

### Doctor
- Doctor profiles and specializations
- Availability management
- Consultation fees and experience

### Patient
- Patient profiles and medical history
- Contact information and emergency contacts
- Health records and allergies

### MedicalReport
- Diagnosis and prescriptions
- Follow-up scheduling
- Report status tracking

## 🔐 Authentication Flow

1. **Registration**: Users can register with email/password
2. **Login**: JWT-based authentication
3. **Token Refresh**: Automatic token refresh
4. **Role-based Access**: Different permissions for different roles

## 🤖 AI Integration

### OpenAI Integration
- Health advice generation based on symptoms
- Multi-language support (English, Hindi, Marathi)
- Severity assessment and recommendations
- Doctor consultation recommendations

### Voice Assistant Features
- Speech-to-text conversion
- Text-to-speech response
- Multi-language voice support
- Offline fallback for basic symptoms

## 📱 Features

### For Patients
- Voice-based health consultation
- Appointment booking
- Health advice and recommendations
- Multi-language support
- Symptom tracking

### For Doctors
- Patient management
- Appointment scheduling
- Medical report creation
- Analytics and trends

### For Administrators
- Staff management
- System analytics
- User management
- System configuration

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Backend Deployment (Railway/Render)

```bash
cd backend

# Build the project
npm run build

# Deploy to Railway
railway up

# Or deploy to Render
# Connect your GitHub repository
```

### Environment Variables for Production

Update your production environment variables:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
OPENAI_API_KEY=your-openai-api-key
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## 🔍 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout user

### AI Health Assistant

- `POST /api/ai/health-advice` - Get health advice
- `POST /api/ai/track-symptom` - Track symptom
- `GET /api/ai/symptom-trends` - Get symptom trends

### Health Check

- `GET /health` - Server health status

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **CORS Errors**
   - Update `ALLOWED_ORIGINS` in backend `.env`
   - Ensure frontend URL is included

3. **JWT Token Issues**
   - Check JWT secret in `.env`
   - Verify token expiration settings
   - Clear browser localStorage

4. **OpenAI API Errors**
   - Verify API key is correct
   - Check API quota and billing
   - Ensure proper model configuration

### Debug Mode

Enable debug logging:

```bash
# Backend
NODE_ENV=development DEBUG=* npm run dev

# Frontend
VITE_DEBUG=true npm run dev
```

## 📈 Monitoring and Analytics

### Backend Logging
- Winston-based structured logging
- Error tracking and monitoring
- Performance metrics
- Request/response logging

### Frontend Analytics
- User interaction tracking
- Voice assistant usage
- Symptom trend analysis
- Performance monitoring

## 🔒 Security Considerations

- JWT token security
- Password hashing with bcrypt
- Rate limiting and DDoS protection
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support and questions:
- Open an issue in the repository
- Check the troubleshooting section
- Review the API documentation
- Contact the development team

---

**Happy Coding! 🚀** 