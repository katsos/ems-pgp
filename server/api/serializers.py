from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Program, Student


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year')


class StudentsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'email', 'registered_at')
