from django.db.models import Model, BooleanField, CharField, DateTimeField, DecimalField, ForeignKey, CASCADE


class Expense(Model):
    budget_field = ForeignKey('BudgetField', related_name='expenses', on_delete=CASCADE)
    type = CharField(max_length=256)
    notes = CharField(max_length=512, blank=True, default='')
    amount = DecimalField(max_digits=8, decimal_places=2)
    is_completed = BooleanField()
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'expenses'
