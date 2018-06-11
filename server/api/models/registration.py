from django.db.models import Model, BooleanField, DateTimeField, ForeignKey, CASCADE


class Registration(Model):
    student = ForeignKey('Student', on_delete=CASCADE)
    circle = ForeignKey('Circle', on_delete=CASCADE)
    full_time = BooleanField(null=False)
    created_at = DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'registrations'
        unique_together = ('student', 'circle')
