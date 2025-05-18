from django.db import models
from courses.models import Course
from users.models import Student

class Exam(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='exams')
    exam_date = models.DateTimeField()
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    max_score = models.PositiveIntegerField(default=100)
    
    def __str__(self):
        return f"{self.title} - {self.course}"

class ExamResult(models.Model):
    GRADE_CHOICES = (
        ('A', 'A'),
        ('B', 'B'),
        ('C', 'C'),
        ('D', 'D'),
        ('F', 'F'),
    )
    
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='results')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='exam_results')
    score = models.PositiveIntegerField()
    grade = models.CharField(max_length=1, choices=GRADE_CHOICES)
    feedback = models.TextField(blank=True, null=True)
    
    class Meta:
        unique_together = ('exam', 'student')
    
    def __str__(self):
        return f"{self.student} - {self.exam} - {self.grade}"
    
    def save(self, *args, **kwargs):
        # Calculate grade based on score
        percentage = (self.score / self.exam.max_score) * 100
        
        if percentage >= 90:
            self.grade = 'A'
        elif percentage >= 80:
            self.grade = 'B'
        elif percentage >= 70:
            self.grade = 'C'
        elif percentage >= 60:
            self.grade = 'D'
        else:
            self.grade = 'F'
        
        super().save(*args, **kwargs)
