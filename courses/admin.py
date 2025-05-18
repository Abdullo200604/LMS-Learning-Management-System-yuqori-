from django.contrib import admin
from .models import Course, Enrollment, Schedule, Attendance, Material

class EnrollmentInline(admin.TabularInline):
    model = Enrollment
    extra = 1

class ScheduleInline(admin.TabularInline):
    model = Schedule
    extra = 1

class MaterialInline(admin.TabularInline):
    model = Material
    extra = 1

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'teacher', 'semester', 'credits')
    search_fields = ('code', 'name', 'teacher__user__username')
    list_filter = ('semester', 'teacher')
    inlines = [EnrollmentInline, ScheduleInline, MaterialInline]

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'date_enrolled')
    search_fields = ('student__user__username', 'course__name')
    list_filter = ('course', 'date_enrolled')

@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    list_display = ('course', 'day', 'start_time', 'end_time', 'room')
    search_fields = ('course__name', 'room')
    list_filter = ('day', 'course')

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'date', 'is_present')
    search_fields = ('student__user__username', 'course__name')
    list_filter = ('date', 'is_present', 'course')

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'uploaded_at')
    search_fields = ('title', 'course__name')
    list_filter = ('course', 'uploaded_at')
