from django.db.models import Model, DateTimeField, ForeignKey, CASCADE
from .student import Student
from .program import Program


class Registration(Model):
    student = ForeignKey(Student, on_delete=CASCADE)
    program = ForeignKey(Program, on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'registrations'
