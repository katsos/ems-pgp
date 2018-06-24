from rest_framework.serializers import ModelSerializer
from api.models import Payment
from .students_circle import StudentsCircleSerializer


class PaymentSerializer(ModelSerializer):
    student = StudentsCircleSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'notes', 'created_at', 'student')

