import os
import django
import random
from datetime import datetime, timedelta

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_tuit.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.models import Student, Teacher
from courses.models import Course, Enrollment, Schedule, Attendance, Material
from news.models import News, Category
from assignments.models import Assignment, Submission
from exams.models import Exam, ExamResult

User = get_user_model()

def create_demo_data():
    print("Demo ma'lumotlarni yaratish boshlandi...")
    
    # Create admin user
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@tatu.uz',
            'first_name': 'Admin',
            'last_name': 'User',
            'role': 'ADMIN',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Admin foydalanuvchi yaratildi")
    
    # Create teachers
    teachers_data = [
        {
            'username': 'teacher1',
            'email': 'teacher1@tatu.uz',
            'first_name': 'Alisher',
            'last_name': 'Usmanov',
            'password': 'teacher123',
            'teacher_id': 'T001',
            'department': 'Computer Science',
            'position': 'Professor'
        },
        {
            'username': 'teacher2',
            'email': 'teacher2@tatu.uz',
            'first_name': 'Dilshod',
            'last_name': 'Karimov',
            'password': 'teacher123',
            'teacher_id': 'T002',
            'department': 'Information Security',
            'position': 'Associate Professor'
        },
        {
            'username': 'teacher3',
            'email': 'teacher3@tatu.uz',
            'first_name': 'Nodira',
            'last_name': 'Ismoilova',
            'password': 'teacher123',
            'teacher_id': 'T003',
            'department': 'Software Engineering',
            'position': 'Senior Lecturer'
        }
    ]
    
    teachers = []
    for data in teachers_data:
        teacher_user, created = User.objects.get_or_create(
            username=data['username'],
            defaults={
                'email': data['email'],
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'role': 'TEACHER'
            }
        )
        if created:
            teacher_user.set_password(data['password'])
            teacher_user.save()
        
        teacher, created = Teacher.objects.get_or_create(
            user=teacher_user,
            defaults={
                'teacher_id': data['teacher_id'],
                'department': data['department'],
                'position': data['position']
            }
        )
        teachers.append(teacher)
    
    print(f"{len(teachers)} o'qituvchi yaratildi")
    
    # Create students
    students_data = [
        {
            'username': 'student1',
            'email': 'student1@tatu.uz',
            'first_name': 'Jasur',
            'last_name': 'Toshmatov',
            'password': 'student123',
            'student_id': 'S001',
            'faculty': 'Computer Engineering',
            'department': 'Computer Science',
            'group': 'CS-201',
            'year': 2
        },
        {
            'username': 'student2',
            'email': 'student2@tatu.uz',
            'first_name': 'Malika',
            'last_name': 'Rahimova',
            'password': 'student123',
            'student_id': 'S002',
            'faculty': 'Computer Engineering',
            'department': 'Information Security',
            'group': 'IS-202',
            'year': 2
        },
        {
            'username': 'student3',
            'email': 'student3@tatu.uz',
            'first_name': 'Bobur',
            'last_name': 'Kamolov',
            'password': 'student123',
            'student_id': 'S003',
            'faculty': 'Computer Engineering',
            'department': 'Software Engineering',
            'group': 'SE-203',
            'year': 2
        },
        {
            'username': 'student4',
            'email': 'student4@tatu.uz',
            'first_name': 'Nilufar',
            'last_name': 'Azimova',
            'password': 'student123',
            'student_id': 'S004',
            'faculty': 'Computer Engineering',
            'department': 'Computer Science',
            'group': 'CS-201',
            'year': 2
        },
        {
            'username': 'student5',
            'email': 'student5@tatu.uz',
            'first_name': 'Sardor',
            'last_name': 'Aliyev',
            'password': 'student123',
            'student_id': 'S005',
            'faculty': 'Computer Engineering',
            'department': 'Information Security',
            'group': 'IS-202',
            'year': 2
        }
    ]
    
    students = []
    for data in students_data:
        student_user, created = User.objects.get_or_create(
            username=data['username'],
            defaults={
                'email': data['email'],
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'role': 'STUDENT'
            }
        )
        if created:
            student_user.set_password(data['password'])
            student_user.save()
        
        student, created = Student.objects.get_or_create(
            user=student_user,
            defaults={
                'student_id': data['student_id'],
                'faculty': data['faculty'],
                'department': data['department'],
                'group': data['group'],
                'year': data['year']
            }
        )
        students.append(student)
    
    print(f"{len(students)} talaba yaratildi")
    
    # Create courses
    courses_data = [
        {
            'name': 'Python dasturlash',
            'code': 'CS101',
            'description': 'Python dasturlash asoslari kursi',
            'credits': 6,
            'semester': 'Spring 2023',
            'teacher': teachers[0]
        },
        {
            'name': 'Ma\'lumotlar bazasi',
            'code': 'CS102',
            'description': 'Ma\'lumotlar bazasi asoslari kursi',
            'credits': 5,
            'semester': 'Spring 2023',
            'teacher': teachers[1]
        },
        {
            'name': 'Web dasturlash',
            'code': 'CS103',
            'description': 'Web dasturlash asoslari kursi',
            'credits': 6,
            'semester': 'Spring 2023',
            'teacher': teachers[2]
        },
        {
            'name': 'Algoritm va ma\'lumotlar strukturasi',
            'code': 'CS104',
            'description': 'Algoritm va ma\'lumotlar strukturasi kursi',
            'credits': 5,
            'semester': 'Spring 2023',
            'teacher': teachers[0]
        }
    ]
    
    courses = []
    for data in courses_data:
        course, created = Course.objects.get_or_create(
            code=data['code'],
            defaults={
                'name': data['name'],
                'description': data['description'],
                'credits': data['credits'],
                'semester': data['semester'],
                'teacher': data['teacher']
            }
        )
        courses.append(course)
    
    print(f"{len(courses)} kurs yaratildi")
    
    # Create enrollments
    for student in students:
        for course in courses:
            Enrollment.objects.get_or_create(
                student=student,
                course=course
            )
    
    print(f"{len(students) * len(courses)} enrollment yaratildi")
    
    # Create schedules
    days = ['MON', 'TUE', 'WED', 'THU', 'FRI']
    times = [
        ('08:30', '10:00'),
        ('10:15', '11:45'),
        ('12:30', '14:00'),
        ('14:15', '15:45'),
        ('16:00', '17:30')
    ]
    rooms = ['A101', 'A102', 'B201', 'B202', 'C301', 'C302']
    
    for course in courses:
        # Assign 2 days per course
        course_days = random.sample(days, 2)
        for i, day in enumerate(course_days):
            time_slot = times[random.randint(0, len(times) - 1)]
            room = rooms[random.randint(0, len(rooms) - 1)]
            
            Schedule.objects.get_or_create(
                course=course,
                day=day,
                defaults={
                    'start_time': time_slot[0],
                    'end_time': time_slot[1],
                    'room': room
                }
            )
    
    print("Dars jadvali yaratildi")
    
    # Create attendance records
    start_date = datetime.now() - timedelta(days=30)
    end_date = datetime.now()
    
    for course in courses:
        # Get all students enrolled in this course
        enrolled_students = Student.objects.filter(enrollment__course=course)
        
        # Create attendance for each class day in the past month
        current_date = start_date
        while current_date <= end_date:
            # Check if this is a class day (MON-FRI)
            if current_date.weekday() < 5:  # 0-4 is Monday to Friday
                for student in enrolled_students:
                    # 80% chance of being present
                    is_present = random.random() < 0.8
                    
                    Attendance.objects.get_or_create(
                        student=student,
                        course=course,
                        date=current_date.date(),
                        defaults={
                            'is_present': is_present
                        }
                    )
            
            current_date += timedelta(days=1)
    
    print("Davomat ma'lumotlari yaratildi")
    
    print("Demo ma'lumotlar muvaffaqiyatli yaratildi!")

if __name__ == '__main__':
    create_demo_data()
