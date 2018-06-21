from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from ..models import Payment, Student
from ..serializers import PaymentSerializer, StudentsSerializer


class StudentsViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentsSerializer

    @action(methods=['post'], detail=True)
    def set_payment(self, request, pk=None):
        student = self.get_object()
        payment = Payment.objects.create(student=student, **request.data)
        return Response(PaymentSerializer(payment).data)
