from django.db.models import Model, AutoField, CharField, DateField, DateTimeField
from .budget import Budget


class Circle(Model):
    id = AutoField(primary_key=True)
    manager = CharField(max_length=256, null=True)
    title = CharField(max_length=512, null=False)
    funding_source = CharField(max_length=512, null=True, default='')

    starts_at = DateField(null=False)
    ends_at = DateField(null=False)

    created_at = DateTimeField(auto_now_add=True)
    updated_at = DateTimeField(auto_now=True)

    class Meta:
        db_table = 'circles'

    @property
    def budget(self):
        budgets = Budget.objects.filter(circle=self)
        return budgets.latest('id') if budgets else None
