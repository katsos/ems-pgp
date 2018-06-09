from rest_framework.viewsets import ModelViewSet
from .registrations_viewset import RegistrationsViewSet
from .students_viewset import StudentsViewSet
from ..models import Circle, Expense, Payment, Program
from ..serializers import CirclesSerializer, ExpensesSerializer, PaymentSerializer, ProgramsSerializer


class CirclesViewSet(ModelViewSet):
    queryset = Circle.objects.all()
    serializer_class = CirclesSerializer


class ExpensesViewSet(ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpensesSerializer


class PaymentsViewSet(ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer


class ProgramsViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramsSerializer
