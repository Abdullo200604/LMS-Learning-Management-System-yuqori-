#!/bin/bash

# Activate virtual environment
if [ -d "venv" ]; then
    source venv/bin/activate
else
    echo "Creating virtual environment..."
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
fi

# Run migrations
python manage.py migrate

# Check if superuser exists
echo "from django.contrib.auth import get_user_model; User = get_user_model(); print(User.objects.filter(is_superuser=True).exists())" | python manage.py shell > /tmp/superuser_exists.txt
SUPERUSER_EXISTS=$(cat /tmp/superuser_exists.txt)

if [ "$SUPERUSER_EXISTS" = "False" ]; then
    echo "Creating superuser..."
    python manage.py createsuperuser --noinput --username admin --email admin@example.com
    python manage.py shell -c "from django.contrib.auth import get_user_model; User = get_user_model(); user = User.objects.get(username='admin'); user.set_password('admin'); user.save()"
    echo "Superuser created with username 'admin' and password 'admin'"
fi

# Create demo users if they don't exist
echo "Creating demo users..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
from users.models import Student, Teacher
User = get_user_model()

# Create demo student
if not User.objects.filter(username='demo_student').exists():
    student_user = User.objects.create_user(
        username='demo_student',
        password='tatu2025',
        email='student@example.com',
        first_name='Demo',
        last_name='Student',
        role='STUDENT'
    )
    Student.objects.create(
        user=student_user,
        student_id='ST12345',
        faculty='Computer Engineering',
        department='Software Engineering',
        group='SE-19',
        year=3
    )
    print("Demo student created")

# Create demo teacher
if not User.objects.filter(username='demo_teacher').exists():
    teacher_user = User.objects.create_user(
        username='demo_teacher',
        password='tatu2025',
        email='teacher@example.com',
        first_name='Demo',
        last_name='Teacher',
        role='TEACHER'
    )
    Teacher.objects.create(
        user=teacher_user,
        teacher_id='TC12345',
        department='Software Engineering',
        position='Assistant Professor'
    )
    print("Demo teacher created")
EOF

# Run server
echo "Starting server..."
python manage.py runserver 0.0.0.0:8000
