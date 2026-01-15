# Mini Time Tracker — Backend

## Overview

Backend service for the **Mini Time Tracker** application.
Built with **NestJS**, it provides a REST API for managing time entries.

The backend uses **Prisma ORM** with a relational database (**SQLite by default**).


## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- SQLite / PostgreSQL
- class-validator / class-transformer


## Architecture

The backend follows NestJS best practices:

- **Modules** — feature-based separation
- **Controllers** — HTTP request handling
- **Services** — business logic
- **DTOs** — validation and data transfer
- **Prisma Service** — database access layer

---

## API Endpoints

### POST /time-entries

Create a new time entry.

### GET /time-entries

Get all time entries.

## Validation Rules

- All fields are required
- Hours must be a positive number
- Maximum **24 hours per calendar date**


## Installation & Running the Project

### Clone the repository

```bash
git clone https://github.com/taniavozniuk/mini-time-tracker.git
cd mini-time-tracker
npm install
```

### Setup database

```bash
npx prisma generate
npx prisma migrate dev
```

### Start development server

```bash
cd backend
npm run start:dev
```

### API will be available at:

```bash
http://localhost:3001
```
