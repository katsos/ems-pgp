from django.db.models import Model, CharField, DateTimeField, DecimalField, ForeignKey, CASCADE


class Expense(Model):
    budget_field = ForeignKey('BudgetField', on_delete=CASCADE, null=True)
    type = CharField(max_length=256, null=False)
    notes = CharField(max_length=512, null=True)
    amount = DecimalField(max_digits=8, decimal_places=2)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'expenses'
