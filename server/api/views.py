from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import CirclesSerializer, ExpensesSerializer, PaymentSerializer, ProgramsSerializer, \
    RegistrationsSerializer, StudentsSerializer


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


class RegistrationsViewSet(ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationsSerializer

    def get_queryset(self):
        queryset = Registration.objects.all()
        student = self.request.query_params.get('student', None)
        if student is not None:
            queryset = queryset.filter(student__id=student)
        return queryset


class StudentsViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentsSerializer

    def get_queryset(self):
        students = Student.objects.all()

        program_id = self.request.query_params.get('program_id')
        if program_id is not None:
            students = students.filter(registration__program__id=program_id)

        return students
