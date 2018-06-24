from rest_framework.serializers import ModelSerializer
from api.models import Student
from .payments_shallow import PaymentSerializerShallow
from .circles_shallow import CirclesSerializerShallow


class StudentsSerializer(ModelSerializer):
    circle = CirclesSerializerShallow(read_only=True)
    payments = PaymentSerializerShallow(read_only=True, many=True)

    class Meta:
        model = Student
        fields = ('id', 'id_university', 'name', 'surname', 'full_time', 'circle', 'payments')


