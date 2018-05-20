from django.db.models import Model, AutoField, CharField, DateTimeField, PositiveSmallIntegerField, Sum
from .payment import Payment
from .registration import Registration


class Program(Model):
    id = AutoField(primary_key=True)
    title = CharField(max_length=256)
    year = PositiveSmallIntegerField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    # end_date = DateTimeField()
    # admin = ForeignKey(User, on_delete=CASCADE)

    class Meta:
        db_table = 'programs'
        unique_together = ('title', 'year')

    def __str__(self):
        return f'{self.title} ({self.year})'

    @property
    def num_of_students(self):
        return Registration.objects.filter(program_id__exact=self.id).count()

    @property
    def total_income_expected(self):
        return self.num_of_students * 2800 # TODO: add cost of program field

    @property
    def total_pending_amount(self):
        total_income = Payment.objects.filter(registration__program=self).aggregate(Sum('amount'))['amount__sum']
        return total_income - self.total_income_expected
