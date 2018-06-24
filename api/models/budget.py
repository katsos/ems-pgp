from django.db.models import Model, DateTimeField, ForeignKey, CASCADE
from .budget_field import BudgetField


class Budget(Model):
    circle = ForeignKey('Circle', on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'budgets'

    @property
    def fields(self):
        return BudgetField.objects.filter(budget=self)
