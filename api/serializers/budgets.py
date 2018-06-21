from rest_framework.serializers import ModelSerializer
from ..models import Budget
from .budget_fields import BudgetFieldsSerializer


class BudgetsSerializer(ModelSerializer):
    fields = BudgetFieldsSerializer(many=True)

    class Meta:
        model = Budget
        fields = ('id', 'created_at', 'fields')
