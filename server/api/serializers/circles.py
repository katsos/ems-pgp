from rest_framework.serializers import HyperlinkedModelSerializer
from ..models import Circle


class CirclesSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Circle
        fields = ('id', 'manager', 'title', 'funding_source', 'starts_at', 'ends_at')
