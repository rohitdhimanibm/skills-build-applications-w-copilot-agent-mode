from django.contrib import admin
from .models import Transaction, BillPayment

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['transaction_id', 'user', 'transaction_type', 'amount', 'status', 'created_at']
    search_fields = ['transaction_id', 'user__username', 'recipient_name']
    list_filter = ['transaction_type', 'status', 'created_at']
    readonly_fields = ['transaction_id', 'created_at', 'updated_at']

@admin.register(BillPayment)
class BillPaymentAdmin(admin.ModelAdmin):
    list_display = ['consumer_number', 'biller_category', 'biller_name', 'user', 'transaction']
    search_fields = ['consumer_number', 'biller_name', 'user__username']
    list_filter = ['biller_category']
