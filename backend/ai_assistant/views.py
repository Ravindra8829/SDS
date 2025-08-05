from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.conf import settings
from .models import ChatSession
from .serializers import ChatSessionSerializer
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_with_ai(request):
    """Chat with AI assistant"""
    try:
        message = request.data.get('message', '')
        if not message:
            return Response(
                {'error': 'Message is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Get or create chat session
        session, created = ChatSession.objects.get_or_create(
            user=request.user,
            defaults={'title': message[:50] + '...' if len(message) > 50 else message}
        )
        
        # Add user message to session
        session.messages.append({
            'role': 'user',
            'content': message,
            'timestamp': str(datetime.now())
        })
        
        # Get AI response
        try:
            import openai
            openai.api_key = settings.OPENAI_API_KEY
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful college assistant for SDS College. Help students with academic questions, assignments, and general guidance."},
                    {"role": "user", "content": message}
                ],
                max_tokens=500
            )
            
            ai_response = response.choices[0].message.content
            
            # Add AI response to session
            session.messages.append({
                'role': 'assistant',
                'content': ai_response,
                'timestamp': str(datetime.now())
            })
            
            session.save()
            
            return Response({
                'response': ai_response,
                'session_id': session.id
            })
            
        except Exception as e:
            return Response(
                {'error': 'AI service temporarily unavailable'}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
            
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_history(request):
    """Get chat history for the user"""
    try:
        sessions = ChatSession.objects.filter(user=request.user).order_by('-created_at')
        serializer = ChatSessionSerializer(sessions, many=True)
        return Response(serializer.data)
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
