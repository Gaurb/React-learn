#!/bin/bash

# MegaBlog Deployment Script
# This script helps deploy your MegaBlog React app using Docker

set -e

echo "🚀 MegaBlog Deployment Script"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "📋 Please create a .env file with your Appwrite configuration:"
    echo ""
    echo "VITE_APPWRITE_URL=https://cloud.appwrite.io/v1"
    echo "VITE_APPWRITE_PROJECT_ID=your-project-id"
    echo "VITE_APPWRITE_DATABASE_ID=your-database-id"
    echo "VITE_APPWRITE_COLLECTION_ID=your-collection-id"
    echo "VITE_APPWRITE_BUCKET_ID=your-bucket-id"
    echo ""
    echo "Get these values from: https://cloud.appwrite.io/console"
    exit 1
fi

echo "✅ Environment file found"

# Function to build and deploy
deploy() {
    echo "🔨 Building Docker image..."
    docker-compose build

    echo "🚀 Starting MegaBlog application..."
    docker-compose up -d

    echo ""
    echo "✅ Deployment completed!"
    echo "🌐 Your MegaBlog is running at: http://localhost:3000"
    echo ""
    echo "📊 To check status: docker-compose ps"
    echo "📝 To view logs: docker-compose logs -f"
    echo "🛑 To stop: docker-compose down"
}

# Function to stop the application
stop() {
    echo "🛑 Stopping MegaBlog application..."
    docker-compose down
    echo "✅ Application stopped"
}

# Function to view logs
logs() {
    echo "📝 Viewing logs..."
    docker-compose logs -f
}

# Function to restart the application
restart() {
    echo "🔄 Restarting MegaBlog application..."
    docker-compose restart
    echo "✅ Application restarted"
}

# Function to show status
status() {
    echo "📊 Application status:"
    docker-compose ps
}

# Parse command line arguments
case "$1" in
    "deploy")
        deploy
        ;;
    "stop")
        stop
        ;;
    "logs")
        logs
        ;;
    "restart")
        restart
        ;;
    "status")
        status
        ;;
    *)
        echo "Usage: $0 {deploy|stop|logs|restart|status}"
        echo ""
        echo "Commands:"
        echo "  deploy  - Build and deploy the application"
        echo "  stop    - Stop the application"
        echo "  logs    - View application logs"
        echo "  restart - Restart the application"
        echo "  status  - Show application status"
        exit 1
        ;;
esac 