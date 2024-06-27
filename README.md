# Project Title
Weather_app & Book_Management_app
## Swagger-OPENAPI-Documentation

[Swagger Documentation](https://digitalpaani-book-management.onrender.com/api-docs/)

## Introduction

### Book Management API
- Developed a book management API using Node.js.
- Features user authentication and authorization.
- Provides CRUD operations for book entries.
- Offers filtering by author and publication year.
- Includes clear API documentation.
- Implements basic security measures for input validation.

## Project Type
 Backend 

## Deplolyed App
```bash
Backend: https://digitalpaani-book-management.onrender.com/
Database: mongodb+srv://YOUR_USERNAME:YUOR_PASSWORD@cluster0.vvtoxbl.mongodb.net/DigitalPaani?retryWrites=true&w=majority
```
## Postman API
 ```bash
[Postman API Testing](https://universal-star-350473.postman.co/workspace/My-Workspace~44391309-b21a-4654-829d-81bea0efc5df/collection/30678801-77db6517-e2eb-47ed-8165-f6dce02b3c35?action=share&creator=30678801)

```
## Directory Structure
```bash
DigitalPaani-Assignment/
├─ book_management/
   ├─ src/
   │  ├─ config/
   │  │  └─ db.js
   │  ├─ models/
   │  │  └─ user.model.js
   │  │  └─ book.model.js
   │  ├─ controllers/
   │  │  └─ user.contorller.js
   │  │  └─ book.controller.js
   │  ├─ routes/
   │  │  └─ user.route.js
   │  │  └─ book.route.js
   │  ├─ app.js
   │  └─ index.js
 
```



## Video Walkthrough of the project
Attach a very short video walkthough of all of the features [ 1 - 3 minutes ]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features
- Develop scalable e-commerce APIs with Node.js/Express, MongoDB integration for users, products, orders, payments. Implement JWT for auth, mock payment gateways, logistics APIs. Ensure SSL/TLS, security practices, and optimize for high performance.

## Design Decisions & Assumptions:

### Node.js Book Management API:
- Choose Node.js for backend.
- Utilize Express.js for API.
- Implement JWT for authentication.
- Use MongoDB for storage.
- Assume basic security measures.
- Prioritize scalability and performance.


## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. For BE projects, guide the reviewer how to check mongodb schema etc.

```bash
git clone <complete_repository> 
For Backend:-
cd EcommercePlus-Server
npm install 
npm start

```

## Usage
Provide instructions and examples on how to use your project.

```bash
# Example
```

## Credentials
Include screenshots as necessary.
```bash
# MongoURL
mongoURL= YOUR_MONGODB_URL_HERE
# PORT
PORT=8000
NODE_ENV=development
# Cookie expiry
COOKIE_EXPIRE=5
# JWT secret and expiry
JWT_SECRET=YOUR_JWT_SECRET_HERE
JWT_EXPIRE=2h
```

## APIs Used
If your application relies on external APIs, document them and include any necessary links or references.

## API Endpoints
### User Management:
- `POST /api/v1/users/register`: Register a new user.
- `POST /api/v1/users/login`: User login.
- `GET /api/v1/users/logout`: User logout.

## Technology Stack
- Node.js
- Express.js
- MongoDB
- stripe
