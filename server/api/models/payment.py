from django.db.models import Model, BooleanField, DateTimeField, DecimalField, ForeignKey, CASCADE


class Payment(Model):
    registration = ForeignKey('Registration', on_delete=CASCADE)
    amount = DecimalField(max_digits=6, decimal_places=2)
    created_at = DateTimeField(auto_now_add=True)
    refunded = BooleanField(default=False)

    class Meta:
        db_table = 'payments'
