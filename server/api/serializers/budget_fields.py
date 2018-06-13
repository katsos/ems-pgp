from rest_framework.serializers import ModelSerializer
from ..models import BudgetField
from .expenses import ExpensesSerializer


class BudgetFieldsSerializer(ModelSerializer):
    expenses = ExpensesSerializer(read_only=True, many=True)

    class Meta:
        model = BudgetField
        fields = ('id', 'code', 'title', 'amount', 'expenses')
