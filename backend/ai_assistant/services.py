import openai
from django.conf import settings
from .models import AIPromptTemplate, ChatSession, ChatMessage
from accounts.models import Student
import json

class AIAssistantService:
    """Service class for AI-powered student assistance"""
    
    def __init__(self):
        openai.api_key = settings.OPENAI_API_KEY
    
    def get_student_context(self, user):
        """Get student context for personalized responses"""
        context = {
            'name': user.get_full_name(),
            'enrollment_id': user.enrollment_id,
            'role': user.role
        }
        
        if user.role == 'student':
            try:
                student = user.student_profile
                context.update({
                    'department': student.department,
                    'year': student.year,
                    'section': student.section,
                    'roll_no': student.roll_no
                })
            except Student.DoesNotExist:
                pass
        
        return context
    
    def generate_response(self, user, message, session_id=None):
        """Generate AI response for student query"""
        try:
            # Get or create chat session
            if session_id:
                session = ChatSession.objects.get(id=session_id, user=user)
            else:
                session = ChatSession.objects.create(
                    user=user,
                    title=message[:50] + "..." if len(message) > 50 else message
                )
            
            # Save user message
            user_message = ChatMessage.objects.create(
                session=session,
                message_type='user',
                content=message
            )
            
            # Get student context
            context = self.get_student_context(user)
            
            # Build conversation history
            conversation_history = self._build_conversation_history(session)
            
            # Generate system prompt
            system_prompt = self._get_system_prompt(context)
            
            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": system_prompt},
                    *conversation_history,
                    {"role": "user", "content": message}
                ],
                max_tokens=500,
                temperature=0.7
            )
            
            ai_response = response.choices[0].message.content
            
            # Save AI response
            ai_message = ChatMessage.objects.create(
                session=session,
                message_type='assistant',
                content=ai_response,
                metadata={'model': 'gpt-3.5-turbo', 'tokens': response.usage.total_tokens}
            )
            
            return {
                'session_id': session.id,
                'response': ai_response,
                'success': True
            }
            
        except Exception as e:
            return {
                'error': str(e),
                'success': False
            }
    
    def _build_conversation_history(self, session):
        """Build conversation history for context"""
        messages = session.messages.filter(
            message_type__in=['user', 'assistant']
        ).order_by('created_at')[-10:]  # Last 10 messages
        
        history = []
        for msg in messages:
            role = 'user' if msg.message_type == 'user' else 'assistant'
            history.append({"role": role, "content": msg.content})
        
        return history
    
    def _get_system_prompt(self, context):
        """Generate system prompt based on user context"""
        base_prompt = """You are an AI assistant for SDS Badamia College of Professional Studies. 
        You help students with academic queries, assignment guidance, career advice, and general college information.
        
        Be helpful, professional, and encouraging. Provide accurate information about college policies, 
        academic programs, and student services. If you don't know something specific about the college, 
        suggest the student contact the appropriate department.
        
        Student Information:
        - Name: {name}
        - Enrollment ID: {enrollment_id}
        - Role: {role}
        """.format(**context)
        
        if context.get('department'):
            base_prompt += f"""
        - Department: {context['department']}
        - Year: {context['year']}
        - Section: {context['section']}
        """
        
        return base_prompt
    
    def get_suggested_prompts(self, category='general'):
        """Get suggested prompts for students"""
        templates = AIPromptTemplate.objects.filter(
            category=category,
            is_active=True
        )
        
        return [
            {
                'id': template.id,
                'name': template.name,
                'description': template.description,
                'category': template.category
            }
            for template in templates
        ]
    
    def analyze_student_query(self, query_text):
        """Analyze and categorize student query"""
        # Simple keyword-based categorization
        query_lower = query_text.lower()
        
        if any(word in query_lower for word in ['assignment', 'homework', 'project', 'submit']):
            return 'assignment'
        elif any(word in query_lower for word in ['exam', 'test', 'result', 'grade', 'marks']):
            return 'academic'
        elif any(word in query_lower for word in ['career', 'job', 'placement', 'internship']):
            return 'career'
        elif any(word in query_lower for word in ['attendance', 'absent', 'present']):
            return 'attendance'
        else:
            return 'general'

# AI Prompt Templates for SDS College
AI_PROMPTS = {
    'academic': [
        {
            'name': 'Study Schedule Help',
            'description': 'Get help creating an effective study schedule',
            'template': 'Can you help me create a study schedule for my {subject} exam? I have {days} days to prepare.'
        },
        {
            'name': 'Subject Difficulty',
            'description': 'Get advice on handling difficult subjects',
            'template': 'I\'m struggling with {subject}. Can you suggest some study strategies?'
        }
    ],
    'assignment': [
        {
            'name': 'Assignment Planning',
            'description': 'Get help planning your assignment approach',
            'template': 'I have an assignment on {topic} due in {days} days. How should I approach it?'
        },
        {
            'name': 'Research Guidance',
            'description': 'Get guidance on research methodology',
            'template': 'What are the best research methods for a {subject} project?'
        }
    ],
    'career': [
        {
            'name': 'Career Path Guidance',
            'description': 'Explore career options in your field',
            'template': 'What career opportunities are available for {department} graduates?'
        },
        {
            'name': 'Skill Development',
            'description': 'Learn about important skills to develop',
            'template': 'What skills should I develop to be successful in {field}?'
        }
    ]
}