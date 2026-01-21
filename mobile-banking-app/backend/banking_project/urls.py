"""banking_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def api_root(request):
    """API root endpoint"""
    return Response({
        'message': 'Mobile Banking API',
        'endpoints': {
            'register': '/api/accounts/register/',
            'login': '/api/auth/login/',
            'logout': '/api/auth/logout/',
            'profile': '/api/accounts/profile/',
            'beneficiaries': '/api/beneficiaries/',
            'transactions': '/api/transactions/',
            'fund-transfer': '/api/transactions/transfer/',
            'bill-payments': '/api/transactions/bill-payments/',
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root, name='api-root'),
    path('api/accounts/', include('accounts.urls')),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/beneficiaries/', include('beneficiaries.urls')),
    path('api/transactions/', include('transactions.urls')),
]
