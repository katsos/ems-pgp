# Generated by Django 2.0.3 on 2018-06-13 09:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20180613_0802'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expense',
            name='program',
        ),
        migrations.AddField(
            model_name='expense',
            name='budget_field',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.BudgetField'),
        ),
        migrations.AlterField(
            model_name='expense',
            name='notes',
            field=models.CharField(max_length=512, null=True),
        ),
        migrations.AlterField(
            model_name='expense',
            name='type',
            field=models.CharField(max_length=256),
        ),
    ]
