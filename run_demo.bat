@echo off
REM Activate virtual environment
call venv\Scripts\activate

REM Run the demo data script
python demo_data.py

REM Run the server
python manage.py runserver
