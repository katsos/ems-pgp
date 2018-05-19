from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from .models import Payment, Program, Registration, Student


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year', 'num_of_students')


class StudentsSerializer(HyperlinkedModelSerializer):
    programs = PrimaryKeyRelatedField(queryset=Program.objects.all(), many=True)

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'email', 'registered_at', 'programs')

    def create(self, data):
        program = [data.pop('program')] or []
        student = Student.objects.create(**data)
        student.save()

        for p in program:
            Registration.objects.get_or_create(student=student, program=p)

        return student


class RegistrationsSerializer(ModelSerializer):
    student = StudentsSerializer
    program = ProgramsSerializer

    class Meta:
        model = Registration
        fields = ('id', 'program', 'student', 'created_at')


# TODO: register students to programs first, then implement payment endpoints
class PaymentSerializer(HyperlinkedModelSerializer):
    registration = RegistrationsSerializer

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'registration')
