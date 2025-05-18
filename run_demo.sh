#!/bin/bash

# Create a virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate the virtual environment
source venv/bin/activate

# Install requirements
echo "Installing requirements..."
pip install -r requirements.txt

# Run migrations
echo "Applying migrations..."
python manage.py makemigrations
python manage.py migrate

# Create demo data
echo "Creating demo data..."
python demo_data.py

# Run the server
echo "Starting server..."
python manage.py runserver
