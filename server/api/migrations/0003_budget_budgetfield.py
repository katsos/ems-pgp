# Generated by Django 2.0.3 on 2018-06-08 19:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_circle'),
    ]

    operations = [
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('circle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Circle')),
            ],
            options={
                'db_table': 'budgets',
            },
        ),
        migrations.CreateModel(
            name='BudgetField',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=16)),
                ('title', models.CharField(max_length=256)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('budget', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Budget')),
            ],
            options={
                'db_table': 'budget_fields',
            },
        ),
    ]
