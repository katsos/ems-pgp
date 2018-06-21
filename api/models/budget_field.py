from django.db.models import Model, CharField, DecimalField, ForeignKey, CASCADE


class BudgetField(Model):
    code = CharField(max_length=16)
    title = CharField(max_length=256)
    amount = DecimalField(max_digits=10, decimal_places=2)
    budget = ForeignKey('Budget', on_delete=CASCADE)

    class Meta:
        db_table = 'budget_fields'
