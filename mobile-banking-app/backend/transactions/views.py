from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Transaction, BillPayment
from .serializers import (
    TransactionSerializer, 
    FundTransferSerializer, 
    BillPaymentSerializer
)

class TransactionListView(generics.ListAPIView):
    """API endpoint to list all transactions"""
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

class FundTransferView(APIView):
    """API endpoint for fund transfer"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        serializer = FundTransferSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            transaction = serializer.save()
            return Response(
                TransactionSerializer(transaction).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BillPaymentListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create bill payments"""
    serializer_class = BillPaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return BillPayment.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BillPaymentDetailView(generics.RetrieveAPIView):
    """API endpoint to retrieve a bill payment"""
    serializer_class = BillPaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return BillPayment.objects.filter(user=self.request.user)
