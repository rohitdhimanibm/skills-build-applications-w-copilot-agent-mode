from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'account_number', 'balance', 'phone_number', 'created_at']
    search_fields = ['user__username', 'account_number', 'phone_number']
    readonly_fields = ['account_number', 'created_at', 'updated_at']
