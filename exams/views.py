from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Exam, ExamResult
from courses.models import Course, Enrollment

@login_required
def exam_list(request):
    """List all exams for a student or teacher"""
    if hasattr(request.user, 'teacher_profile'):
        courses = Course.objects.filter(teacher=request.user.teacher_profile)
        exams = Exam.objects.filter(course__in=courses)
    else:
        courses = Course.objects.filter(enrollment__student=request.user.student_profile)
        exams = Exam.objects.filter(course__in=courses)
    
    # Group exams by course
    exams_by_course = {}
    for course in courses:
        exams_by_course[course] = exams.filter(course=course)
    
    return render(request, 'exams/exam_list.html', {
        'exams_by_course': exams_by_course
    })

@login_required
def exam_detail(request, exam_id):
    """View exam details"""
    exam = get_object_or_404(Exam, id=exam_id)
    
    # Check if user has access to this exam
    if hasattr(request.user, 'teacher_profile'):
        if exam.course.teacher != request.user.teacher_profile:
            messages.error(request, "Bu imtihonga kirishga ruxsat yo'q.")
            return redirect('exam_list')
        
        # Teacher view - can see all results
        results = ExamResult.objects.filter(exam=exam)
        
        return render(request, 'exams/exam_detail_teacher.html', {
            'exam': exam,
            'results': results
        })
    else:
        if not Enrollment.objects.filter(student=request.user.student_profile, course=exam.course).exists():
            messages.error(request, "Bu imtihonga kirishga ruxsat yo'q.")
            return redirect('exam_list')
        
        # Student view - can see their result
        try:
            result = ExamResult.objects.get(exam=exam, student=request.user.student_profile)
        except ExamResult.DoesNotExist:
            result = None
        
        return render(request, 'exams/exam_detail_student.html', {
            'exam': exam,
            'result': result
        })
