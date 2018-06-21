from django.db.models import Model, BooleanField, CharField, DateTimeField, ForeignKey, CASCADE
from server.api.utils import get_sum_of


class Student(Model):
    id_university = CharField(max_length=20, default='')
    name = CharField(max_length=256)
    surname = CharField(max_length=256)
    full_time = BooleanField()
    circle = ForeignKey('Circle', related_name='students', on_delete=CASCADE)

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'

    def __str__(self):
        return f'{self.surname} {self.name} ({self.id})'

    @property
    def total_payments(self):
        return get_sum_of(self.payments, 'amount')
