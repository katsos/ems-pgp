from rest_framework.serializers import ModelSerializer
from server.api.models import Student
from .circles_shallow import CirclesSerializerShallow


class StudentsCircleSerializer(ModelSerializer):
    circle = CirclesSerializerShallow(read_only=True)

    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'full_time', 'circle')


