from rest_framework.viewsets import ModelViewSet
from .circles_viewset import CirclesViewSet
from .students_viewset import StudentsViewSet
from ..models import Expense, Payment
from ..serializers import ExpensesSerializer, PaymentSerializer


class ExpensesViewSet(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpensesSerializer


class PaymentsViewSet(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

