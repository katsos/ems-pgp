from rest_framework.serializers import HyperlinkedModelSerializer, PrimaryKeyRelatedField, BooleanField
from server.api.models import Program, Student


class StudentsSerializer(HyperlinkedModelSerializer):
    full_time = BooleanField(write_only=True)

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'full_time', 'circle')
