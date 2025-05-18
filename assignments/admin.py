from django.contrib import admin
from .models import Assignment, Submission

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'due_date', 'created_date')
    list_filter = ('course', 'due_date')
    search_fields = ('title', 'description', 'course__name')

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'student', 'submitted_date', 'grade')
    list_filter = ('assignment', 'submitted_date')
    search_fields = ('assignment__title', 'student__user__username')
