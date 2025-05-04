# BookShelf - Book Management Application

A full-stack application for managing your personal book collection, featuring a responsive UI, secure authentication, and comprehensive CRUD operations.

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development
- Redux Toolkit for state management
- React Router DOM for navigation
- Tailwind CSS for styling
- Lucide React for icons
- React Hot Toast for notifications
- Jest and React Testing Library for testing

### Backend
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT authentication
- Express Validator for request validation
- Jest and Supertest for API testing

### Containerization
- Docker and Docker Compose

## Features

- User authentication (register, login, protected routes)
- CRUD operations for books
- Responsive design for all device sizes
- Form validation
- Error handling
- Loading states
- Toast notifications

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)
- Docker and Docker Compose (optional)

### Local Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/book-management-app.git
cd book-management-app
```

2. Set up environment variables
```bash
# Copy .env.example files and update values
cp .env.example .env
cp backend/.env.example backend/.env
```

3. Install dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in another terminal)
cd ..
npm run dev
```

5. Visit the application in your browser at `http://localhost:3000`

### Docker Setup

If you prefer using Docker:

```bash
# Start all services with Docker Compose
docker-compose up
```

The application will be available at `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT
- `GET /api/auth/profile` - Get user profile (protected)

### Books
- `GET /api/books` - Get all books (protected)
- `GET /api/books/:id` - Get a single book (protected)
- `POST /api/books` - Create a book (protected)
- `PUT /api/books/:id` - Update a book (protected)
- `DELETE /api/books/:id` - Delete a book (protected)

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
npm test
```

## Project Structure

```
/
├── public/               # Static assets
├── src/                  # Frontend source code
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── store/            # Redux store and slices
│   ├── config.ts         # App configuration
│   └── ...
├── backend/              # Backend source code
│   ├── src/              # Backend source files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Custom middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── index.ts      # Entry point
│   └── ...
├── docker-compose.yml    # Docker Compose config
└── ...
```

## License

This project is licensed under the MIT License.