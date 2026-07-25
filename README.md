# Secure Task Manager

A production-ready full-stack task management application built with the MERN stack, focused on secure authentication, role-based access control, and reliable task management workflows.

The application provides users with a secure platform to create, manage, and track tasks while implementing industry-standard authentication practices including JWT security, password hashing, OTP-based password recovery, and protected API routes.

## Live Application

Frontend:
https://secure-task-manager-iota.vercel.app/

Backend API:
https://secure-task-manager-backend-ooxa.onrender.com

---

# Project Overview

Secure Task Manager is a full-stack web application designed to demonstrate real-world software development practices.

The project includes:

* Secure user authentication system
* JWT-based authorization
* Role-based access control
* Task management operations
* Email-based OTP verification
* Password recovery workflow
* Admin user management
* RESTful API architecture
* Cloud deployment

The application follows a scalable frontend and backend architecture similar to modern production applications.

---

# Key Features

## Authentication and Authorization

* User registration and login
* Secure password encryption using bcrypt
* JWT token-based authentication
* Protected routes using authentication middleware
* Role-based access control for users and administrators
* Secure session handling

---

## Password Recovery System

A complete password reset workflow is implemented:

1. User enters registered email address
2. Backend validates the user account
3. System generates a secure six-digit OTP
4. OTP is sent through email service
5. User verifies OTP
6. User creates a new password securely

This feature demonstrates integration of external email services with backend authentication workflows.

---

## Task Management

Users can:

* Create tasks
* View personal tasks
* Update task status
* Mark tasks as completed
* Delete tasks
* Manage their productivity workflow

Each user's tasks are securely isolated using user-based authorization.

---

## Admin Dashboard

Administrators can:

* View registered users
* Monitor application users
* Access administrative functionalities through role-based permissions

---

# Technology Stack

## Frontend

* React.js
* Vite
* React Router
* Axios
* JavaScript
* CSS3
* Responsive UI Design

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js
* Nodemailer
* SendGrid SMTP Integration

## Deployment

Frontend:

* Vercel

Backend:

* Render

Database:

* MongoDB Atlas

---

# Application Architecture

```
User
 |
 |
React Frontend
 |
 |
REST API
 |
 |
Express.js Backend
 |
 |
Authentication Middleware
 |
 |
MongoDB Database
 |
 |
Task Management Services
```

---

# Authentication Flow

```
User Registration
        |
        |
Password Hashing
        |
        |
Database Storage
        |
        |
User Login
        |
        |
JWT Token Generation
        |
        |
Protected Application Access
```

---

# OTP Password Reset Flow

```
Forgot Password Request
        |
        |
Email Verification
        |
        |
Generate OTP
        |
        |
Send OTP Through Email
        |
        |
Verify OTP
        |
        |
Reset Password
```

---

# Project Structure

```
Secure-Task-Manager

├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│

├── backend
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── controllers
│   ├── server.js
│   └── package.json
│

└── README.md
```

---

# API Endpoints

## Authentication APIs

| Method | Endpoint                 | Description             |
| ------ | ------------------------ | ----------------------- |
| POST   | /api/auth/register       | Register new user       |
| POST   | /api/auth/login          | Authenticate user       |
| POST   | /api/auth/send-otp       | Send password reset OTP |
| POST   | /api/auth/verify-otp     | Verify OTP              |
| POST   | /api/auth/reset-password | Update password         |

---

## Task APIs

| Method | Endpoint       | Description      |
| ------ | -------------- | ---------------- |
| GET    | /api/tasks     | Fetch user tasks |
| POST   | /api/tasks     | Create new task  |
| PUT    | /api/tasks/:id | Update task      |
| DELETE | /api/tasks/:id | Delete task      |

---

# Security Implementation

The application follows important security practices:

* Password encryption using bcrypt
* JWT-based authentication
* Protected backend routes
* User-specific data access control
* Role-based authorization
* Secure OTP verification
* External service integration through backend APIs

---

# Development Highlights

This project demonstrates practical full-stack engineering skills:

* Designing REST APIs
* Connecting frontend and backend systems
* Implementing authentication workflows
* Managing database models and relationships
* Integrating third-party services
* Deploying applications on cloud platforms
* Debugging production deployment issues

---

# Future Enhancements

Planned improvements:

* Real-time task updates using WebSockets
* AI-based task prioritization
* Task reminders and notifications
* Analytics dashboard
* Google authentication
* Mobile application
* Advanced admin management system

---

# About the Developer

## Sakshi Yadav

B.Tech Software Engineering Student

Interested in:

* Full Stack Development
* Backend Engineering
* Java Development
* Cloud Deployment
* Building scalable software solutions

Technical Skills:

* Java
* JavaScript
* React.js
* Node.js
* Express.js
* MongoDB
* REST APIs
* Git and GitHub

---

# Project Purpose

Secure Task Manager was built to demonstrate the complete lifecycle of a modern web application, including:

* User authentication
* Secure backend development
* Database integration
* API design
* Cloud deployment
* Production-level application practices

This project reflects practical software engineering skills required for real-world development environments.
