Live link- https://candify.onrender.com/


#  Birthday Automation System

A professional, modular birthday automation system that collects user birthdays and automatically sends personalized birthday wishes via email.

## Table of Contents

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

#Features

- Clean Web Interface - Responsive UI for birthday registration
- Unique Email Constraint - Prevents duplicate registrations
- SQLite Database - Lightweight, file-based data storage
- Automated Cron Jobs - Daily birthday checks at 7 AM
- Beautiful Email Templates - Professional HTML birthday emails
- Modular Architecture - Clean, maintainable code structure
- Gmail Integration - Reliable email delivery via Nodemailer
- Production Ready - Error handling, logging, and graceful shutdown
- Mobile Responsive - Works perfectly on all devices

## Architecture

This application follows a modular MVC architecture with clear separation of concerns:

- Models - Data layer (User model)
- Controllers - Request handling logic
- Services - Business logic (Email, Birthday services)
- Routes - API endpoint definitions
- Middleware - Cross-cutting concerns (CORS, Error handling)
- Jobs - Scheduled tasks (Birthday scheduler)
- Config - Application configuration

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Gmail Account** with App Password enabled

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

## Usage

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

**🔗 Live Application**: `https://candify.onrender.com/`



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
