from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Program


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year')
