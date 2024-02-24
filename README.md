# Pet Adoption Platform
Welcome to the Pet Adoption Platform! This platform allows users to explore and adopt pets based on various categories and filters.

## Features
- Browse pets by categories
- Apply filters to find pets based on specific criteria such as category, gender, age, and location
- View detailed information about each pet
- Adopt pets directly from the platform
# Technologies Used
## Client-Side
- React.js: Frontend JavaScript library for building user interfaces
- React Router: For routing and navigation within the application
- Redux: For state management
- Axios: For making HTTP requests to the server
- React Toastify: For displaying toast notifications
## Server-Side
- Node.js: JavaScript runtime for the server
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing pet and user information
- Mongoose: MongoDB object modeling for Node.js
- Nodemailer: For sending emails for account verification and notifications
# Getting Started
## Prerequisites
- Node.js and npm installed on your machine
- MongoDB installed and running locally or a connection to a MongoDB Atlas cluster
- SMTP server credentials for sending emails (if using Nodemailer)
## Installation
- Clone the repository
- Install dependencies for both client and server
- Configure environment variables:
  For the server, create a .env file in the server directory and define the following variables:
  - PORT= <port-number>
  - EMAIL=<email>
  - EMAIL_PASSWORD=<email-password>
  - MONGO_USERNAME=<mongo-username>
  - MONGO_PASSWORD=<mongo-password>

The client will be served at http://localhost:3000 and the server will run at http://localhost:5001.
