from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Expense


class ExpensesSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'budget_field', 'type', 'notes', 'amount', 'created_at')
