#!/usr/bin/env python
"""
Script to create demo data for the LMS system
"""
import os
import django
import random
from datetime import datetime, timedelta

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lms_tuit.settings')
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from users.models import Student, Teacher
from courses.models import Course, Enrollment, Schedule, Attendance, Material
from news.models import NewsCategory, News
from assignments.models import Assignment, Submission
from exams.models import Exam, ExamResult

def create_users():
    """Create admin, teachers and students"""
    print("Creating users...")
    
    # Create admin
    admin, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@tuit.uz',
            'first_name': 'Admin',
            'last_name': 'User',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin.set_password('admin123')
        admin.save()
        print("Admin user created")
    
    # Create teachers
    teachers = []
    for i in range(1, 4):
        teacher, created = User.objects.get_or_create(
            username=f'teacher{i}',
            defaults={
                'email': f'teacher{i}@tuit.uz',
                'first_name': f'Teacher{i}',
                'last_name': 'Lastname',
            }
        )
        if created:
            teacher.set_password('teacher123')
            teacher.save()
            
            # Create teacher profile
            teacher_profile, _ = Teacher.objects.get_or_create(
                user=teacher,
                defaults={
                    'teacher_id': f'T{1000+i}',
                    'department': random.choice(['Computer Science', 'Information Technology', 'Software Engineering']),
                    'position': random.choice(['Professor', 'Associate Professor', 'Assistant Professor']),
                    'qualification': random.choice(['PhD', 'Masters', 'Bachelors']),
                    'date_of_birth': datetime.now() - timedelta(days=365*30),
                    'phone_number': f'+998901234{i:03d}',
                    'address': 'Tashkent, Uzbekistan'
                }
            )
            print(f"Teacher {i} created")
        
        teachers.append(teacher)
    
    # Create students
    students = []
    for i in range(1, 11):
        student, created = User.objects.get_or_create(
            username=f'student{i}',
            defaults={
                'email': f'student{i}@tuit.uz',
                'first_name': f'Student{i}',
                'last_name': 'Lastname',
            }
        )
        if created:
            student.set_password('student123')
            student.save()
            
            # Create student profile
            student_profile, _ = Student.objects.get_or_create(
                user=student,
                defaults={
                    'student_id': f'S{2000+i}',
                    'group': f'Group-{random.choice(["A", "B", "C"])}{random.randint(1, 3)}',
                    'faculty': random.choice(['Computer Science', 'Information Technology', 'Software Engineering']),
                    'year_of_study': random.randint(1, 4),
                    'date_of_birth': datetime.now() - timedelta(days=365*20),
                    'phone_number': f'+998901234{i:03d}',
                    'address': 'Tashkent, Uzbekistan'
                }
            )
            print(f"Student {i} created")
        
        students.append(student)
    
    return admin, teachers, students

def create_courses(teachers):
    """Create courses"""
    print("Creating courses...")
    
    courses = []
    course_data = [
        {
            'name': 'Introduction to Programming',
            'code': 'CS101',
            'description': 'Basic programming concepts using Python',
            'credits': 4,
            'semester': 'Fall 2023'
        },
        {
            'name': 'Data Structures and Algorithms',
            'code': 'CS201',
            'description': 'Study of data structures and algorithms',
            'credits': 4,
            'semester': 'Spring 2024'
        },
        {
            'name': 'Database Systems',
            'code': 'CS301',
            'description': 'Introduction to database design and SQL',
            'credits': 3,
            'semester': 'Fall 2023'
        },
        {
            'name': 'Web Development',
            'code': 'CS401',
            'description': 'Building web applications using modern technologies',
            'credits': 3,
            'semester': 'Spring 2024'
        },
        {
            'name': 'Artificial Intelligence',
            'code': 'CS501',
            'description': 'Introduction to AI concepts and algorithms',
            'credits': 4,
            'semester': 'Fall 2023'
        }
    ]
    
    for i, data in enumerate(course_data):
        teacher = Teacher.objects.get(user=teachers[i % len(teachers)])
        
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
        
        if created:
            print(f"Course {data['name']} created")
        
        courses.append(course)
    
    return courses

