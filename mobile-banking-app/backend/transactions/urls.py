from django.urls import path
from .views import (
    TransactionListView,
    FundTransferView,
    BillPaymentListCreateView,
    BillPaymentDetailView
)

urlpatterns = [
    path('', TransactionListView.as_view(), name='transaction-list'),
    path('transfer/', FundTransferView.as_view(), name='fund-transfer'),
    path('bill-payments/', BillPaymentListCreateView.as_view(), name='bill-payment-list-create'),
    path('bill-payments/<int:pk>/', BillPaymentDetailView.as_view(), name='bill-payment-detail'),
]
