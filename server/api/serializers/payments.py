from rest_framework.serializers import ModelSerializer
from server.api.models import Payment
from .students_shallow import StudentsSerializerShallow


class PaymentSerializer(ModelSerializer):
    student = StudentsSerializerShallow(read_only=True)

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'notes', 'created_at', 'student')

