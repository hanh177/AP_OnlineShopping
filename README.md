# AP Online Shopping

A modern e-commerce platform built with microservices architecture, featuring a React frontend and Node.js backend services.

## Project Structure

```
.
├── be/                 # Backend services
│   ├── api-gateway/    # API Gateway service
│   ├── user-service/   # User management service
|   ├── product-service/# Product management service
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
- Product Service on port 4002
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
npm start
```

3. Configure Product Service:

```bash
cd be/product-service
npm install
cp .env.example .env  # Create and configure your environment variables
npm install -g migrate-mongo
migrate-mongo up    # migrate default data with https://www.npmjs.com/package/migrate-mongo
npm start
```

4. Configure API Gateway:

```bash
cd ../api-gateway
npm install
cp .env.example .env  # Create and configure your environment variables
npm start
```

5. Configure Nginx Proxy:

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

# Product Service (.env)
PORT=4002
MONGODB_URI=mongodb://localhost:27017/ap_online_shopping
JWT_SECRET=your_jwt_secret

# API Gateway (.env)
PORT=4000
APP_USER_PORT=4001
APP_PRODUCT_PORT=4002
```

### Frontend

Create `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:4000
```

## Development

- Frontend: `npm run dev` (Vite dev server)
- Backend Services: `npm start` (Nodemon for auto-reload)

## Migration

The project uses `migrate-mongo` for database migrations. Here's how to use it:

1. Install migrate-mongo:

```bash
npm install -g migrate-mongo
```

2. Create a migration:

```bash
cd be/product-service  # or any other service
migrate-mongo create [migration-name]
```

3. Write your migration in the generated file:

```javascript
module.exports = {
  async up(db, client) {
    // Write your migration here
    await db.createCollection("products");
    await db
      .collection("products")
      .insertMany([{ name: "Sample Product", price: 99.99 }]);
  },

  async down(db, client) {
    // Write rollback here
    await db.collection("products").drop();
  },
};
```

4. Run migrations:

```bash
migrate-mongo up    # Apply migrations
migrate-mongo down  # Rollback last migration
migrate-mongo status # Check status
```

5. Configure in `migrate-mongo-config.js`:

```javascript
module.exports = {
  mongodb: {
    url:
      process.env.MONGODB_URI || "mongodb://localhost:27017/ap_online_shopping",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
};
```

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