def create_enrollments(courses, students):
    """Enroll students in courses"""
    print("Creating enrollments...")
    
    for student in Student.objects.filter(user__in=students):
        # Enroll each student in 2-4 random courses
        num_courses = random.randint(2, 4)
        selected_courses = random.sample(courses, num_courses)
        
        for course in selected_courses:
            enrollment, created = Enrollment.objects.get_or_create(
                student=student,
                course=course,
                defaults={
                    'date_enrolled': timezone.now() - timedelta(days=random.randint(1, 30))
                }
            )
            
            if created:
                print(f"Enrolled {student.user.username} in {course.name}")

def create_schedules(courses):
    """Create course schedules"""
    print("Creating schedules...")
    
    days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    start_times = ['08:30', '10:00', '11:30', '13:30', '15:00', '16:30']
    rooms = ['A101', 'A102', 'B201', 'B202', 'C301', 'C302']
    
    for course in courses:
        # Create 2 schedule entries per course
        num_schedules = 2
        selected_days = random.sample(days, num_schedules)
        
        for i in range(num_schedules):
            day = selected_days[i]
            start_time = random.choice(start_times)
            start_hour, start_minute = map(int, start_time.split(':'))
            
            # End time is 1.5 hours after start time
            end_hour = start_hour + 1
            end_minute = start_minute + 30
            if end_minute >= 60:
                end_hour += 1
                end_minute -= 60
            
            end_time = f"{end_hour:02d}:{end_minute:02d}"
            room = random.choice(rooms)
            
            schedule, created = Schedule.objects.get_or_create(
                course=course,
                day=day,
                defaults={
                    'start_time': start_time,
                    'end_time': end_time,
                    'room': room
                }
            )
            
            if created:
                print(f"Created schedule for {course.name} on {day}")

def create_attendance(courses):
    """Create attendance records"""
    print("Creating attendance records...")
    
    # Create attendance for the past 4 weeks
    for course in courses:
        enrollments = Enrollment.objects.filter(course=course)
        
        # For each course, create attendance for 8 days (2 days per week for 4 weeks)
        for day_offset in range(1, 30, 3):
            attendance_date = timezone.now().date() - timedelta(days=day_offset)
            
            for enrollment in enrollments:
                # 80% chance of being present
                is_present = random.random() < 0.8
                
                attendance, created = Attendance.objects.get_or_create(
                    student=enrollment.student,
                    course=course,
                    date=attendance_date,
                    defaults={
                        'is_present': is_present
                    }
                )
                
                if created:
                    status = "present" if is_present else "absent"
                    print(f"Created attendance for {enrollment.student.user.username} in {course.name} on {attendance_date} - {status}")

def create_news():
    """Create news categories and news"""
    print("Creating news...")
    
    # Create categories
    categories = []
    category_names = ['Announcements', 'Events', 'Academic', 'Campus Life']
    
    for name in category_names:
        slug = name.lower().replace(' ', '-')
        category, created = NewsCategory.objects.get_or_create(
            slug=slug,
            defaults={'name': name}
        )
        
        if created:
            print(f"Created news category: {name}")
        
        categories.append(category)
    
    # Create news
    news_data = [
        {
            'title': 'Welcome to the New Semester',
            'content': 'Welcome to the new academic semester! We are excited to have you back on campus.',
            'category': 'Announcements'
        },
        {
            'title': 'Upcoming Career Fair',
            'content': 'The annual career fair will be held next month. Prepare your resumes and meet potential employers.',
            'category': 'Events'
        },
        {
            'title': 'New Computer Lab Opening',
            'content': 'We are pleased to announce the opening of our new computer lab with state-of-the-art equipment.',
            'category': 'Campus Life'
        },
        {
            'title': 'Final Exam Schedule',
            'content': 'The final exam schedule for this semester has been published. Please check your exam dates.',
            'category': 'Academic'
        },
        {
            'title': 'Student Research Symposium',
            'content': 'Join us for the annual student research symposium where students present their research projects.',
            'category': 'Events'
        }
    ]
    
    admin = User.objects.get(username='admin')
    
    for data in news_data:
        category_name = data['category']
        category = NewsCategory.objects.get(name=category_name)
        
        title = data['title']
        slug = title.lower().replace(' ', '-')
        
        news, created = News.objects.get_or_create(
            slug=slug,
            defaults={
                'title': title,
                'content': data['content'],
                'category': category,
                'author': admin,
                'published_date': timezone.now() - timedelta(days=random.randint(1, 30))
            }
        )
        
        if created:
            print(f"Created news: {title}")

