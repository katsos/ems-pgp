from rest_framework.viewsets import ModelViewSet
from ..models import Registration
from ..serializers import RegistrationsSerializer


class RegistrationsViewSet(ModelViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationsSerializer

    def get_queryset(self):
        queryset = Registration.objects.all()
        student = self.request.query_params.get('student', None)
        if student is not None:
            queryset = queryset.filter(student__id=student)
        return queryset
