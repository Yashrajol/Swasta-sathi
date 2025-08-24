# Healthcare Backend

A comprehensive Node.js/Express backend for the healthcare voice assistant application with AI integration, authentication, and database management.

## Features

- 🔐 **Authentication & Authorization**: JWT-based authentication with role-based access control
- 🤖 **AI Integration**: OpenAI-powered health advice generation
- 📊 **Database Management**: MongoDB with Mongoose ODM
- 📝 **Input Validation**: Express-validator for request validation
- 🔒 **Security**: Helmet, CORS, rate limiting, and security headers
- 📈 **Logging**: Winston-based structured logging
- 🚀 **Performance**: Compression and optimization middleware
- 📱 **Multi-language Support**: English, Hindi, and Marathi

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **AI**: OpenAI API
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Validation**: express-validator
- **Logging**: Winston
- **Email**: Nodemailer
- **SMS**: Twilio

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud)
- OpenAI API key
- (Optional) Twilio account for SMS
- (Optional) Gmail account for email notifications

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/healthcare_db
   JWT_SECRET=your-super-secret-jwt-key
   OPENAI_API_KEY=your-openai-api-key
   ```

4. **Create required directories**
   ```bash
   mkdir -p logs uploads
   ```

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

### Run Tests
```bash
npm test
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "patient"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/refresh`
Refresh access token
```json
{
  "refreshToken": "your-refresh-token"
}
```

#### POST `/api/auth/logout`
Logout user

### AI Health Assistant

#### POST `/api/ai/health-advice`
Get health advice based on symptoms
```json
{
  "symptoms": "I have a fever and headache",
  "language": "en"
}
```

Response:
```json
{
  "success": true,
  "message": "Health advice generated successfully",
  "data": {
    "advice": "Rest well and stay hydrated...",
    "severity": "medium",
    "shouldSeeDoctor": true,
    "recommendations": [
      "Take rest",
      "Stay hydrated",
      "Monitor temperature"
    ],
    "symptoms": "I have a fever and headache",
    "language": "en",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST `/api/ai/track-symptom`
Track symptom for analytics
```json
{
  "symptom": "fever",
  "language": "en"
}
```

#### GET `/api/ai/symptom-trends`
Get symptom trends (requires authentication)

### Health Check

#### GET `/health`
Server health status

## Database Models

### User
- Authentication and authorization
- Role-based access control
- Password hashing with bcrypt

### Appointment
- Patient appointment management
- Status tracking
- Doctor assignment

### Doctor
- Doctor profiles and specializations
- Availability management
- Consultation fees

### Patient
- Patient profiles and medical history
- Contact information
- Health records

### MedicalReport
- Diagnosis and prescriptions
- Follow-up scheduling
- Report status tracking

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Prevent abuse and DDoS attacks
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Comprehensive request validation
- **Security Headers**: Helmet for security headers
- **Error Handling**: Secure error responses

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/healthcare_db |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `OPENAI_API_KEY` | OpenAI API key | - |
| `OPENAI_MODEL` | OpenAI model | gpt-3.5-turbo |
| `EMAIL_HOST` | SMTP host | smtp.gmail.com |
| `EMAIL_USER` | Email username | - |
| `EMAIL_PASS` | Email password | - |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | - |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | - |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |
| `ALLOWED_ORIGINS` | CORS allowed origins | http://localhost:3000,http://localhost:5173 |

## Deployment

### Local Development
1. Install MongoDB locally or use MongoDB Atlas
2. Set up environment variables
3. Run `npm run dev`

### Production Deployment
1. Set `NODE_ENV=production`
2. Configure production MongoDB
3. Set secure JWT secrets
4. Configure CORS for production domains
5. Set up SSL/TLS certificates
6. Use PM2 or similar process manager

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## Monitoring and Logging

- **Winston Logging**: Structured logging with different levels
- **Error Tracking**: Comprehensive error handling and logging
- **Health Checks**: `/health` endpoint for monitoring
- **Performance Monitoring**: Request timing and metrics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue in the repository. 