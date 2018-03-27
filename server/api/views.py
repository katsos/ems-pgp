from rest_framework.viewsets import ModelViewSet
from .models import Program, Registration, Student
from .serializers import ProgramsSerializer, RegistrationsSerializer, StudentsSerializer


class ProgramsViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramsSerializer


class RegistrationsViewSet(ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationsSerializer


class StudentsViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentsSerializer

    def get_queryset(self):
        students = Student.objects.all()

        program_id = self.request.query_params.get('program_id')
        if program_id is not None:
            students = students.filter(registration__program__id=program_id)

        return students
