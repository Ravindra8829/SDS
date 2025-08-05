from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Subject(models.Model):
    """Academic subjects/courses"""
    
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20, unique=True)
    department = models.CharField(max_length=100)
    credits = models.PositiveIntegerField(default=3)
    semester = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    
    class Meta:
        db_table = 'subjects'
        indexes = [
            models.Index(fields=['code']),
            models.Index(fields=['department']),
            models.Index(fields=['semester']),
        ]
    
    def __str__(self):
        return f"{self.code} - {self.name}"

class Assignment(models.Model):
    """Student assignments"""
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='assignments')
    due_date = models.DateTimeField()
    max_marks = models.PositiveIntegerField(default=100)
    instructions = models.TextField(blank=True)
    attachment = models.FileField(upload_to='assignments/', null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'assignments'
        indexes = [
            models.Index(fields=['due_date']),
            models.Index(fields=['subject']),
            models.Index(fields=['created_by']),
        ]
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.subject.code}"
    
    @property
    def is_overdue(self):
        from django.utils import timezone
        return timezone.now() > self.due_date

class Submission(models.Model):
    """Student assignment submissions"""
    
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submissions')
    submission_file = models.FileField(upload_to='submissions/')
    submission_text = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    marks_obtained = models.PositiveIntegerField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    graded_at = models.DateTimeField(null=True, blank=True)
    graded_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='graded_submissions'
    )
    
    class Meta:
        db_table = 'submissions'
        unique_together = ['assignment', 'student']
        indexes = [
            models.Index(fields=['assignment', 'student']),
            models.Index(fields=['submitted_at']),
        ]
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.student.get_full_name()} - {self.assignment.title}"
    
    @property
    def is_late(self):
        return self.submitted_at > self.assignment.due_date