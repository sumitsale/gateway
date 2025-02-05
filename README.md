# API Gateway

This is a Node.js Express-based API Gateway service that can route and proxy requests to various microservices.

## Features

- Express.js framework
- Docker containerization
- Security middleware (helmet)
- CORS support
- Request logging
- Error handling
- Health check endpoint
- Docker Compose setup
- Automated CI/CD with GitHub Actions
- AWS ECR integration

## Prerequisites

- Node.js 18 or higher
- Docker
- Docker Compose
- AWS Account with ECR access
- GitHub Account

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm run dev
   ```

### Using Docker

1. Build and run using Docker Compose:
   ```bash
   docker-compose up --build
   ```

The gateway will be available at http://localhost:3000

## CI/CD Setup

The project includes GitHub Actions workflow for automated builds and deployments to AWS ECR.

### Required GitHub Secrets

Set up the following secrets in your GitHub repository:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key

The AWS credentials should have permissions to:
- Push to ECR repository
- Create ECR repository (if it doesn't exist)

### AWS ECR Setup

### AWS ECR Setup

1. Create an ECR repository named 'sumit-gateway-microservice' in your AWS account:
   ```bash
   aws ecr create-repository --repository-name sumit-gateway-microservice --region ap-south-1

2. The GitHub Actions workflow will automatically:
   - Build the Docker image
   - Tag it with the commit SHA and 'latest'
   - Push it to your ECR repository

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/microservice` - Forward GET requests to microservice
- `POST /api/microservice` - Forward POST requests to microservice

## Configuration

- The server runs on port 3000 by default
- Environment variables can be configured in a `.env` file
- AWS Region and ECR repository can be configured in `.github/workflows/deploy.yml`

## Adding New Services

To add a new service proxy, add a new route in `src/server.js`:

```javascript
app.use('/api/service-name', createProxyMiddleware({
  target: 'http://service-host:port',
  changeOrigin: true,
  pathRewrite: {
    '^/api/service-name': '/',
  },
}));
