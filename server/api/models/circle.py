from django.db.models import Model, AutoField, CharField, DateField, DateTimeField, DecimalField, Sum
from .budget import Budget
from .expense import Expense
from .payment import Payment
from .student import Student


class Circle(Model):
    id = AutoField(primary_key=True)
    manager = CharField(max_length=256, null=True)
    title = CharField(max_length=512, null=False)
    funding_source = CharField(max_length=512, null=True, default='')
    tuition = DecimalField(max_digits=8, decimal_places=2)

    starts_at = DateField(null=False)
    ends_at = DateField(null=False)

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'circles'

    @property
    def budget(self):
        budgets = Budget.objects.filter(circle=self)
        return budgets.latest('id') if budgets else None

    @property
    def students(self):
        return Student.objects.filter(circle=self)

    @property
    def total_outcome_expectation(self):
        budget = self.budget
        if budget is None:
            return None
        return budget.fields.aggregate(Sum('amount'))['amount__sum'] or 0

    @property
    def total_outcome(self):
        return Expense.objects.filter(budget_field__budget__circle=self) \
            .aggregate(Sum('amount'))['amount__sum'] or 0

    @property
    def total_income_expectation(self):
        return Student.objects.filter(circle=self).count() * self.tuition

    @property
    def total_income(self):
        return Payment.objects.filter(student__circle=self) \
            .aggregate(Sum('amount'))['amount__sum'] or 0
