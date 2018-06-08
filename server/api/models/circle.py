from django.db.models import Model, CharField, DateField, DateTimeField, DecimalField, TextField, SmallIntegerField


class Circle(Model):
    id = SmallIntegerField(primary_key=True)
    manager = CharField(max_length=256, null=True)
    title = CharField(max_length=512, null=False)
    funding_source = CharField(max_length=512, null=True, default='')

    starts_at = DateField(null=False)
    ends_at = DateField(null=False)

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'circles'
