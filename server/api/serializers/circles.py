from rest_framework.serializers import HyperlinkedModelSerializer
from ..models import Circle
from .budgets import BudgetsSerializer


class CirclesSerializer(HyperlinkedModelSerializer):
    budget = BudgetsSerializer(read_only=True)

    class Meta:
        model = Circle
        fields = ('id', 'manager', 'title', 'funding_source', 'starts_at', 'ends_at', 'budget')
