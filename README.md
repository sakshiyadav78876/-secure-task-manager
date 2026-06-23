# Secure Task Manager

A full-stack task management application that allows users to create and manage their personal tasks securely.

The application includes user authentication, task management features, and email notifications. Each user can register, log in, and manage only their own tasks.

## What This Project Does

Users can:

- Create an account
- Log in securely
- Create tasks
- Update tasks
- Delete tasks
- View their task list
- Receive emails for account-related actions

The application ensures that users can only access their own data.

## How It Works

1. A user registers using their email and password.
2. The password is hashed before being stored in the database.
3. After login, a JWT token is generated.
4. The token is used to access protected routes.
5. Users can perform CRUD operations on their tasks.
6. Task data is stored in MongoDB Atlas.
7. Emails are sent using Resend when required.

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### Authentication
- JWT
- bcrypt

### Email Service
- Resend

### Deployment
- Vercel (Frontend)
- Render (Backend)

## Security Features

- Password hashing using bcrypt
- JWT authentication
- Protected API routes
- Environment variables for sensitive credentials


## What I Learned

Through this project, I learned:

- Building REST APIs with Express.js
- Working with MongoDB Atlas
- Implementing JWT authentication
- Password security using bcrypt
- Connecting React with backend APIs
- Sending emails using Resend
- Deploying applications using Vercel and Render