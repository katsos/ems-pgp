from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer
from .models import Program, Registration, Student


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year', 'num_of_students')


class StudentsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'email', 'registered_at')


class RegistrationsSerializer(ModelSerializer):
    student = StudentsSerializer
    program = ProgramsSerializer

    class Meta:
        model = Registration
        fields = ('id', 'program', 'student', 'created_at')
