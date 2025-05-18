@echo off
echo LMS TUIT Demo Setup

REM Create a virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate the virtual environment
call venv\Scripts\activate

REM Install requirements
echo Installing requirements...
pip install -r requirements.txt

REM Run migrations
echo Applying migrations...
python manage.py makemigrations
python manage.py migrate

REM Create demo data
echo Creating demo data...
python demo_data.py

REM Run the server
echo Starting server...
python manage.py runserver
