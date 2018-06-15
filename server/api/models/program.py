from django.db.models import Model, AutoField, CharField, DateTimeField, DecimalField, PositiveSmallIntegerField, Sum
from server.api.utils import get_sum_of
from .payment import Payment
from .student import Student


class Program(Model):
    id = AutoField(primary_key=True)
    title = CharField(max_length=256)
    year = PositiveSmallIntegerField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    budget = DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'programs'
        unique_together = ('title', 'year')

    def __str__(self):
        return f'{self.title} ({self.year})'

    @property
    def num_of_students(self):
        return Student.objects.filter(program=self).count()

    @property
    def total_income_expected(self):
        return self.num_of_students * 2800 # TODO: add cost of program field

    @property
    def total_payments(self):
        payments = Payment.objects.filter(student__program=self)
        return get_sum_of(payments, 'amount')

    @property
    def total_pending_amount(self):
        return self.total_payments - self.total_income_expected

    @property
    def total_expenses(self):
        return get_sum_of(self.expenses, 'amount')
