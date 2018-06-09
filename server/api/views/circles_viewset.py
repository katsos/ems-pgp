from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import Budget, BudgetField, Circle
from ..serializers import BudgetsSerializer, CirclesSerializer


class CirclesViewSet(ModelViewSet):
    queryset = Circle.objects.all()
    serializer_class = CirclesSerializer

    @action(methods=['post'], detail=True)
    def set_budget(self, request, pk=None):
        circle = self.get_object()
        # TODO: transaction start
        budget = Budget(circle=circle)
        budget.save()

        fields = request.data.get('fields', [])
        for f in fields:
            # TODO: field validation
            BudgetField.objects.create(budget=budget, **f)

        return Response(BudgetsSerializer(budget).data)
        # TODO: transaction end
