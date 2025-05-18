from django.contrib import admin
from .models import Exam, ExamResult

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'exam_date', 'duration')
    list_filter = ('course', 'exam_date')
    search_fields = ('title', 'description', 'course__name')

@admin.register(ExamResult)
class ExamResultAdmin(admin.ModelAdmin):
    list_display = ('exam', 'student', 'score', 'grade')
    list_filter = ('exam', 'grade')
    search_fields = ('exam__title', 'student__user__username')