def create_assignments(courses):
    """Create assignments"""
    print("Creating assignments...")
    
    assignment_data = [
        {
            'title': 'Programming Assignment 1',
            'description': 'Implement a simple calculator using Python.',
            'due_days': 14
        },
        {
            'title': 'Database Design Project',
            'description': 'Design a database schema for a library management system.',
            'due_days': 21
        },
        {
            'title': 'Web Development Task',
            'description': 'Create a responsive landing page using HTML, CSS, and JavaScript.',
            'due_days': 10
        },
        {
            'title': 'Algorithm Analysis',
            'description': 'Analyze the time and space complexity of the provided algorithms.',
            'due_days': 7
        },
        {
            'title': 'Research Paper',
            'description': 'Write a research paper on a topic related to artificial intelligence.',
            'due_days': 30
        }
    ]
    
    for course in courses:
        # Assign 1-3 random assignments to each course
        num_assignments = random.randint(1, 3)
        selected_assignments = random.sample(assignment_data, num_assignments)
        
        for data in selected_assignments:
            due_date = timezone.now() + timedelta(days=data['due_days'])
            
            assignment, created = Assignment.objects.get_or_create(
                title=data['title'],
                course=course,
                defaults={
                    'description': data['description'],
                    'due_date': due_date,
                    'max_points': random.choice([50, 100])
                }
            )
            
            if created:
                print(f"Created assignment: {data['title']} for {course.name}")
                
                # Create submissions for some students
                enrollments = Enrollment.objects.filter(course=course)
                
                for enrollment in enrollments:
                    # 60% chance of submitting
                    if random.random() < 0.6:
                        submitted_date = timezone.now() - timedelta(days=random.randint(1, 5))
                        grade = random.randint(60, 100) if submitted_date < due_date else random.randint(40, 80)
                        
                        submission, created = Submission.objects.get_or_create(
                            assignment=assignment,
                            student=enrollment.student,
                            defaults={
                                'submitted_date': submitted_date,
                                'comments': 'Demo submission',
                                'grade': grade
                            }
                        )
                        
                        if created:
                            print(f"Created submission for {enrollment.student.user.username}")

def create_exams(courses):
    """Create exams and results"""
    print("Creating exams...")
    
    exam_data = [
        {
            'title': 'Midterm Exam',
            'description': 'Covers all topics from the first half of the semester.',
            'days_offset': -14,
            'duration': 120
        },
        {
            'title': 'Final Exam',
            'description': 'Comprehensive exam covering all course material.',
            'days_offset': 30,
            'duration': 180
        },
        {
            'title': 'Quiz 1',
            'description': 'Short quiz on basic concepts.',
            'days_offset': -21,
            'duration': 30
        }
    ]
    
    for course in courses:
        # Assign 1-2 random exams to each course
        num_exams = random.randint(1, 2)
        selected_exams = random.sample(exam_data, num_exams)
        
        for data in selected_exams:
            exam_date = timezone.now() + timedelta(days=data['days_offset'])
            
            exam, created = Exam.objects.get_or_create(
                title=data['title'],
                course=course,
                defaults={
                    'description': data['description'],
                    'exam_date': exam_date,
                    'duration': data['duration'],
                    'max_score': 100
                }
            )
            
            if created:
                print(f"Created exam: {data['title']} for {course.name}")
                
                # If exam is in the past, create results
                if data['days_offset'] < 0:
                    enrollments = Enrollment.objects.filter(course=course)
                    
                    for enrollment in enrollments:
                        score = random.randint(50, 100)
                        
                        result, created = ExamResult.objects.get_or_create(
                            exam=exam,
                            student=enrollment.student,
                            defaults={
                                'score': score,
                                'feedback': 'Demo exam result'
                            }
                        )
                        
                        if created:
                            print(f"Created exam result for {enrollment.student.user.username} - Score: {score}")

def main():
    """Main function to create all demo data"""
    print("Creating demo data for LMS...")
    
    admin, teachers, students = create_users()
    courses = create_courses([t.teacher_profile for t in teachers])
    create_enrollments(courses, students)
    create_schedules(courses)
    create_attendance(courses)
    create_news()
    create_assignments(courses)
    create_exams(courses)
    
    print("Demo data creation completed!")

if __name__ == "__main__":
    main()
