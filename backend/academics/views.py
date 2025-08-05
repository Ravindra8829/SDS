from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .models import Assignment, Submission, Subject
from .serializers import AssignmentSerializer, SubmissionSerializer
from datetime import datetime

User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_assignments(request):
    """Get assignments for the logged-in student"""
    if request.user.role != 'student':
        return Response(
            {'error': 'Only students can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        # Get student's department and year
        student_profile = request.user.student_profile
        department = student_profile.department
        year = student_profile.year
        
        # Get assignments for student's department
        assignments = Assignment.objects.filter(
            subject__department=department,
            is_active=True
        ).select_related('subject')
        
        # Check if student has submitted each assignment
        assignments_data = []
        for assignment in assignments:
            assignment_data = AssignmentSerializer(assignment).data
            submission = Submission.objects.filter(
                assignment=assignment,
                student=request.user
            ).first()
            
            assignment_data['submitted'] = submission is not None
            assignment_data['submission_id'] = submission.id if submission else None
            assignment_data['marks_obtained'] = submission.marks_obtained if submission else None
            assignment_data['is_overdue'] = assignment.is_overdue
            
            assignments_data.append(assignment_data)
        
        return Response({
            'assignments': assignments_data
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_attendance(request):
    """Get attendance records for the logged-in student"""
    if request.user.role != 'student':
        return Response(
            {'error': 'Only students can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        from attendance.models import Attendance
        
        # Get attendance records for the student
        attendance_records = Attendance.objects.filter(
            student=request.user
        ).select_related('subject').order_by('-date')
        
        attendance_data = []
        for record in attendance_records:
            attendance_data.append({
                'id': record.id,
                'date': record.date,
                'subject': record.subject.name if record.subject else 'General',
                'status': record.status,
                'remarks': record.remarks
            })
        
        return Response(attendance_data)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def student_results(request):
    """Get results for the logged-in student"""
    if request.user.role != 'student':
        return Response(
            {'error': 'Only students can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        from results.models import Result
        
        # Get results for the student
        results = Result.objects.filter(
            student=request.user
        ).select_related('subject').order_by('-exam_date')
        
        results_data = []
        for result in results:
            results_data.append({
                'id': result.id,
                'subject': result.subject.name if result.subject else 'General',
                'exam_type': result.exam_type,
                'exam_date': result.exam_date,
                'marks': result.marks,
                'max_marks': result.max_marks,
                'percentage': result.percentage,
                'grade': result.grade
            })
        
        return Response(results_data)
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_assignment(request):
    """Submit an assignment for the logged-in student"""
    if request.user.role != 'student':
        return Response(
            {'error': 'Only students can access this endpoint'}, 
            status=status.HTTP_403_FORBIDDEN
        )
    
    try:
        assignment_id = request.data.get('assignmentId')
        submission_file = request.FILES.get('file')
        
        if not assignment_id or not submission_file:
            return Response(
                {'error': 'Assignment ID and file are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get the assignment
        assignment = Assignment.objects.get(id=assignment_id, is_active=True)
        
        # Check if already submitted
        existing_submission = Submission.objects.filter(
            assignment=assignment,
            student=request.user
        ).first()
        
        if existing_submission:
            return Response(
                {'error': 'Assignment already submitted'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create submission
        submission = Submission.objects.create(
            assignment=assignment,
            student=request.user,
            submission_file=submission_file
        )
        
        return Response({
            'message': 'Assignment submitted successfully',
            'submission_id': submission.id
        })
        
    except Assignment.DoesNotExist:
        return Response(
            {'error': 'Assignment not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
