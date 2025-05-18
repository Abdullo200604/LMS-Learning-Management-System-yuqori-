from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Student, Teacher

class StudentInline(admin.StackedInline):
    model = Student
    can_delete = False
    verbose_name_plural = 'Student Profile'

class TeacherInline(admin.StackedInline):
    model = Teacher
    can_delete = False
    verbose_name_plural = 'Teacher Profile'

class CustomUserAdmin(UserAdmin):
    inlines = (StudentInline, TeacherInline)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_role')
    
    def get_role(self, obj):
        if hasattr(obj, 'student_profile'):
            return 'Student'
        elif hasattr(obj, 'teacher_profile'):
            return 'Teacher'
        elif obj.is_staff:
            return 'Admin'
        return 'Unknown'
    
    get_role.short_description = 'Role'

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Student)
admin.site.register(Teacher)
