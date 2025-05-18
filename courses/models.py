from django.db import models
from users.models import Student, Teacher
from django.db.models import Count, Q

class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    credits = models.PositiveIntegerField()
    semester = models.CharField(max_length=50)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='courses')
    students = models.ManyToManyField(Student, through='Enrollment', related_name='courses')
    
    def __str__(self):
        return f"{self.code} - {self.name}"
    
    def get_student_attendance_stats(self, student):
        """Get attendance statistics for a specific student in this course"""
        total_classes = Attendance.objects.filter(course=self, student=student).count()
        if total_classes == 0:
            return {'present_percent': 0, 'absent_percent': 0, 'total_classes': 0}
        
        present_count = Attendance.objects.filter(course=self, student=student, is_present=True).count()
        present_percent = (present_count / total_classes) * 100
        absent_percent = 100 - present_percent
        
        return {
            'present_percent': round(present_percent, 1),
            'absent_percent': round(absent_percent, 1),
            'total_classes': total_classes,
            'present_count': present_count,
            'absent_count': total_classes - present_count
        }
    
    def get_overall_attendance_stats(self):
        """Get overall attendance statistics for all students in this course"""
        students = self.students.all()
        total_records = Attendance.objects.filter(course=self).count()
        
        if total_records == 0:
            return {'present_percent': 0, 'absent_percent': 0, 'total_records': 0}
        
        present_count = Attendance.objects.filter(course=self, is_present=True).count()
        present_percent = (present_count / total_records) * 100
        absent_percent = 100 - present_percent
        
        return {
            'present_percent': round(present_percent, 1),
            'absent_percent': round(absent_percent, 1),
            'total_records': total_records,
            'present_count': present_count,
            'absent_count': total_records - present_count
        }

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_enrolled = models.DateField(auto_now_add=True)
    
    class Meta:
        unique_together = ('student', 'course')
    
    def __str__(self):
        return f"{self.student} - {self.course}"
    
    def get_attendance_stats(self):
        """Get attendance statistics for this enrollment"""
        return self.course.get_student_attendance_stats(self.student)

class Schedule(models.Model):
    DAY_CHOICES = (
        ('MON', 'Monday'),
        ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'),
        ('THU', 'Thursday'),
        ('FRI', 'Friday'),
        ('SAT', 'Saturday'),
    )
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='schedules')
    day = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.course} - {self.get_day_display()} {self.start_time}-{self.end_time}"

class Attendance(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date = models.DateField()
    is_present = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('student', 'course', 'date')
    
    def __str__(self):
        status = "Present" if self.is_present else "Absent"
        return f"{self.student} - {self.course} - {self.date} - {status}"

class Material(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='materials')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='materials/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.course} - {self.title}"
