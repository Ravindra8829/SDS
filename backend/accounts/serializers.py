from rest_framework import serializers
from django.contrib.auth import authenticate
from django.db import models
from .models import User, Student

class UserSerializer(serializers.ModelSerializer):
    """Serializer for User model"""
    
    class Meta:
        model = User
        fields = [
            'id', 'enrollment_id', 'email', 'first_name', 'last_name',
            'role', 'phone', 'date_of_birth', 'is_active', 'date_joined'
        ]
        read_only_fields = ['id', 'enrollment_id', 'date_joined']

class StudentSerializer(serializers.ModelSerializer):
    """Serializer for Student model"""
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Student
        fields = [
            'user', 'department', 'year', 'section', 'roll_no',
            'admission_date', 'status', 'guardian_name', 'guardian_phone', 'address'
        ]

class LoginSerializer(serializers.Serializer):
    """Serializer for user login"""
    user_id = serializers.CharField()
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=User.ROLE_CHOICES, required=False)
    
    def validate(self, attrs):
        user_id = attrs.get('user_id')
        password = attrs.get('password')
        role = attrs.get('role')
        
        if not user_id or not password:
            raise serializers.ValidationError('User ID and password are required.')
        
        # Try to find user by enrollment_id or email
        try:
            user = User.objects.get(
                models.Q(enrollment_id=user_id) | models.Q(email=user_id),
                is_active=True
            )
        except User.DoesNotExist:
            raise serializers.ValidationError('Invalid credentials or account not found.')
        
        # Check role if specified
        if role and user.role != role:
            raise serializers.ValidationError('Invalid role for this account.')
        
        # Authenticate user
        if not user.check_password(password):
            raise serializers.ValidationError('Invalid credentials.')
        
        attrs['user'] = user
        return attrs

class CreateStudentSerializer(serializers.ModelSerializer):
    """Serializer for creating new students"""
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    date_of_birth = serializers.DateField(required=False)
    
    class Meta:
        model = Student
        fields = [
            'first_name', 'last_name', 'email', 'phone', 'date_of_birth',
            'department', 'year', 'section', 'roll_no', 'guardian_name',
            'guardian_phone', 'address'
        ]
    
    def create(self, validated_data):
        # Extract user data
        user_data = {
            'first_name': validated_data.pop('first_name'),
            'last_name': validated_data.pop('last_name'),
            'email': validated_data.pop('email', ''),
            'phone': validated_data.pop('phone', ''),
            'date_of_birth': validated_data.pop('date_of_birth', None),
            'role': 'student',
        }
        
        # Generate enrollment ID
        enrollment_id = self._generate_enrollment_id(
            validated_data['department'], 
            validated_data['year']
        )
        user_data['enrollment_id'] = enrollment_id
        
        # Create user with default password
        user = User.objects.create_user(
            username=enrollment_id,
            password='student123',  # Default password
            **user_data
        )
        
        # Create student profile
        student = Student.objects.create(user=user, **validated_data)
        return student
    
    def _generate_enrollment_id(self, department, year):
        """Generate unique enrollment ID"""
        from datetime import datetime
        
        # Get department code (first 3 letters)
        dept_code = department[:3].upper()
        current_year = datetime.now().year
        
        # Find last student with similar pattern
        last_student = User.objects.filter(
            enrollment_id__startswith=f"{dept_code}{current_year}"
        ).order_by('enrollment_id').last()
        
        if last_student:
            last_sequence = int(last_student.enrollment_id[-3:])
            next_sequence = last_sequence + 1
        else:
            next_sequence = 1
        
        return f"{dept_code}{current_year}{next_sequence:03d}"