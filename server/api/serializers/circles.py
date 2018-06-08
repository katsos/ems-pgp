from rest_framework.serializers import HyperlinkedModelSerializer
from ..models import Budget, BudgetField, Circle


class BudgetFieldsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = BudgetField
        fields = ('code', 'title', 'amount')


class BudgetsSerializer(HyperlinkedModelSerializer):
    fields = BudgetFieldsSerializer(many=True)

    class Meta:
        model = Budget
        fields = ('id', 'created_at', 'fields')


class CirclesSerializer(HyperlinkedModelSerializer):
    budget = BudgetsSerializer(read_only=True)

    class Meta:
        model = Circle
        fields = ('id', 'manager', 'title', 'funding_source', 'starts_at', 'ends_at', 'budget')
