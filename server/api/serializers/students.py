from rest_framework.serializers import ModelSerializer
from server.api.models import Student
from .payments_shallow import PaymentSerializerShallow


class StudentsSerializer(ModelSerializer):
    payments = PaymentSerializerShallow(read_only=True, many=True)

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'full_time', 'circle', 'payments')


