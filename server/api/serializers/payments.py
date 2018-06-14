from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Payment, Student


class PaymentSerializer(ModelSerializer):
    student = PrimaryKeyRelatedField(queryset=Student.objects.all())

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'student')
