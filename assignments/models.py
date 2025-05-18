from django.db import models
from django.utils import timezone
from courses.models import Course
from users.models import Student

class Assignment(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    file = models.FileField(upload_to='assignments/', blank=True, null=True)
    due_date = models.DateTimeField()
    created_date = models.DateTimeField(auto_now_add=True)
    max_points = models.PositiveIntegerField(default=100)
    
    def __str__(self):
        return f"{self.title} - {self.course}"
    
    @property
    def is_past_due(self):
        return timezone.now() > self.due_date

class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='submissions')
    file = models.FileField(upload_to='submissions/')
    submitted_date = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(blank=True, null=True)
    grade = models.PositiveIntegerField(blank=True, null=True)
    
    class Meta:
        unique_together = ('assignment', 'student')
    
    def __str__(self):
        return f"{self.student} - {self.assignment}"
    
    @property
    def is_late(self):
        return self.submitted_date > self.assignment.due_date
