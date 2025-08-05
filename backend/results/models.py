from django.db import models
from django.contrib.auth import get_user_model
from academics.models import Subject

User = get_user_model()

class ExamType(models.Model):
    """Types of examinations"""
    
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    weightage = models.DecimalField(max_digits=5, decimal_places=2, default=100)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'exam_types'
    
    def __str__(self):
        return self.name

class Result(models.Model):
    """Student exam results"""
    
    EXAM_TYPES = [
        ('midterm', 'Mid Term'),
        ('final', 'Final Term'),
        ('assignment', 'Assignment'),
        ('quiz', 'Quiz'),
        ('project', 'Project'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='results')
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE, null=True, blank=True)
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPES)
    exam_date = models.DateField()
    marks = models.PositiveIntegerField()
    max_marks = models.PositiveIntegerField(default=100)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    grade = models.CharField(max_length=2, null=True, blank=True)
    remarks = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'results'
        indexes = [
            models.Index(fields=['student', 'exam_date']),
            models.Index(fields=['subject', 'exam_type']),
        ]
    
    def save(self, *args, **kwargs):
        # Calculate percentage and grade
        if self.marks and self.max_marks:
            self.percentage = (self.marks / self.max_marks) * 100
            
            # Calculate grade
            if self.percentage >= 90:
                self.grade = 'A+'
            elif self.percentage >= 80:
                self.grade = 'A'
            elif self.percentage >= 70:
                self.grade = 'B+'
            elif self.percentage >= 60:
                self.grade = 'B'
            elif self.percentage >= 50:
                self.grade = 'C+'
            else:
                self.grade = 'C'
        
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.student.get_full_name()} - {self.exam_type} - {self.grade}"

class Semester(models.Model):
    """Academic semesters"""
    
    name = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    is_current = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'semesters'
        ordering = ['-start_date']
    
    def __str__(self):
        return self.name

class GradeReport(models.Model):
    """Semester-wise grade reports"""
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='grade_reports')
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    total_credits = models.PositiveIntegerField(default=0)
    credits_earned = models.PositiveIntegerField(default=0)
    gpa = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2, default=0)
    rank = models.PositiveIntegerField(null=True, blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'grade_reports'
        unique_together = ['student', 'semester']
        ordering = ['-semester__start_date']
    
    def __str__(self):
        return f"{self.student.get_full_name()} - {self.semester.name}"