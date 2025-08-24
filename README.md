# 🏥 Healthcare Voice Assistant

A comprehensive healthcare voice assistant application with AI-powered health advice, appointment management, and multi-language support. Built with React, TypeScript, Node.js, and MongoDB.

## ✨ Features

- 🎤 **Voice Assistant**: Speech-to-text and text-to-speech health consultations
- 🤖 **AI Health Advice**: OpenAI-powered symptom analysis and recommendations
- 📅 **Appointment Management**: Complete appointment booking and tracking system
- 👥 **Multi-User System**: Patient, Doctor, and Admin roles with role-based access
- 🌍 **Multi-Language Support**: English, Hindi, and Marathi
- 📊 **Analytics Dashboard**: Symptom trends and usage analytics
- 🔐 **Secure Authentication**: JWT-based authentication with refresh tokens
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Voice**: Web Speech API
- **Build Tool**: Vite

### Backend (Node.js + Express)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **AI Integration**: OpenAI API
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- OpenAI API Key

### Installation

1. **Clone and Setup**
```bash
git clone <repository-url>
   cd project
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Configure Environment**
   ```bash
   # Update backend/.env with your values
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secure-jwt-secret
   OPENAI_API_KEY=your-openai-api-key
   ```

3. **Start the Application**
```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 📱 Features Overview

### For Patients
- **Voice Health Consultation**: Speak your symptoms and get AI-powered advice
- **Appointment Booking**: Schedule appointments with doctors
- **Health Tracking**: Monitor symptoms and health trends
- **Multi-language Support**: Use the app in English, Hindi, or Marathi

### For Doctors
- **Patient Management**: View and manage patient appointments
- **Medical Reports**: Create and update patient medical reports
- **Analytics Dashboard**: View patient trends and system analytics
- **Appointment Scheduling**: Manage availability and appointments

### For Administrators
- **Staff Management**: Manage doctors, nurses, and staff
- **System Analytics**: Monitor system usage and performance
- **User Management**: Manage all user accounts and permissions
- **System Configuration**: Configure application settings

## 🔧 Development

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

# Start development server
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

- **User**: Authentication and role management
- **Patient**: Patient profiles and medical history
- **Doctor**: Doctor profiles and specializations
- **Appointment**: Appointment scheduling and management
- **MedicalReport**: Diagnosis and treatment records
- **Staff**: Staff management and permissions

## 🔐 Authentication & Security

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: Different permissions for patients, doctors, and admins
- **Password Security**: bcrypt hashing for password protection
- **Rate Limiting**: Protection against abuse and DDoS
- **CORS Protection**: Secure cross-origin requests
- **Input Validation**: Comprehensive request validation

## 🤖 AI Integration

### OpenAI Health Assistant
- Symptom analysis and health advice
- Severity assessment (low, medium, high)
- Doctor consultation recommendations
- Multi-language health advice

### Voice Assistant Features
- Speech-to-text conversion
- Text-to-speech response
- Multi-language voice support
- Offline fallback for basic symptoms

## 📈 Analytics & Monitoring

### Backend Analytics
- Request/response logging
- Error tracking and monitoring
- Performance metrics
- User activity tracking

### Frontend Analytics
- Voice assistant usage tracking
- Symptom trend analysis
- User interaction analytics
- Performance monitoring

## 🚀 Deployment

### Frontend Deployment
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Backend Deployment
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
```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
OPENAI_API_KEY=your-openai-api-key
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## 🔍 API Documentation

### Authentication
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
1. **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
2. **CORS Errors**: Update `ALLOWED_ORIGINS` in backend `.env`
3. **JWT Issues**: Check JWT secret and token expiration settings
4. **OpenAI API**: Verify API key and quota

### Debug Mode
```bash
# Backend
NODE_ENV=development DEBUG=* npm run dev

# Frontend
VITE_DEBUG=true npm run dev
```

## 📚 Documentation

- [Complete Setup Guide](setup.md)
- [Backend Documentation](backend/README.md)
- [API Documentation](backend/README.md#api-documentation)
- [Deployment Guide](setup.md#deployment)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📖 [Documentation](setup.md)
- 🐛 [Report Issues](https://github.com/your-repo/issues)
- 💬 [Discussions](https://github.com/your-repo/discussions)
- 📧 [Contact](mailto:support@healthcare-voice-assistant.com)

## 🙏 Acknowledgments

- OpenAI for AI health advice capabilities
- MongoDB for database management
- React and Vite for frontend framework
- Express.js for backend framework
- All contributors and supporters

---

**Made with ❤️ for better healthcare accessibility**