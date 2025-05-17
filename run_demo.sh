#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Run the demo data script
python demo_data.py

# Run the server
python manage.py runserver
