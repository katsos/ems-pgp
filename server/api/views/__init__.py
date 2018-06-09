from rest_framework.viewsets import ModelViewSet
from .circles_viewset import CirclesViewSet
from .registrations_viewset import RegistrationsViewSet
from .students_viewset import StudentsViewSet
from ..models import Expense, Payment, Program
from ..serializers import ExpensesSerializer, PaymentSerializer, ProgramsSerializer


class ExpensesViewSet(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpensesSerializer


class PaymentsViewSet(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class ProgramsViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramsSerializer
