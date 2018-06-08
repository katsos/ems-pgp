from django.db.models import Model, DateTimeField, ForeignKey, CASCADE


class Budget(Model):
    circle = ForeignKey('Circle', on_delete=CASCADE)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'budgets'
