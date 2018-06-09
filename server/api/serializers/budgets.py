from rest_framework.serializers import HyperlinkedModelSerializer
from ..models import Budget, BudgetField


class BudgetFieldsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = BudgetField
        fields = ('code', 'title', 'amount')


class BudgetsSerializer(HyperlinkedModelSerializer):
    fields = BudgetFieldsSerializer(many=True)

    class Meta:
        model = Budget
        fields = ('id', 'created_at', 'fields')
