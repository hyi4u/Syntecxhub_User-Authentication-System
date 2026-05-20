# 🛡️ NestJS User Authentication System

> **Syntecxhub Internship Task**
> This repository contains the backend implementation of a secure, production-ready user authentication system built with NestJS. This project was developed as a core task during my backend development internship at **Syntecxhub**.

## 📋 Task Overview

The goal of this task was to build a robust authentication flow from scratch. The system successfully implements the following requirements:
- [x] **Signup and Login endpoints** (supporting username/email + password).
- [x] **Secure Password Hashing** using `bcrypt`.
- [x] **JWT Token Issuance** upon successful login and registration.
- [x] **Route Protection** using NestJS Guards and Passport Strategies.
- [x] **Error Handling & Edge Cases**, including token expiration, invalid credentials, and suspended account checks.

## 🛠️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/) (Node.js/TypeScript)
- **Database ORM:** [TypeORM](https://typeorm.io/)
- **Authentication:** Passport.js (`passport-local`, `passport-jwt`)
- **Security:** JWT (JSON Web Tokens), `bcrypt` for password hashing

## ✨ Key Features & Architecture

- **Separation of Concerns:** Utilizes the Strategy pattern (`LocalStrategy`, `JwtStrategy`) to separate authentication logic from controller routing.
- **Custom Decorators:** Implemented a `@Public()` metadata decorator to easily whitelist specific routes (like login/register) while keeping the rest of the application strictly protected by default.
- **Graceful Error Handling:** Protects against `undefined` JWT payloads, prevents duplicate email/username registrations via single-query DB checks, and instantly locks out suspended accounts.

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- A running relational database (e.g., PostgreSQL, MySQL)
