from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    """Model for storing transaction information"""
    TRANSACTION_TYPES = (
        ('TRANSFER', 'Fund Transfer'),
        ('BILL_PAYMENT', 'Bill Payment'),
    )
    
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    recipient_account = models.CharField(max_length=20)
    recipient_name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.transaction_type} - {self.transaction_id} - {self.amount}"

class BillPayment(models.Model):
    """Model for storing bill payment information"""
    BILLER_CATEGORIES = (
        ('ELECTRICITY', 'Electricity'),
        ('WATER', 'Water'),
        ('GAS', 'Gas'),
        ('INTERNET', 'Internet'),
        ('MOBILE', 'Mobile'),
        ('CREDIT_CARD', 'Credit Card'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bill_payments')
    transaction = models.OneToOneField(Transaction, on_delete=models.CASCADE, related_name='bill_payment')
    biller_category = models.CharField(max_length=20, choices=BILLER_CATEGORIES)
    biller_name = models.CharField(max_length=100)
    consumer_number = models.CharField(max_length=50)
    due_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.biller_category} - {self.consumer_number}"
