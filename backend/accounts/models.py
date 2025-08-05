from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator
import uuid

class User(AbstractUser):
    """Custom User model for SDS College"""
    
    ROLE_CHOICES = [
        ('student', 'Student'),
        ('admin', 'College Staff/Admin'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    enrollment_id = models.CharField(
        max_length=20, 
        unique=True, 
        help_text="System generated enrollment ID"
    )
    email = models.EmailField(unique=True, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    phone = models.CharField(
        max_length=15,
        validators=[RegexValidator(r'^\+?1?\d{9,15}$')],
        null=True,
        blank=True
    )
    date_of_birth = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    profile_picture = models.ImageField(
        upload_to='profiles/', 
        null=True, 
        blank=True
    )
    # New fields for password reset and OTP
    must_change_password = models.BooleanField(default=False, help_text="Require user to change password on next login")
    otp_code = models.CharField(max_length=6, null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    
    # Override username to make it optional
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    
    USERNAME_FIELD = 'enrollment_id'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'role']
    
    class Meta:
        db_table = 'users'
        indexes = [
            models.Index(fields=['enrollment_id']),
            models.Index(fields=['email']),
            models.Index(fields=['role']),
        ]
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.enrollment_id})"
    
    def save(self, *args, **kwargs):
        # Auto-generate username from enrollment_id if not provided
        if not self.username:
            self.username = self.enrollment_id
        super().save(*args, **kwargs)

class Student(models.Model):
    """Student specific information"""
    
    YEAR_CHOICES = [
        ('1st Year', '1st Year'),
        ('2nd Year', '2nd Year'),
        ('3rd Year', '3rd Year'),
        ('4th Year', '4th Year'),
    ]
    
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('inactive', 'Inactive'),
        ('graduated', 'Graduated'),
        ('suspended', 'Suspended'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    department = models.CharField(max_length=100)
    year = models.CharField(max_length=20, choices=YEAR_CHOICES)
    section = models.CharField(max_length=10, default='A')
    roll_no = models.CharField(max_length=50)
    admission_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    guardian_name = models.CharField(max_length=100, null=True, blank=True)
    guardian_phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    
    class Meta:
        db_table = 'students'
        indexes = [
            models.Index(fields=['department']),
            models.Index(fields=['year']),
            models.Index(fields=['status']),
        ]
        unique_together = ['department', 'year', 'roll_no']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.roll_no}"