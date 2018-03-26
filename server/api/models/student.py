from django.db.models import Model, CharField, DateTimeField, EmailField


class Student(Model):
    name = CharField(max_length=256)
    surname = CharField(max_length=256)
    email = EmailField(unique=True)
    registered_at = DateTimeField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'
