from rest_framework.serializers import HyperlinkedModelSerializer
from ..models import Circle
from .budgets import BudgetsSerializer
from .students import StudentsSerializer


class CirclesSerializer(HyperlinkedModelSerializer):
    budget = BudgetsSerializer(read_only=True)
    students = StudentsSerializer(read_only=True, many=True)

    class Meta:
        model = Circle
        fields = ('id', 'manager', 'title', 'funding_source', 'starts_at', 'ends_at', 'budget', 'students',
                  'tuition', 'total_outcome_expectation', 'total_outcome', 'total_income_expectation', 'total_income')
