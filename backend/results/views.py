from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Result
from .serializers import ResultSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def results_list(request):
    """List all results (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    results = Result.objects.all().select_related('student', 'subject')
    serializer = ResultSerializer(results, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_result(request):
    """Add new result (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can add results'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = ResultSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_results_detail(request, student_id):
    """Get results for a specific student (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        results = Result.objects.filter(student_id=student_id).select_related('subject')
        serializer = ResultSerializer(results, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
