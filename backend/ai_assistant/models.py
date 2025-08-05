from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatSession(models.Model):
    """AI chat sessions"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_sessions')
    title = models.CharField(max_length=255)
    messages = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'chat_sessions'
        ordering = ['-updated_at']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.title}"

class ChatMessage(models.Model):
    """Individual chat messages"""
    
    MESSAGE_TYPES = [
        ('user', 'User Message'),
        ('assistant', 'AI Assistant'),
        ('system', 'System Message'),
    ]
    
    session = models.ForeignKey(ChatSession, on_delete=models.CASCADE, related_name='chat_messages')
    message_type = models.CharField(max_length=10, choices=MESSAGE_TYPES)
    content = models.TextField()
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'chat_messages'
        ordering = ['created_at']
    
    def __str__(self):
        return f"{self.session.title} - {self.message_type}"

class AIPromptTemplate(models.Model):
    """Pre-defined AI prompt templates for different scenarios"""
    
    CATEGORY_CHOICES = [
        ('academic', 'Academic Help'),
        ('assignment', 'Assignment Assistance'),
        ('career', 'Career Guidance'),
        ('general', 'General Inquiry'),
        ('technical', 'Technical Support'),
    ]
    
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    prompt_template = models.TextField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'ai_prompt_templates'
    
    def __str__(self):
        return f"{self.name} ({self.category})"

class StudentQuery(models.Model):
    """Track student queries for analytics"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    query_text = models.TextField()
    category = models.CharField(max_length=50, blank=True)
    response_generated = models.BooleanField(default=False)
    satisfaction_rating = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'student_queries'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.query_text[:50]}"