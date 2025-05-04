# BookShelf - Book Management Application

A full-stack application for managing your personal book collection, featuring a responsive UI, secure authentication, and comprehensive CRUD operations.

![Cover Image](https://res.cloudinary.com/dxeavucq9/image/upload/v1746335719/book-shelf_xudjvl.png)

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
- Dark mode support
- Comprehensive test coverage

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)
- Docker and Docker Compose

### Local Development Setup

1. Clone the repository

```bash
git clone <repository-url>
cd book-management-app
```

2. Set up environment variables

```bash
# Frontend
cp .env.example .env

# Backend
cd backend
cp .env.example .env
cd ..
```

Update the `.env` files with your configuration:

Frontend `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Backend `.env`:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/book-management
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

3. Install dependencies

```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

4. Start the development servers

In one terminal (backend):

```bash
cd backend
npm run dev
```

In another terminal (frontend):

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Docker Setup

1. Build and run the containers:

```bash
docker-compose up --build
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## ⚠️ Known Issue: Docker Build Fails Due to Network Timeout

Sometimes, the Docker build may fail during the frontend image build due to network issues — especially while trying to fetch base images or install packages. The error message may look like:

### ✅ Solution

This is caused by a temporary network failure or Docker Hub being unreachable. To resolve it:

1. **Check your internet connection.**

2. **Retry the build** by running:

   ```bash
   docker-compose up --build
   ```

## Testing

### Backend Tests

```bash
cd backend
npm test                  # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

### Frontend Tests

```bash
npm test                 # Run tests
npm run test:coverage    # Generate coverage report
npm run test:ui          # Run tests with UI
```

## API Documentation

### Authentication Endpoints

#### Register User

- **POST** `/api/auth/register`
- Body: `{ username: string, email: string, password: string }`

#### Login User

- **POST** `/api/auth/login`
- Body: `{ email: string, password: string }`

#### Get User Profile

- **GET** `/api/auth/profile`
- Protected: Requires JWT token

### Book Endpoints

All book endpoints are protected and require JWT authentication.

#### Get All Books

- **GET** `/api/books`

#### Get Single Book

- **GET** `/api/books/:id`

#### Create Book

- **POST** `/api/books`
- Body: `{ title: string, author: string, genre: string, publicationDate: string }`

#### Update Book

- **PUT** `/api/books/:id`
- Body: `{ title: string, author: string, genre: string, publicationDate: string }`

#### Delete Book

- **DELETE** `/api/books/:id`

## Project Structure

```
/
├── public/               # Static assets
├── src/                  # Frontend source code
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── store/           # Redux store and slices
│   ├── tests/           # Frontend tests
│   └── ...
├── backend/             # Backend source code
│   ├── src/             # Backend source files
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   └── tests/       # Backend tests
│   └── ...
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
