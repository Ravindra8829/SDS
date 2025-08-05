from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Attendance
from .serializers import AttendanceSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def attendance_list(request):
    """List attendance records (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    attendance_records = Attendance.objects.all().select_related('student', 'subject')
    serializer = AttendanceSerializer(attendance_records, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_attendance(request):
    """Mark attendance for students (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can mark attendance'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = AttendanceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_attendance_detail(request, student_id):
    """Get attendance details for a specific student (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        attendance_records = Attendance.objects.filter(student_id=student_id).select_related('subject')
        serializer = AttendanceSerializer(attendance_records, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
