from django.db.models import Model, CharField, DateField, DateTimeField, EmailField, ManyToManyField


class Student(Model):
    name = CharField(max_length=256)
    surname = CharField(max_length=256)
    email = EmailField(unique=True)
    registered_at = DateField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    programs = ManyToManyField('Program', through='Registration')

    class Meta:
        db_table = 'students'

    def __str__(self):
        return f'{self.surname} {self.name} ({self.id})'
