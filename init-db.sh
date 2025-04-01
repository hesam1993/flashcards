#!/bin/bash

# Load environment variables
source .env

# Create database and tables
echo "Setting up database..."
node server/db/setup.js

echo "Database setup complete!" 