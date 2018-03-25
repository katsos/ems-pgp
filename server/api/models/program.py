from django.db.models import Model, AutoField, CharField, DateTimeField, PositiveSmallIntegerField
# , ForeignKey, CASCADE
# from django.contrib.auth.models import User


class Program(Model):
    id = AutoField(primary_key=True)
    title = CharField(max_length=256)
    year = PositiveSmallIntegerField()
    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)
    # end_date = DateTimeField()
    # admin = ForeignKey(User, on_delete=CASCADE)

    class Meta:
        db_table = 'programs'
        unique_together = ('title', 'year')
