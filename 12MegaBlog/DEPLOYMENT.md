# 🚀 MegaBlog Deployment Guide

This guide covers deploying your MegaBlog React application using Docker for optimal performance and scalability.

## 📋 Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- Appwrite account and project setup

## 🔧 Quick Setup

### 1. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Copy the example and fill in your values
cp .env.example .env
```

Required environment variables:
```env
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
VITE_APPWRITE_BUCKET_ID=your-bucket-id
```

### 2. Appwrite Setup

Ensure your Appwrite collection has these attributes:
- `Title` (String, required, 255 chars)
- `content` (String, required, 10000 chars)
- `featuredImage` (String, optional, 255 chars)
- `status` (String, required, 50 chars)
- `userId` (String, required, 50 chars)

### 3. Deploy with Script

Make the deployment script executable and run it:

```bash
chmod +x deploy.sh
./deploy.sh deploy
```

## 🎯 Deployment Methods

### Method 1: Using Deployment Script (Recommended)

```bash
# Deploy the application
./deploy.sh deploy

# Check status
./deploy.sh status

# View logs
./deploy.sh logs

# Restart application
./deploy.sh restart

# Stop application
./deploy.sh stop
```

### Method 2: Using Docker Compose Directly

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Method 3: Using Docker Commands

```bash
# Build the image
docker build -t megablog:latest \
  --build-arg VITE_APPWRITE_URL=$VITE_APPWRITE_URL \
  --build-arg VITE_APPWRITE_PROJECT_ID=$VITE_APPWRITE_PROJECT_ID \
  --build-arg VITE_APPWRITE_DATABASE_ID=$VITE_APPWRITE_DATABASE_ID \
  --build-arg VITE_APPWRITE_COLLECTION_ID=$VITE_APPWRITE_COLLECTION_ID \
  --build-arg VITE_APPWRITE_BUCKET_ID=$VITE_APPWRITE_BUCKET_ID \
  .

# Run the container
docker run -d \
  --name megablog-app \
  -p 3000:80 \
  --restart unless-stopped \
  megablog:latest
```

## 🏗️ Docker Files Overview

### Available Dockerfiles

1. **`Dockerfile`** - Standard optimized build
2. **`Dockerfile.prod`** - Highly optimized for production with 3-stage build

### File Structure
```
12MegaBlog/
├── Dockerfile                 # Main Dockerfile
├── Dockerfile.prod           # Production optimized
├── docker-compose.yml        # Docker Compose configuration
├── nginx.conf               # Nginx configuration
├── .dockerignore            # Docker ignore file
├── deploy.sh                # Deployment script
└── DEPLOYMENT.md            # This file
```

## 🔧 Configuration Details

### Nginx Configuration Features

- **Gzip Compression** - Reduces file sizes
- **Security Headers** - XSS protection, content type sniffing protection
- **Caching Strategy** - 1-year cache for static assets
- **SPA Routing** - Proper handling of React Router routes
- **Health Check** - `/health` endpoint for monitoring

### Docker Optimizations

- **Multi-stage builds** - Smaller final image size
- **Layer caching** - Faster subsequent builds
- **Non-root user** - Enhanced security
- **Health checks** - Container health monitoring
- **Signal handling** - Proper shutdown handling

## 🌐 Production Deployment

### Cloud Deployment

#### AWS ECS/Fargate
```bash
# Build for AWS
docker build -t your-registry/megablog:latest -f Dockerfile.prod .
docker push your-registry/megablog:latest
```

#### Google Cloud Run
```bash
# Build and deploy to Cloud Run
gcloud run deploy megablog \
  --image gcr.io/PROJECT-ID/megablog:latest \
  --platform managed \
  --port 80 \
  --set-env-vars VITE_APPWRITE_URL=$VITE_APPWRITE_URL
```

#### Digital Ocean App Platform
```yaml
# app.yaml
name: megablog
services:
- name: web
  source_dir: /
  github:
    repo: your-username/megablog
    branch: main
  run_command: nginx -g "daemon off;"
  environment_slug: docker
  instance_count: 1
  instance_size_slug: basic-xxs
  http_port: 80
  routes:
  - path: /
```

### Reverse Proxy with SSL

For production, add SSL termination:

```nginx
# nginx-proxy.conf
server {
    listen 443 ssl http2;
    server_name yourdomain.com;
    
    ssl_certificate /etc/ssl/certs/yourdomain.crt;
    ssl_certificate_key /etc/ssl/private/yourdomain.key;
    
    location / {
        proxy_pass http://megablog:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📊 Monitoring & Maintenance

### Health Checks

Check application health:
```bash
curl http://localhost:3000/health
```

### Log Monitoring

```bash
# Application logs
docker-compose logs -f megablog

# Nginx access logs
docker exec -it megablog-app tail -f /var/log/nginx/access.log

# Nginx error logs
docker exec -it megablog-app tail -f /var/log/nginx/error.log
```

### Performance Monitoring

```bash
# Container stats
docker stats megablog-app

# Resource usage
docker exec -it megablog-app top
```

## 🐛 Troubleshooting

### Common Issues

1. **Build fails with environment variables**
   ```bash
   # Ensure .env file exists and has correct values
   cat .env
   ```

2. **Application not accessible**
   ```bash
   # Check if container is running
   docker ps
   
   # Check logs for errors
   docker-compose logs megablog
   ```

3. **Images not loading**
   - Check Appwrite bucket permissions
   - Verify VITE_APPWRITE_BUCKET_ID is correct
   - Check browser console for CORS errors

### Debug Mode

Run in development mode for debugging:
```bash
# Build development version
docker build -t megablog:dev --target builder .

# Run with interactive shell
docker run -it --rm megablog:dev sh
```

## 🔄 Updates & Maintenance

### Updating the Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and redeploy
./deploy.sh stop
./deploy.sh deploy
```

### Database Backup

Ensure regular backups of your Appwrite data:
- Use Appwrite Console export features
- Set up automated backups for your database
- Test restore procedures regularly

## 📈 Scaling

### Horizontal Scaling

```yaml
# docker-compose.yml for scaling
version: '3.8'
services:
  megablog:
    # ... existing config
    deploy:
      replicas: 3
    
  load-balancer:
    image: nginx:alpine
    ports:
      - "80:80"
    # Load balancer configuration
```

### Performance Optimization

- Enable CDN for static assets
- Use container orchestration (Kubernetes, Docker Swarm)
- Implement caching strategies
- Monitor and optimize Appwrite queries

---

## 🆘 Support

If you encounter issues:

1. Check the [troubleshooting section](#-troubleshooting)
2. Review Docker and application logs
3. Verify Appwrite configuration
4. Check network connectivity

**Happy Deploying! 🚀** 