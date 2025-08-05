from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import Student
from .serializers import (
    LoginSerializer, UserSerializer, StudentSerializer, 
    CreateStudentSerializer
)
from django.utils import timezone
import random

User = get_user_model()

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_view(request):
    """Enhanced login endpoint with role-based authentication"""
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        # Prepare user data
        user_data = {
            'id': str(user.id),
            'enrollment_id': user.enrollment_id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'role': user.role,
            'phone': user.phone,
            'must_change_password': user.must_change_password,
        }
        
        # Add student-specific data if user is a student
        if user.role == 'student':
            try:
                student = user.student_profile
                user_data.update({
                    'department': student.department,
                    'year': student.year,
                    'section': student.section,
                    'roll_no': student.roll_no,
                    'status': student.status,
                })
            except Student.DoesNotExist:
                pass
        
        return Response({
            'access': str(access_token),
            'refresh': str(refresh),
            'user': user_data,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def profile_view(request):
    """Get current user profile"""
    user = request.user
    user_data = UserSerializer(user).data
    
    if user.role == 'student':
        try:
            student_data = StudentSerializer(user.student_profile).data
            user_data.update(student_data)
        except Student.DoesNotExist:
            pass
    
    return Response({'user': user_data})

class StudentListCreateView(generics.ListCreateAPIView):
    """List and create students (Admin only)"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        # Only admins can access this
        if self.request.user.role != 'admin':
            return Student.objects.none()
        
        queryset = Student.objects.select_related('user').all()
        
        # Search functionality
        search = self.request.query_params.get('search', '')
        if search:
            queryset = queryset.filter(
                Q(user__first_name__icontains=search) |
                Q(user__last_name__icontains=search) |
                Q(user__enrollment_id__icontains=search) |
                Q(user__email__icontains=search) |
                Q(roll_no__icontains=search)
            )
        
        # Department filter
        department = self.request.query_params.get('department', '')
        if department:
            queryset = queryset.filter(department__icontains=department)
        
        # Year filter
        year = self.request.query_params.get('year', '')
        if year:
            queryset = queryset.filter(year=year)
        
        return queryset.order_by('-user__date_joined')
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return CreateStudentSerializer
        return StudentSerializer
    
    def create(self, request, *args, **kwargs):
        # Only admins can create students
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only college staff can add new students.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            return Response({
                'message': 'Student added successfully',
                'enrollment_id': student.user.enrollment_id,
                'default_password': 'student123',
                'student': StudentSerializer(student).data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def check_enrollment_view(request):
    """Check if enrollment ID exists (for password reset)"""
    enrollment_id = request.data.get('enrollment_id', '')
    
    if not enrollment_id:
        return Response(
            {'error': 'Enrollment ID is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user = User.objects.get(enrollment_id=enrollment_id, is_active=True)
        return Response({
            'exists': True,
            'name': user.get_full_name(),
            'role': user.role
        })
    except User.DoesNotExist:
        return Response({
            'exists': False,
            'message': 'Enrollment ID not found in our records'
        })

def generate_otp():
    return str(random.randint(100000, 999999))

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def send_otp_view(request):
    """Send OTP to student's phone for password reset"""
    enrollment_id = request.data.get('enrollment_id', '')
    if not enrollment_id:
        return Response({'error': 'Enrollment ID is required'}, status=400)
    try:
        user = User.objects.get(enrollment_id=enrollment_id, is_active=True)
        otp = generate_otp()
        user.otp_code = otp
        user.otp_created_at = timezone.now()
        user.save()
        # Here, integrate with SMS gateway. For now, just mock.
        print(f"[MOCK SMS] OTP for {user.phone}: {otp}")
        return Response({'message': 'OTP sent to your registered phone number.'})
    except User.DoesNotExist:
        return Response({'error': 'Enrollment ID not found'}, status=404)

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def set_password_view(request):
    """Allow students to set their password if enrollment ID exists and OTP is valid"""
    enrollment_id = request.data.get('enrollment_id', '')
    new_password = request.data.get('password', '')
    otp = request.data.get('otp', '')
    
    if not enrollment_id or not new_password or not otp:
        return Response(
            {'error': 'Enrollment ID, OTP, and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if len(new_password) < 6:
        return Response(
            {'error': 'Password must be at least 6 characters long'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        user = User.objects.get(enrollment_id=enrollment_id, is_active=True)
        # Check OTP validity (valid for 10 minutes)
        if not user.otp_code or user.otp_code != otp:
            return Response({'error': 'Invalid OTP'}, status=400)
        if user.otp_created_at and (timezone.now() - user.otp_created_at).total_seconds() > 600:
            return Response({'error': 'OTP expired'}, status=400)
        user.set_password(new_password)
        user.must_change_password = False
        user.otp_code = None
        user.otp_created_at = None
        user.save()
        return Response({
            'message': 'Password set successfully. You can now login.',
            'enrollment_id': enrollment_id
        })
    except User.DoesNotExist:
        return Response(
            {'error': 'Enrollment ID not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )