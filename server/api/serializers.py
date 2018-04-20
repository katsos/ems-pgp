from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from .models import Payment, Program, Registration, Student


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year', 'num_of_students')


class StudentsSerializer(HyperlinkedModelSerializer):
    programs = PrimaryKeyRelatedField(many=True, queryset=Program.objects.all())

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'email', 'registered_at', 'programs')

    def create(self, data):
        programs = data.pop('programs') or []
        student = Student.objects.create(**data)
        student.save()

        for p in programs:
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
