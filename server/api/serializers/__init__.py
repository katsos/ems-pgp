from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Payment, Program, Registration
from .budgets import BudgetsSerializer
from .circles import CirclesSerializer
from .expenses import ExpensesSerializer
from .students import StudentsSerializer


class ProgramsSerializer(HyperlinkedModelSerializer):
    expenses = ExpensesSerializer(many=True, read_only=True)

    class Meta:
        model = Program
        fields = ('id', 'title', 'year', 'budget', 'expenses', 'num_of_students', 'total_pending_amount', 'total_payments', 'total_expenses')


class RegistrationsSerializer(ModelSerializer):
    student = StudentsSerializer(read_only=True)
    program = ProgramsSerializer(read_only=True)

    class Meta:
        model = Registration
        fields = ('id', 'program', 'student', 'full_time', 'created_at')


class PaymentSerializer(HyperlinkedModelSerializer):
    registration = PrimaryKeyRelatedField(queryset=Registration.objects.all())

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'registration')
