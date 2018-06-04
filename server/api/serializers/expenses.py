from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Expense


class ExpensesSerializer(ModelSerializer):
    class Meta:
        model = Expense
        fields = ('id', 'program', 'amount', 'created_at')
        read_only_fields = ('id', 'created_at')
