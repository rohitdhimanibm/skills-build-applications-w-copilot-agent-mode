from django.contrib import admin
from .models import Beneficiary

@admin.register(Beneficiary)
class BeneficiaryAdmin(admin.ModelAdmin):
    list_display = ['name', 'account_number', 'bank_name', 'user', 'created_at']
    search_fields = ['name', 'account_number', 'bank_name', 'user__username']
    list_filter = ['bank_name', 'created_at']
