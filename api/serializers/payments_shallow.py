from rest_framework.serializers import ModelSerializer
from api.models import Payment


class PaymentSerializerShallow(ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'amount', 'notes', 'created_at')
