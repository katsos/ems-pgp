from rest_framework.viewsets import ModelViewSet
from ..models import Student
from ..serializers import StudentsSerializer


class StudentsViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentsSerializer

    def get_queryset(self):
        students = Student.objects.all()

        program_id = self.request.query_params.get('program_id')
        if program_id is not None:
            students = students.filter(program__id=program_id)

        return students
