from django.db.models import Model, DateTimeField, DecimalField


class Expense(Model):
    amount = DecimalField(max_digits=8, decimal_places=2)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'expenses'
