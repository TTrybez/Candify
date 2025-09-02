# 🎉 Birthday Automation System

A professional, modular birthday automation system that collects user birthdays and automatically sends personalized birthday wishes via email.

## 📋 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 🎨 **Clean Web Interface** - Responsive UI for birthday registration
- 🔒 **Unique Email Constraint** - Prevents duplicate registrations
- 📊 **SQLite Database** - Lightweight, file-based data storage
- ⏰ **Automated Cron Jobs** - Daily birthday checks at 7 AM
- 📧 **Beautiful Email Templates** - Professional HTML birthday emails
- 🔧 **Modular Architecture** - Clean, maintainable code structure
- 🌐 **Gmail Integration** - Reliable email delivery via Nodemailer
- 🚀 **Production Ready** - Error handling, logging, and graceful shutdown
- 📱 **Mobile Responsive** - Works perfectly on all devices

## Architecture

This application follows a **modular MVC architecture** with clear separation of concerns:

- **Models** - Data layer (User model)
- **Controllers** - Request handling logic
- **Services** - Business logic (Email, Birthday services)
- **Routes** - API endpoint definitions
- **Middleware** - Cross-cutting concerns (CORS, Error handling)
- **Jobs** - Scheduled tasks (Birthday scheduler)
- **Config** - Application configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **Gmail Account** with App Password enabled

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd birthday-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### 4. Configure Environment Variables

Edit the `.env` file with your settings:

```env
# Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password

# Server Configuration
PORT=3000

# Database (Optional - defaults to SQLite)
DB_PATH=./birthday_db.sqlite
```

## Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Copy the 16-character password to your `.env` file

### Database Setup

The application uses SQLite by default. The database file will be created automatically on first run.

For production, consider using PostgreSQL or MySQL by modifying the database configuration.

## 🎯 Usage

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

### Access the Application

- **Web Interface**: `http://localhost:3000`
- **API Base URL**: `http://localhost:3000/api`

## API Documentation

### User Endpoints

#### Register New User
```http
POST /api/users
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com",
  "dateOfBirth": "1990-12-25"
}
```

#### Get All Users
```http
GET /api/users
```

### Birthday Endpoints

#### Manual Birthday Check (Testing)
```http
POST /api/test-birthdays
```

### Response Format

#### Success Response
```json
{
  "message": "User added successfully",
  "user": {
    "id": 1,
    "username": "John Doe",
    "email": "john@example.com",
    "dateOfBirth": "1990-12-25"
  }
}
```

#### Error Response
```json
{
  "error": "Email already exists"
}
```

## Deployment

### Production Deployment URL

**🔗 Live Application**: `[YOUR_DEPLOYMENT_URL_HERE]`

> **Note**: Replace `[YOUR_DEPLOYMENT_URL_HERE]` with your actual deployment URL once deployed.

### Deployment Platforms

#### Heroku Deployment

1. **Create Heroku App**:
```bash
heroku create your-app-name
```

2. **Set Environment Variables**:
```bash
heroku config:set GMAIL_USER=your-email@gmail.com
heroku config:set GMAIL_APP_PASSWORD=your-app-password
```

