#!/bin/bash

# Backend Deployment Script for MoneyManager
# Usage: ./be_deployment.sh

set -e  # Exit on any error

echo "🚀 Starting MoneyManager Backend Deployment..."

# Navigate to root directory
echo "📁 Navigating to root directory..."
cd /home/alex/moneymanager

# Build and submit to Google Cloud Build
echo "🔨 Building and submitting backend to Google Cloud Build..."
gcloud builds submit backend --tag gcr.io/moneymanager-f7891/moneymanager-backend

# Update Cloud Run service
echo "☁️ Updating Cloud Run service..."
gcloud run services update moneymanager-backend \
  --image gcr.io/moneymanager-f7891/moneymanager-backend \
  --region europe-west6

echo "✅ Backend deployment completed successfully!"
