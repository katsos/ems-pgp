from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Payment
from .students import StudentsSerializer


class PaymentSerializer(ModelSerializer):
    student = StudentsSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'notes', 'created_at', 'student')