3. **Deploy**:
```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

#### Railway Deployment

1. **Connect Repository** to [Railway](https://railway.app)
2. **Set Environment Variables** in Railway dashboard
3. **Deploy** automatically on git push

#### DigitalOcean App Platform

1. **Create New App** on DigitalOcean
2. **Connect GitHub Repository**
3. **Configure Environment Variables**
4. **Deploy**

### Environment Variables for Production

```env
GMAIL_USER=your-production-email@gmail.com
GMAIL_APP_PASSWORD=your-production-app-password
PORT=3000
NODE_ENV=production
```

### Production Checklist

- [ ] Remove test endpoints (`/api/test-birthdays`)
- [ ] Set up proper logging service
- [ ] Configure SSL/HTTPS
- [ ] Set up monitoring and alerts
- [ ] Configure database backups
- [ ] Set up CI/CD pipeline
- [ ] Add rate limiting middleware
- [ ] Configure environment-specific settings

## Project Structure

```
birthday-automation/
├── 📄 server.js                 # Application entry point
├── 📄 package.json              # Dependencies and scripts
├── 📄 .env                      # Environment variables
├── 📄 README.md                 # This file
├── 📁 config/
│   └── 📄 database.js           # Database configuration
├── 📁 models/
│   └── 📄 User.js               # User data model
├── 📁 services/
│   ├── 📄 emailService.js       # Email functionality
│   └── 📄 birthdayService.js    # Birthday business logic
├── 📁 controllers/
│   ├── 📄 userController.js     # User request handlers
│   └── 📄 birthdayController.js # Birthday request handlers
├── 📁 routes/
│   ├── 📄 userRoutes.js         # User API routes
│   └── 📄 birthdayRoutes.js     # Birthday API routes
├── 📁 jobs/
│   └── 📄 birthdayScheduler.js  # Cron job management
├── 📁 middleware/
│   ├── 📄 cors.js               # CORS configuration
│   └── 📄 errorHandler.js       # Global error handling
├── 📁 public/
│   └── 📄 index.html            # Frontend interface
└── 📄 birthday_db.sqlite        # SQLite database (auto-generated)
```

## Testing

### Manual Testing

1. **Register a User**:
   - Visit the web interface
   - Fill out the registration form
   - Check if user appears in the list

2. **Test Birthday Emails**:
   - Register a user with today's date as birthday
   - Use the test endpoint: `POST /api/test-birthdays`
   - Check email inbox for birthday message

### API Testing with cURL

```bash
# Register new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"Test User","email":"test@example.com","dateOfBirth":"1990-01-01"}'

# Get all users
curl http://localhost:3000/api/users

# Test birthday check
curl -X POST http://localhost:3000/api/test-birthdays
```

### Automated Tests (Future Enhancement)

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## Performance Optimization

### Recommended Improvements

1. **Database Indexing**: Add indexes on frequently queried fields
2. **Caching**: Implement Redis for user data caching
3. **Email Queue**: Use Bull Queue for email processing
4. **Rate Limiting**: Add API rate limiting middleware
5. **Monitoring**: Implement application performance monitoring

## Security Considerations

- ✅ **Environment Variables**: Sensitive data stored in `.env`
- ✅ **Input Validation**: All user inputs validated
- ✅ **SQL Injection Prevention**: Using parameterized queries
- ✅ **CORS Protection**: Proper CORS headers configured
- ✅ **Error Handling**: No sensitive information in error responses

## 🐛 Troubleshooting

### Common Issues

#### 1. "Failed to load users" Error
- **Solution**: Check if server is running and accessible
- **Debug**: Check browser console and network tab

#### 2. Email Not Sending
- **Solution**: Verify Gmail App Password and credentials
- **Debug**: Check server logs for email service errors

#### 3. Database Connection Issues
- **Solution**: Ensure proper file permissions for SQLite
- **Debug**: Check database file creation and access rights

#### 4. Cron Job Not Running
- **Solution**: Verify server timezone and cron expression
- **Debug**: Check server logs for cron job execution

### Debug Commands

```bash
# Check server logs
npm run dev

# Test email configuration
node -e "console.log(require('./services/emailService'))"

# Verify database connection
node -e "console.log(require('./config/database'))"
```

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- Use **ES6+** features
- Follow **camelCase** naming convention
- Add **JSDoc comments** for functions
- Write **meaningful commit messages**

## Support

If you encounter any issues or have questions:

1. **Check the troubleshooting section** above
2. **Search existing issues** in the repository
3. **Create a new issue** with detailed information
4. **Contact the maintainers** for urgent issues

## Version History

- **v1.0.0** - Initial release with basic functionality
- **v1.1.0** - Added modular architecture
- **v1.2.0** - Enhanced error handling and logging
- **v2.0.0** - Production-ready features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Quick Start Summary

1. **Clone** → `git clone <repo-url>`
2. **Install** → `npm install`
3. **Configure** → Set up `.env` file
4. **Run** → `npm start`
5. **Visit** → `http://localhost:3000`

Birthday Wishes Automating!