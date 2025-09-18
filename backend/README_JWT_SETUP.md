# EchoPind Backend - JWT Authentication Setup

## Prerequisites

1. **MongoDB**: You need MongoDB running either:
   - Locally: Install MongoDB and run `mongod`
   - Cloud: Use MongoDB Atlas (recommended)

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
The `.env` file is already configured with default values. For production, update these values:

- `JWT_SECRET`: Change to a strong, unique secret
- `JWT_REFRESH_SECRET`: Change to a different strong secret
- `MONGODB_URI`: Update with your MongoDB connection string

### 3. Database Setup

#### Option A: Use Local MongoDB
```bash
# Make sure MongoDB is running locally on port 27017
mongod

# Seed the database with test users
npm run seed
```

#### Option B: Use MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get the connection string and update `MONGODB_URI` in `.env`
4. Seed the database:
```bash
npm run seed
```

### 4. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Test Credentials

After seeding, you can use these test accounts:

| Role | Email | Password |
|------|--------|----------|
| Student | test@echopind.com | test123 |
| Student | demo@echopind.com | eco123 |
| Teacher | teacher@echopind.com | teach123 |
| Admin | admin@echopind.com | admin123 |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `GET /api/auth/verify` - Verify token

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Health Check
- `GET /api/health` - Server health status

## Frontend Integration

Make sure the frontend is configured to use the backend API:
1. Add `REACT_APP_API_URL=http://localhost:5000/api` to frontend `.env`
2. Start the frontend: `npm start` in the frontend directory

## Security Features

- Password hashing with bcrypt
- JWT access tokens (24h expiry)
- Refresh tokens (7d expiry)
- Rate limiting on authentication endpoints
- CORS protection
- Input validation
- Helmet security headers

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- For Atlas: ensure your IP is whitelisted

### CORS Issues
- Frontend and backend URLs are configured in `.env`
- Default: frontend on port 3000, backend on port 5000

### Token Issues
- Tokens are stored in localStorage
- Clear browser storage if needed
- Check browser console for authentication errors