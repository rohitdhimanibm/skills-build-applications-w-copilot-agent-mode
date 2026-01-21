from rest_framework import serializers
from .models import Transaction, BillPayment
from django.utils import timezone
from django.db import transaction as db_transaction
from django.db.models import F
import uuid

class TransactionSerializer(serializers.ModelSerializer):
    """Serializer for Transaction model"""
    
    class Meta:
        model = Transaction
        fields = ['id', 'transaction_type', 'amount', 'recipient_account', 
                  'recipient_name', 'description', 'status', 'transaction_id', 
                  'created_at', 'updated_at']
        read_only_fields = ['transaction_id', 'status', 'created_at', 'updated_at']
    
    def validate_amount(self, value):
        """Validate transaction amount"""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero")
        return value

class FundTransferSerializer(serializers.Serializer):
    """Serializer for fund transfer"""
    recipient_account = serializers.CharField(max_length=20)
    recipient_name = serializers.CharField(max_length=100)
    amount = serializers.DecimalField(max_digits=12, decimal_places=2)
    description = serializers.CharField(max_length=500, required=False, allow_blank=True)
    
    def validate_amount(self, value):
        """Validate transfer amount"""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero")
        return value
    
    def create(self, validated_data):
        """Create fund transfer transaction"""
        user = self.context['request'].user
        transaction_id = f"TXN{uuid.uuid4().hex[:12].upper()}"
        amount = validated_data['amount']
        
        # Use atomic transaction to prevent race conditions
        with db_transaction.atomic():
            # Lock the user profile for update
            profile = user.profile.__class__.objects.select_for_update().get(pk=user.profile.pk)
            
            # Check balance
            if profile.balance < amount:
                raise serializers.ValidationError("Insufficient balance")
            
            # Create transaction
            trans = Transaction.objects.create(
                user=user,
                transaction_type='TRANSFER',
                transaction_id=transaction_id,
                status='COMPLETED',
                **validated_data
            )
            
            # Update balance atomically
            profile.balance = F('balance') - amount
            profile.save()
            profile.refresh_from_db()
        
        return trans

class BillPaymentSerializer(serializers.ModelSerializer):
    """Serializer for BillPayment model"""
    amount = serializers.DecimalField(max_digits=12, decimal_places=2, write_only=True)
    transaction_id = serializers.CharField(source='transaction.transaction_id', read_only=True)
    status = serializers.CharField(source='transaction.status', read_only=True)
    created_at = serializers.DateTimeField(source='transaction.created_at', read_only=True)
    
    class Meta:
        model = BillPayment
        fields = ['id', 'biller_category', 'biller_name', 'consumer_number', 
                  'due_date', 'amount', 'transaction_id', 'status', 'created_at']
    
    def validate_amount(self, value):
        """Validate payment amount"""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero")
        return value
    
    def create(self, validated_data):
        """Create bill payment transaction"""
        user = self.context['request'].user
        amount = validated_data.pop('amount')
        transaction_id = f"BILL{uuid.uuid4().hex[:12].upper()}"
        
        # Use atomic transaction to prevent race conditions
        with db_transaction.atomic():
            # Lock the user profile for update
            profile = user.profile.__class__.objects.select_for_update().get(pk=user.profile.pk)
            
            # Check balance
            if profile.balance < amount:
                raise serializers.ValidationError("Insufficient balance")
            
            # Create transaction
            trans = Transaction.objects.create(
                user=user,
                transaction_type='BILL_PAYMENT',
                transaction_id=transaction_id,
                amount=amount,
                recipient_account=validated_data['consumer_number'],
                recipient_name=validated_data['biller_name'],
                description=f"Bill Payment - {validated_data['biller_category']}",
                status='COMPLETED'
            )
            
            # Create bill payment
            bill_payment = BillPayment.objects.create(
                user=user,
                transaction=trans,
                **validated_data
            )
            
            # Update balance atomically
            profile.balance = F('balance') - amount
            profile.save()
            profile.refresh_from_db()
        
        return bill_payment
