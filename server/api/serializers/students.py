from rest_framework.serializers import HyperlinkedModelSerializer, PrimaryKeyRelatedField
from server.api.models import Program, Student, Registration


class StudentsSerializer(HyperlinkedModelSerializer):
    program = PrimaryKeyRelatedField(queryset=Program.objects.all(), write_only=True)

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
