from rest_framework import serializers
from .models import Beneficiary

class BeneficiarySerializer(serializers.ModelSerializer):
    """Serializer for Beneficiary model"""
    
    class Meta:
        model = Beneficiary
        fields = ['id', 'name', 'account_number', 'bank_name', 'ifsc_code', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
    
    def validate_account_number(self, value):
        """Validate account number format"""
        if not value.isdigit() and not value.startswith('ACC'):
            raise serializers.ValidationError("Invalid account number format")
        return value
    
    def validate_ifsc_code(self, value):
        """Validate IFSC code format"""
        if len(value) != 11:
            raise serializers.ValidationError("IFSC code must be 11 characters long")
        return value.upper()
