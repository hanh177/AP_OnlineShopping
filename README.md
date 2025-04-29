# AP Online Shopping

A modern e-commerce platform built with microservices architecture, featuring a React frontend and Node.js backend services.

## Project Structure

```
.
├── be/                 # Backend services
│   ├── api-gateway/    # API Gateway service
│   ├── user-service/   # User management service
|   ├── product-service/# Product management service
└── fe/                # Frontend React application
```

## Prerequisites

- Node.js (v23 or higher)
- Docker and Docker Compose (for Docker setup)
- MongoDB (for manual setup)
- Redis (for manual setup)

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
- Redis on port 6379
- Api Gateway on port 4000

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

   - Install MongoDB locally 

2. Set up Redis:

   - Install Redis locally

3. Configure User Service:

```bash
cd be/user-service
npm install
cp .env.sample .env  # Create and configure your environment variables
npm start
```

4. Configure Product Service:

```bash
cd be/product-service
npm install
cp .env.sample .env  # Create and configure your environment variables
npm install -g migrate-mongo
migrate-mongo up    # migrate default data with https://www.npmjs.com/package/migrate-mongo
npm start
```

5. Configure API Gateway:

```bash
cd ../api-gateway
npm install
cp .env.sample .env  # Create and configure your environment variables
npm start
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
MONGO_URI=mongodb://localhost:27017/user_service
APP_TOKEN_SECRET=need_to_change
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_S3_BUCKET_NAME=your-bucket-name
REDIS_HOST=localhost
REDIS_PORT=6379

# Product Service (.env)
PORT=4002
MONGO_URI=mongodb://localhost:27017/product_service
APP_TOKEN_SECRET=need_to_change
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
AWS_S3_BUCKET_NAME=your-bucket-name

# API Gateway (.env)
APP_PORT=4000
USER_SERVICE_URL=http://localhost:4001
PRODUCT_SERVICE_URL=http://localhost:4002
APP_TOKEN_SECRET=need_to_change
REDIS_HOST=localhost
REDIS_PORT=6379
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

## API Document
The project uses Swagger for API documentation.

At the API Gateway, all APIs from microservices are aggregated into a single Swagger UI page at http://localhost:4000/docs for easier testing and browsing.

### Setup Swagger for Each Service
Each backend service (user-service, product-service) has a Swagger UI available for easy API exploration.
  - Swagger is automatically available when you start each service (via Docker or manual setup).
  - After starting the backend services, you can access the Swagger UI at:
    + User Service Swagger: http://localhost:4001/docs
    + Product Service Swagger: http://localhost:4002/docs

### How Swagger is Integrated
- Each service uses the swagger-jsdoc and swagger-ui-express packages.
- The static Swagger JSON file located at:
 ```bash
  src/swagger.json
  ```
- This swagger.json contains the OpenAPI 3.0 specification for that service's APIs.
- The API Gateway loads and aggregates these Swagger specifications from all backend services. It then exposes a unified Swagger UI at: http://localhost:4000/docs
- This allows developers to test and explore all APIs from a single location, instead of accessing each service individually.

### Modify or Add APIs
Go to the service folder, edit src/swagger.json to add new API definitions or update existing ones.
Example snippet inside `src/swagger.json`:

```
{
  "paths": {
    "/users/login": {
      "post": {
        "summary": "Login user",
        "tags": ["Users"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": { "type": "string" },
                  "password": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "200": { "description": "Successful login" },
          "400": { "description": "Invalid credentials" }
        }
      }
    }
  }
}

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
