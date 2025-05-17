import os
import sys
import django
from django.core.management import call_command

# Django settings modulini o'rnatish
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_tuit.settings')
django.setup()

# Modellarni import qilish
from django.contrib.auth import get_user_model
from users.models import Student, Teacher
from courses.models import Course, Enrollment, Schedule, Material, Attendance
from news.models import News, Category
from assignments.models import Assignment, Submission
from exams.models import Exam, Result

User = get_user_model()

def setup_demo_data():
    print("Demo ma'lumotlarni yaratish boshlandi...")
    
    # Admin foydalanuvchisini yaratish
    if not User.objects.filter(username='admin').exists():
        admin = User.objects.create_superuser(
            username='admin',
            email='admin@example.com',
            password='admin',
            first_name='Admin',
            last_name='User'
        )
        print("Admin foydalanuvchisi yaratildi")
    
    # O'qituvchi yaratish
    if not User.objects.filter(username='demo_teacher').exists():
        teacher_user = User.objects.create_user(
            username='demo_teacher',
            password='tatu2025',
            email='teacher@example.com',
            first_name='Demo',
            last_name='Teacher',
            role='TEACHER'
        )
        teacher = Teacher.objects.create(
            user=teacher_user,
            teacher_id='TC12345',
            department='Software Engineering',
            position='Assistant Professor'
        )
        print("Demo o'qituvchi yaratildi")
    else:
        teacher = Teacher.objects.get(user__username='demo_teacher')
    
    # Talabalar yaratish
    student_data = [
        {
            'username': 'demo_student',
            'password': 'tatu2025',
            'email': 'student@example.com',
            'first_name': 'Demo',
            'last_name': 'Student',
            'student_id': 'ST12345',
            'faculty': 'Computer Engineering',
            'department': 'Software Engineering',
            'group': 'SE-19',
            'year': 3
        },
        {
            'username': 'student2',
            'password': 'tatu2025',
            'email': 'student2@example.com',
            'first_name': 'Ali',
            'last_name': 'Valiyev',
            'student_id': 'ST12346',
            'faculty': 'Computer Engineering',
            'department': 'Software Engineering',
            'group': 'SE-19',
            'year': 3
        },
        {
            'username': 'student3',
            'password': 'tatu2025',
            'email': 'student3@example.com',
            'first_name': 'Zarina',
            'last_name': 'Karimova',
            'student_id': 'ST12347',
            'faculty': 'Computer Engineering',
            'department': 'Software Engineering',
            'group': 'SE-19',
            'year': 3
        }
    ]
    
    students = []
    for data in student_data:
        if not User.objects.filter(username=data['username']).exists():
            user = User.objects.create_user(
                username=data['username'],
                password=data['password'],
                email=data['email'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                role='STUDENT'
            )
            student = Student.objects.create(
                user=user,
                student_id=data['student_id'],
                faculty=data['faculty'],
                department=data['department'],
                group=data['group'],
                year=data['year']
            )
            students.append(student)
            print(f"Talaba {data['first_name']} {data['last_name']} yaratildi")
        else:
            student = Student.objects.get(user__username=data['username'])
            students.append(student)
    
    # Kurslar yaratish
    course_data = [
        {
            'name': 'Web dasturlash',
            'code': 'WEB101',
            'description': 'HTML, CSS, JavaScript va backend texnologiyalarini o\'rganish',
            'credits': 5,
            'semester': 'Fall 2023'
        },
        {
            'name': 'Ma\'lumotlar bazasi',
            'code': 'DB101',
            'description': 'SQL, NoSQL va ma\'lumotlar bazasi dizayni',
            'credits': 4,
            'semester': 'Fall 2023'
        },
        {
            'name': 'Algoritm va ma\'lumotlar strukturasi',
            'code': 'ALG101',
            'description': 'Asosiy algoritmlar va ma\'lumotlar strukturalari',
            'credits': 6,
            'semester': 'Fall 2023'
        }
    ]
    
    courses = []
    for data in course_data:
        course, created = Course.objects.get_or_create(
            code=data['code'],
            defaults={
                'name': data['name'],
                'description': data['description'],
                'credits': data['credits'],
                'semester': data['semester'],
                'teacher': teacher
            }
        )
        courses.append(course)
        if created:
            print(f"Kurs {data['name']} yaratildi")
    
    # Enrollment yaratish
    for student in students:
        for course in courses:
            enrollment, created = Enrollment.objects.get_or_create(
                student=student,
                course=course
            )
            if created:
                print(f"{student.user.get_full_name()} {course.name} kursiga qo'shildi")
    
    # Dars jadvali yaratish
    schedule_data = [
        {'course': courses[0], 'day': 'MON', 'start_time': '09:00', 'end_time': '10:30', 'room': '101'},
        {'course': courses[1], 'day': 'TUE', 'start_time': '11:00', 'end_time': '12:30', 'room': '102'},
        {'course': courses[2], 'day': 'WED', 'start_time': '14:00', 'end_time': '15:30', 'room': '103'},
        {'course': courses[0], 'day': 'THU', 'start_time': '09:00', 'end_time': '10:30', 'room': '101'},
        {'course': courses[1], 'day': 'FRI', 'start_time': '11:00', 'end_time': '12:30', 'room': '102'}
    ]
    
    for data in schedule_data:
        schedule, created = Schedule.objects.get_or_create(
            course=data['course'],
            day=data['day'],
            start_time=data['start_time'],
            defaults={
                'end_time': data['end_time'],
                'room': data['room']
            }
        )
        if created:
            print(f"{data['course'].name} uchun {data['day']} kuni dars jadvali yaratildi")
    
    # Yangiliklar kategoriyalari yaratish
    categories = []
    for name in ['Akademik', 'Sport', 'Madaniyat', 'Texnologiya']:
        category, created = Category.objects.get_or_create(name=name)
        categories.append(category)
        if created:
            print(f"{name} kategoriyasi yaratildi")
    
    # Yangiliklar yaratish
    news_data = [
        {
            'title': 'Yangi o\'quv yili boshlandi',
            'content': 'Yangi o\'quv yili munosabati bilan barcha talabalarga omad tilaymiz!',
            'category': categories[0]
        },
        {
            'title': 'Futbol musobaqasi',
            'content': 'Universitetimizda futbol musobaqasi o\'tkaziladi. Ishtirok etish uchun ro\'yxatdan o\'ting.',
            'category': categories[1]
        },
        {
            'title': 'Teatr kechasi',
            'content': 'Ushbu shanba kuni teatr kechasi o\'tkaziladi. Barcha talabalar taklif etiladi.',
            'category': categories[2]
        }
    ]
    
    for data in news_data:
        news, created = News.objects.get_or_create(
            title=data['title'],
            defaults={
                'content': data['content'],
                'category': data['category'],
                'author': User.objects.get(username='admin')
            }
        )
        if created:
            print(f"'{data['title']}' yangiligi yaratildi")
    
    # Vazifalar yaratish
    assignment_data = [
        {
            'title': 'HTML va CSS loyihasi',
            'description': 'Shaxsiy veb-sayt yarating',
            'course': courses[0],
            'due_date': '2023-12-15'
        },
        {
            'title': 'Ma\'lumotlar bazasi loyihasi',
            'description': 'Kutubxona tizimi uchun ma\'lumotlar bazasini loyihalang',
            'course': courses[1],
            'due_date': '2023-12-20'
        },
        {
            'title': 'Algoritm vazifasi',
            'description': 'Berilgan algoritmlarni tahlil qiling va murakkabligini aniqlang',
            'course': courses[2],
            'due_date': '2023-12-25'
        }
    ]
    
    for data in assignment_data:
        assignment, created = Assignment.objects.get_or_create(
            title=data['title'],
            course=data['course'],
            defaults={
                'description': data['description'],
                'due_date': data['due_date']
            }
        )
        if created:
            print(f"'{data['title']}' vazifasi yaratildi")
    
    print("Demo ma'lumotlar muvaffaqiyatli yaratildi!")

if __name__ == '__main__':
    # Migratsiyalarni qo'llash
    print("Migratsiyalarni qo'llash...")
    call_command('migrate')
    
    # Demo ma'lumotlarni yaratish
    setup_demo_data()
    
    print("\nLoyiha tayyor! Serverni ishga tushirish uchun quyidagi buyruqni bajaring:")
    print("python manage.py runserver")
