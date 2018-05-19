from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from .models import Payment, Program, Registration, Student


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year', 'num_of_students')


class StudentsSerializer(HyperlinkedModelSerializer):
    program = PrimaryKeyRelatedField(queryset=Program.objects.all())

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'email', 'registered_at', 'program')

    def create(self, data):
        create_fields = ['name', 'surname', 'email', 'registered_at']
        create_data = {k: v for k,v in data.items() if k in create_fields}
        student = Student.objects.create(**create_data)

        program = data.get('program', None)
        if program is not None:
            Registration.objects.get_or_create(student=student, program=program)

        return student


class RegistrationsSerializer(ModelSerializer):
    student = StudentsSerializer(read_only=True)
    programs = ProgramsSerializer(read_only=True)

    class Meta:
        model = Registration
        fields = ('id', 'program', 'student', 'created_at')


# TODO: register students to programs first, then implement payment endpoints
class PaymentSerializer(HyperlinkedModelSerializer):
    registration = RegistrationsSerializer

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'registration')
