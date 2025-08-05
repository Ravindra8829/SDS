from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from academics.models import Assignment, Submission
from academics.serializers import AssignmentSerializer, SubmissionSerializer

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assignment_list(request):
    """List all assignments (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    assignments = Assignment.objects.filter(is_active=True).select_related('subject')
    serializer = AssignmentSerializer(assignments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def assignment_detail(request, pk):
    """Get assignment details"""
    try:
        assignment = Assignment.objects.get(pk=pk, is_active=True)
        serializer = AssignmentSerializer(assignment)
        return Response(serializer.data)
    except Assignment.DoesNotExist:
        return Response(
            {'error': 'Assignment not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def assignment_create(request):
    """Create new assignment (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can create assignments'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    serializer = AssignmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def assignment_edit(request, pk):
    """Edit assignment (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can edit assignments'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        assignment = Assignment.objects.get(pk=pk)
        serializer = AssignmentSerializer(assignment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Assignment.DoesNotExist:
        return Response(
            {'error': 'Assignment not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def assignment_delete(request, pk):
    """Delete assignment (admin only)"""
    if request.user.role != 'admin':
        return Response(
            {'error': 'Only admins can delete assignments'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        assignment = Assignment.objects.get(pk=pk)
        assignment.is_active = False
        assignment.save()
        return Response({'message': 'Assignment deleted successfully'})
    except Assignment.DoesNotExist:
        return Response(
            {'error': 'Assignment not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
