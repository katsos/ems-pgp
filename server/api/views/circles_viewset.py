from django.http import Http404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from ..models import Budget, BudgetField, Circle, Student
from ..serializers import BudgetsSerializer, CirclesSerializer, StudentsSerializer


class CirclesViewSet(ModelViewSet):
    queryset = Circle.objects.all()
    serializer_class = CirclesSerializer

    @action(methods=['get'], detail=True)
    def budget(self, request, pk=None):
        circle = self.get_object()
        budget = circle.budget
        if not budget:
            raise Http404
        return Response(BudgetsSerializer(budget).data)

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

    @action(methods=['post'], detail=True)
    def students(self, request, pk=None):
        circle = self.get_object()
        # TODO: transaction start
        students = request.data.get('students', [])
        for s in students:
            # TODO: field validation
            Student.objects.create(circle=circle, **s)

        return Response(StudentsSerializer(circle.students, many=True).data)
        # TODO: transaction end
