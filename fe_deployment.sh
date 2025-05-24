#!/bin/bash

# Frontend Deployment Script for MoneyManager
# Usage: ./fe_deployment.sh

set -e  # Exit on any error

echo "🚀 Starting MoneyManager Frontend Deployment..."

# Navigate to frontend directory
echo "📁 Navigating to frontend directory..."
cd /home/alex/moneymanager/frontend

# Clean previous build artifacts
echo "🧹 Cleaning previous build artifacts..."
sudo rm -rf .next

# Build the application
echo "🔨 Building the application..."
npm run build

# Navigate back to root directory
echo "📁 Navigating back to root directory..."
cd ..

# Deploy to Firebase
echo "🔥 Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "✅ Deployment completed successfully!"
