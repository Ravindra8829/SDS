from django.db import models
from django.contrib.auth import get_user_model
from academics.models import Subject

User = get_user_model()

class Attendance(models.Model):
    """Student attendance records"""
    
    STATUS_CHOICES = [
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('excused', 'Excused'),
    ]
    
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attendance_records')
    subject = models.ForeignKey('academics.Subject', on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='present')
    remarks = models.TextField(blank=True)
    marked_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='marked_attendance')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'attendance'
        unique_together = ['student', 'subject', 'date']
        indexes = [
            models.Index(fields=['student', 'date']),
            models.Index(fields=['subject', 'date']),
            models.Index(fields=['date']),
        ]
        ordering = ['-date']
    
    def __str__(self):
        return f"{self.student.get_full_name()} - {self.date} - {self.status}"

class AttendanceSummary(models.Model):
    """Monthly attendance summary for performance optimization"""
    
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    month = models.DateField()  # First day of the month
    total_classes = models.PositiveIntegerField(default=0)
    present_count = models.PositiveIntegerField(default=0)
    absent_count = models.PositiveIntegerField(default=0)
    late_count = models.PositiveIntegerField(default=0)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    
    class Meta:
        db_table = 'attendance_summary'
        unique_together = ['student', 'subject', 'month']
        indexes = [
            models.Index(fields=['student', 'month']),
            models.Index(fields=['month']),
        ]
    
    def calculate_percentage(self):
        if self.total_classes > 0:
            self.percentage = (self.present_count / self.total_classes) * 100
        else:
            self.percentage = 0
        return self.percentage