from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from .models import Assignment, Submission
from courses.models import Course, Enrollment

@login_required
def assignment_list(request):
    """List all assignments for a student or teacher"""
    if hasattr(request.user, 'teacher_profile'):
        courses = Course.objects.filter(teacher=request.user.teacher_profile)
        assignments = Assignment.objects.filter(course__in=courses)
    else:
        courses = Course.objects.filter(enrollment__student=request.user.student_profile)
        assignments = Assignment.objects.filter(course__in=courses)
    
    # Group assignments by course
    assignments_by_course = {}
    for course in courses:
        assignments_by_course[course] = assignments.filter(course=course)
    
    return render(request, 'assignments/assignment_list.html', {
        'assignments_by_course': assignments_by_course
    })

@login_required
def assignment_detail(request, assignment_id):
    """View assignment details"""
    assignment = get_object_or_404(Assignment, id=assignment_id)
    
    # Check if user has access to this assignment
    if hasattr(request.user, 'teacher_profile'):
        if assignment.course.teacher != request.user.teacher_profile:
            messages.error(request, "Bu topshiriqqa kirishga ruxsat yo'q.")
            return redirect('assignment_list')
        
        # Teacher view - can see all submissions
        submissions = Submission.objects.filter(assignment=assignment)
        
        return render(request, 'assignments/assignment_detail_teacher.html', {
            'assignment': assignment,
            'submissions': submissions
        })
    else:
        if not Enrollment.objects.filter(student=request.user.student_profile, course=assignment.course).exists():
            messages.error(request, "Bu topshiriqqa kirishga ruxsat yo'q.")
            return redirect('assignment_list')
        
        # Student view - can submit assignment
        try:
            submission = Submission.objects.get(assignment=assignment, student=request.user.student_profile)
        except Submission.DoesNotExist:
            submission = None
        
        if request.method == 'POST' and 'submit_assignment' in request.POST:
            if 'file' in request.FILES:
                if submission:
                    # Update existing submission
                    submission.file = request.FILES['file']
                    submission.submitted_date = timezone.now()
                    submission.save()
                else:
                    # Create new submission
                    submission = Submission.objects.create(
                        assignment=assignment,
                        student=request.user.student_profile,
                        file=request.FILES['file']
                    )
                messages.success(request, "Topshiriq muvaffaqiyatli yuborildi.")
                return redirect('assignment_detail', assignment_id=assignment.id)
        
        return render(request, 'assignments/assignment_detail_student.html', {
            'assignment': assignment,
            'submission': submission
        })
