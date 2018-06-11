from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Payment, Student
from .budgets import BudgetsSerializer
from .circles import CirclesSerializer
from .expenses import ExpensesSerializer
from .students import StudentsSerializer


class PaymentSerializer(HyperlinkedModelSerializer):
    student = PrimaryKeyRelatedField(queryset=Student.objects.all())

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'student')
