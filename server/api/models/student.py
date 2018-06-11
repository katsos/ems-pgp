from django.db.models import Model, BooleanField, CharField, DateTimeField, ForeignKey, CASCADE


class Student(Model):
    name = CharField(max_length=256)
    surname = CharField(max_length=256)
    full_time = BooleanField()
    circle = ForeignKey('Circle', on_delete=CASCADE)

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'

    def __str__(self):
        return f'{self.surname} {self.name} ({self.id})'
