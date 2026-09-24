## API Documentation

The complete API documentation is available on Postman:

[View Handy Banking API Documentation] (https://documenter.getpostman.com/view/57167646/2sBYB2snqX)

# Handy Banking API

## Overview

Handy is a mobile banking application developed for Providence Bank. This project provides a backend REST API built with Node.js, Express.js and MongoDB.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Jest
- Supertest
- Postman

## Features

### User Features

- Create an account
- Login using phone number and password
- Retrieve account number using phone number

### Admin Features

- View all registered users
- Block a user
- View total number of registered users

## Authentication

JWT is used to authenticate users.

Signup and login are public endpoints.

All other endpoints require authentication.

Admin endpoints require administrator authorization.

## API Endpoints

### Signup

`POST /api/auth/signup`

Creates a new user account.

### Login

`POST /api/auth/login`

Logs a user in using their phone number and password.

### Retrieve Account Number

`GET /api/bank/account/:phoneNumber`

Retrieves the account number associated with a phone number.

Requires authentication.

### Get All Users

`GET /api/bank/users`

Allows an administrator to view all registered users.

Requires authentication and admin authorization.

### Block User

`PATCH /api/bank/users/:id/block`

Allows an administrator to block a user.

Requires authentication and admin authorization.

### Get User Count

`GET /api/bank/users/count`

Returns the total number of registered users.

Requires authentication and admin authorization.

## Security

The API uses JSON Web Tokens (JWT) for authentication.

Passwords are hashed before being stored in MongoDB.

Admin-only endpoints are protected using role-based authorization.

## Testing

The project uses Jest and Supertest for automated testing.

Run the tests with:

```bash
npm test