from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Payment, Program, Registration
from .budgets import BudgetsSerializer
from .circles import CirclesSerializer
from .expenses import ExpensesSerializer
from .students import StudentsSerializer


class RegistrationsSerializer(ModelSerializer):
    student = StudentsSerializer(read_only=True)
    circle = CirclesSerializer(read_only=True)

    class Meta:
        model = Registration
        fields = ('id', 'circle', 'student', 'full_time', 'created_at')


class PaymentSerializer(HyperlinkedModelSerializer):
    registration = PrimaryKeyRelatedField(queryset=Registration.objects.all())

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'registration')
