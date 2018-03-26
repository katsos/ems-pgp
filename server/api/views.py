from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet
from .models import Program, Student
from .serializers import ProgramsSerializer, StudentsSerializer


class ProgramsViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramsSerializer


class StudentsViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentsSerializer
