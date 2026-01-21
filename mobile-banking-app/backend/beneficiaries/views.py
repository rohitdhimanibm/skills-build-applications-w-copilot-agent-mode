from rest_framework import generics, permissions
from .models import Beneficiary
from .serializers import BeneficiarySerializer

class BeneficiaryListCreateView(generics.ListCreateAPIView):
    """API endpoint to list and create beneficiaries"""
    serializer_class = BeneficiarySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Beneficiary.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BeneficiaryDetailView(generics.RetrieveUpdateDestroyAPIView):
    """API endpoint to retrieve, update, and delete a beneficiary"""
    serializer_class = BeneficiarySerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Beneficiary.objects.filter(user=self.request.user)
