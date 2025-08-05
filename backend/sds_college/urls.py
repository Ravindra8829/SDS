from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to SDS Badamia College API!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),  # Example
    # path('api/student/', include('student.urls')),  # Example (commented out to fix migration error)
    path('api/', include('core.urls')),  # Example
    path('', home),  # ✅ This line fixes the root 404
]
