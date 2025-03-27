# AP Online Shopping

A modern e-commerce platform built with microservices architecture, featuring a React frontend and Node.js backend services.

## Project Structure

```
.
├── be/                 # Backend services
│   ├── api-gateway/    # API Gateway service
│   ├── user-service/   # User management service
│   └── proxy/         # Nginx reverse proxy
└── fe/                # Frontend React application
```

## Prerequisites

- Node.js (v23 or higher)
- Docker and Docker Compose (for Docker setup)
- MongoDB (for manual setup)

## Setup Instructions

### Option 1: Using Docker (Recommended)

1. Clone the repository:

```bash
git clone <repository-url>
cd AP_OnlineShopping
```

2. Start the backend services:

```bash
cd be
docker-compose up -d
```

This will start:

- User Service on port 4001
- MongoDB on port 27017
- Nginx Proxy on port 4000

3. Start the frontend development server:

```bash
cd ../fe
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Option 2: Manual Setup

#### Backend Setup

1. Set up MongoDB:

   - Install MongoDB locally or use MongoDB Atlas
   - Create a database named `ap_online_shopping`

2. Configure User Service:

```bash
cd be/user-service
npm install
cp .env.example .env  # Create and configure your environment variables
npm run dev
```

3. Configure API Gateway:

```bash
cd ../api-gateway
npm install
cp .env.example .env  # Create and configure your environment variables
npm run dev
```

4. Configure Nginx Proxy:

```bash
cd ../proxy
# Configure nginx.conf as needed
```

#### Frontend Setup

1. Install dependencies and start the development server:

```bash
cd fe
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Environment Variables

### Backend Services

Create `.env` files in each service directory with the following variables:

```env
# User Service (.env)
PORT=4001
MONGODB_URI=mongodb://localhost:27017/ap_online_shopping
JWT_SECRET=your_jwt_secret

# API Gateway (.env)
PORT=4000
USER_SERVICE_URL=http://localhost:4001
```

### Frontend

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000
```

## Development

- Frontend: `npm run dev` (Vite dev server)
- Backend Services: `npm run dev` (Nodemon for auto-reload)

## Building for Production

### Frontend

```bash
cd fe
npm run build
```

### Backend Services

```bash
cd be/<service-name>
npm run build
```

## Docker Commands

- Start all services: `docker-compose up -d`
- Stop all services: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild services: `docker-compose up -d --build`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
