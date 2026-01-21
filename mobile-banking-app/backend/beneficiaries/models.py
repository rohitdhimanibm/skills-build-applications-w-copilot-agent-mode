from django.db import models
from django.contrib.auth.models import User

class Beneficiary(models.Model):
    """Model for storing beneficiary information"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='beneficiaries')
    name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=20)
    bank_name = models.CharField(max_length=100)
    ifsc_code = models.CharField(max_length=11)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Beneficiaries"
        unique_together = ('user', 'account_number')
    
    def __str__(self):
        return f"{self.name} - {self.account_number}"
