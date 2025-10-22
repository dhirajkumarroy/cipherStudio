# CipherStudio - Backend

Minimal Express + MongoDB backend for CipherStudio.

## Features
- Create / Update / Read / Delete projects
- Projects stored as JSON in MongoDB
- Simple listing (without file contents)
- Uses `projectId` (UUID) to identify projects

## Requirements
- Node.js 18+ (works with 16+)
- MongoDB (Atlas recommended)

## Setup
1. Copy `.env.example` to `.env` and fill `MONGODB_URI`.
2. Install deps
   ```bash
   cd backend
   npm install
