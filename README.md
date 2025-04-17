# Payla.az - Online Marketplace Platform

Payla.az is a modern online marketplace platform built with Next.js and Node.js, allowing users to list and browse items across various categories.

## Features

- 🛍️ Browse items by categories
- 🔍 View all items sorted by newest first
- 👤 User authentication
- 📝 Create and manage listings
- 🖼️ Image upload support
- 📱 Responsive design
- 🌙 Modern UI with smooth transitions

## Tech Stack

### Frontend

- Next.js 13+ (React framework)
- TypeScript
- Tailwind CSS for styling
- Next Auth for authentication
- Axios for API requests

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- JWT for authentication

## Prerequisites

Before you begin, ensure you have installed:

- Node.js (v14 or higher)
- MongoDB
- Git

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/payla.az.git
cd payla.az
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Set up environment variables:

For backend (create `backend/.env`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/payla
JWT_SECRET=your_jwt_secret
```

For frontend (create `frontend/.env.local`):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
payla.az/
├── frontend/                # Next.js frontend application
│   ├── src/
│   │   ├── app/            # App router components
│   │   ├── components/     # Reusable components
│   │   ├── context/       # React context providers
│   │   └── lib/           # Utility functions
│   └── public/            # Static files
│
└── backend/               # Express.js backend application
    ├── src/
    │   ├── controllers/   # Route controllers
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   └── middleware/    # Custom middleware
    └── config/           # Configuration files
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Listings

- `GET /api/listings` - Get all listings
- `GET /api/listings?category=:id` - Get listings by category
- `POST /api/listings` - Create new listing
- `GET /api/listings/:id` - Get single listing

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/slug/:slug` - Get category by slug

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - your.email@example.com
Project Link: https://github.com/yourusername/payla.az
