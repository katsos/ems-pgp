from django.db.models import Model, CharField, DateTimeField, DecimalField, ForeignKey, CASCADE


class Payment(Model):
    student = ForeignKey('Student', related_name='payments', on_delete=CASCADE)
    amount = DecimalField(max_digits=6, decimal_places=2)
    notes = CharField(max_length=256, null=True)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'payments'
