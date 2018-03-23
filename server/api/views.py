from rest_framework.viewsets import ModelViewSet
from .models import Program
from .serializers import ProgramsSerializer


class ProgramsViewSet(ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramsSerializer
