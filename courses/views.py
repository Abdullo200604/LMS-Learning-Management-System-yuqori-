from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from .models import Course, Enrollment, Schedule, Attendance, Material
from users.models import Student
from .forms import CourseForm, MaterialForm, AttendanceForm
import datetime

@login_required
def course_list(request):
    """List all courses for a student or teacher"""
    if hasattr(request.user, 'teacher_profile'):
        courses = Course.objects.filter(teacher=request.user.teacher_profile)
    else:
        courses = Course.objects.filter(enrollment__student=request.user.student_profile)
    
    return render(request, 'courses/course_list.html', {'courses': courses})

@login_required
def course_detail(request, course_id):
    """View course details"""
    course = get_object_or_404(Course, id=course_id)
    
    # Check if user has access to this course
    if hasattr(request.user, 'teacher_profile'):
        if course.teacher != request.user.teacher_profile:
            messages.error(request, "Bu kursga kirishga ruxsat yo'q.")
            return redirect('course_list')
        
        # Get overall attendance stats for the course
        attendance_stats = course.get_overall_attendance_stats()
    else:
        if not Enrollment.objects.filter(student=request.user.student_profile, course=course).exists():
            messages.error(request, "Bu kursga kirishga ruxsat yo'q.")
            return redirect('course_list')
        
        # Get student's attendance stats for this course
        attendance_stats = course.get_student_attendance_stats(request.user.student_profile)
    
    schedules = Schedule.objects.filter(course=course)
    materials = Material.objects.filter(course=course)
    
    context = {
        'course': course,
        'schedules': schedules,
        'materials': materials,
        'attendance_stats': attendance_stats,
    }
    
    return render(request, 'courses/course_detail.html', context)

@login_required
def schedule(request):
    """View weekly schedule"""
    if hasattr(request.user, 'teacher_profile'):
        courses = Course.objects.filter(teacher=request.user.teacher_profile)
    else:
        courses = Course.objects.filter(enrollment__student=request.user.student_profile)
    
    schedules = Schedule.objects.filter(course__in=courses).order_by('day', 'start_time')
    
    # Organize schedules by day
    schedule_by_day = {
        'MON': [],
        'TUE': [],
        'WED': [],
        'THU': [],
        'FRI': [],
        'SAT': [],
    }
    
    for schedule in schedules:
        schedule_by_day[schedule.day].append(schedule)
    
    return render(request, 'courses/schedule.html', {'schedule_by_day': schedule_by_day})

@login_required
def attendance(request, course_id):
    """View or mark attendance for a course"""
    course = get_object_or_404(Course, id=course_id)
    
    # Check if user has access to this course
    if hasattr(request.user, 'teacher_profile'):
        if course.teacher != request.user.teacher_profile:
            messages.error(request, "Bu kursga kirishga ruxsat yo'q.")
            return redirect('course_list')
        
        # Teacher view - can mark attendance
        students = Student.objects.filter(enrollment__course=course)
        
        # Default to today's date
        selected_date = timezone.now().date()
        if request.GET.get('date'):
            try:
                selected_date = datetime.datetime.strptime(request.GET.get('date'), '%Y-%m-%d').date()
            except ValueError:
                pass
        
        # Get existing attendance records for this date
        attendances = Attendance.objects.filter(
            course=course,
            date=selected_date
        ).select_related('student')
        
        # Create a dictionary for quick lookup
        attendance_dict = {a.student.id: a.is_present for a in attendances}
        
        # Get attendance stats for each student
        student_stats = {}
        for student in students:
            student_stats[student.id] = course.get_student_attendance_stats(student)
        
        if request.method == 'POST':
            date = request.POST.get('date')
            try:
                attendance_date = datetime.datetime.strptime(date, '%Y-%m-%d').date()
            except ValueError:
                messages.error(request, "Noto'g'ri sana formati.")
                return redirect('attendance', course_id=course.id)
            
            for student in students:
                is_present = request.POST.get(f'attendance_{student.id}') == 'present'
                attendance, created = Attendance.objects.update_or_create(
                    student=student,
                    course=course,
                    date=attendance_date,
                    defaults={'is_present': is_present}
                )
            
            messages.success(request, "Davomat muvaffaqiyatli saqlandi.")
            return redirect('attendance', course_id=course.id)
        
        context = {
            'course': course,
            'students': students,
            'selected_date': selected_date,
            'attendance_dict': attendance_dict,
            'student_stats': student_stats,
            'overall_stats': course.get_overall_attendance_stats(),
        }
        
        return render(request, 'courses/mark_attendance.html', context)
    else:
        # Student view - can only view their attendance
        if not Enrollment.objects.filter(student=request.user.student_profile, course=course).exists():
            messages.error(request, "Bu kursga kirishga ruxsat yo'q.")
            return redirect('course_list')
        
        attendances = Attendance.objects.filter(
            student=request.user.student_profile,
            course=course
        ).order_by('-date')
        
        # Get student's attendance stats
        attendance_stats = course.get_student_attendance_stats(request.user.student_profile)
        
        context = {
            'course': course,
            'attendances': attendances,
            'attendance_stats': attendance_stats,
        }
        
        return render(request, 'courses/view_attendance.html', context)

@login_required
def attendance_list(request):
    """List all courses for attendance marking"""
    if not hasattr(request.user, 'teacher_profile'):
        messages.error(request, "Faqat o'qituvchilar uchun.")
        return redirect('dashboard')
    
    courses = Course.objects.filter(teacher=request.user.teacher_profile)
    
    # Get overall attendance stats for each course
    course_stats = {}
    for course in courses:
        course_stats[course.id] = course.get_overall_attendance_stats()
    
    return render(request, 'courses/attendance_list.html', {
        'courses': courses,
        'course_stats': course_stats,
    })

@login_required
def attendance_stats(request, course_id):
    """View detailed attendance statistics for a course"""
    course = get_object_or_404(Course, id=course_id)
    
    # Check if user has access to this course
    if hasattr(request.user, 'teacher_profile'):
        if course.teacher != request.user.teacher_profile:
            messages.error(request, "Bu kursga kirishga ruxsat yo'q.")
            return redirect('course_list')
        
        students = Student.objects.filter(enrollment__course=course)
        
        # Get attendance stats for each student
        student_stats = {}
        for student in students:
            student_stats[student.id] = course.get_student_attendance_stats(student)
        
        context = {
            'course': course,
            'students': students,
            'student_stats': student_stats,
            'overall_stats': course.get_overall_attendance_stats(),
        }
        
        return render(request, 'courses/attendance_stats.html', context)
    else:
        if not Enrollment.objects.filter(student=request.user.student_profile, course=course).exists():
            messages.error(request, "Bu kursga kirishga ruxsat yo'q.")
            return redirect('course_list')
        
        # Get student's attendance stats
        attendance_stats = course.get_student_attendance_stats(request.user.student_profile)
        
        context = {
            'course': course,
            'attendance_stats': attendance_stats,
        }
        
        return render(request, 'courses/student_attendance_stats.html', context)
