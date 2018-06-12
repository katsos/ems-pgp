from rest_framework.serializers import ModelSerializer
from server.api.models import Student


class StudentsSerializer(ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'name', 'surname', 'full_time', 'circle')
