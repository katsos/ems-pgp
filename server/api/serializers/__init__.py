from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, PrimaryKeyRelatedField
from server.api.models import Payment, Program, Registration
from .students import StudentsSerializer


class ProgramsSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Program
        fields = ('id', 'title', 'year', 'num_of_students', 'total_pending_amount', 'total_expenses')


class RegistrationsSerializer(ModelSerializer):
    student = StudentsSerializer(read_only=True)
    program = ProgramsSerializer(read_only=True)

    class Meta:
        model = Registration
        fields = ('id', 'program', 'student', 'full_time', 'created_at')


# TODO: register students to programs first, then implement payment endpoints
class PaymentSerializer(HyperlinkedModelSerializer):
    registration = PrimaryKeyRelatedField(queryset=Registration.objects.all())

    class Meta:
        model = Payment
        fields = ('id', 'amount', 'registration')
