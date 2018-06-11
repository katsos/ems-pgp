# Generated by Django 2.0.3 on 2018-06-10 15:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Budget',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
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
        migrations.CreateModel(
            name='Circle',
            fields=[
                ('id', models.SmallIntegerField(primary_key=True, serialize=False)),
                ('manager', models.CharField(max_length=256, null=True)),
                ('title', models.CharField(max_length=512)),
                ('funding_source', models.CharField(default='', max_length=512, null=True)),
                ('starts_at', models.DateField()),
                ('ends_at', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'circles',
            },
        ),
        migrations.CreateModel(
            name='Expense',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField(default='')),
                ('notes', models.TextField(default='')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=8)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'expenses',
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.DecimalField(decimal_places=2, max_digits=6)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('refunded', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'payments',
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=256)),
                ('year', models.PositiveSmallIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('budget', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
            options={
                'db_table': 'programs',
            },
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_time', models.BooleanField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('circle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Circle')),
            ],
            options={
                'db_table': 'registrations',
            },
        ),
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('surname', models.CharField(max_length=256)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('registered_at', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'students',
            },
        ),
        migrations.AddField(
            model_name='registration',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Student'),
        ),
        migrations.AlterUniqueTogether(
            name='program',
            unique_together={('title', 'year')},
        ),
        migrations.AddField(
            model_name='payment',
            name='registration',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Registration'),
        ),
        migrations.AddField(
            model_name='expense',
            name='program',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='expenses', to='api.Program'),
        ),
        migrations.AddField(
            model_name='budget',
            name='circle',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Circle'),
        ),
        migrations.AlterUniqueTogether(
            name='registration',
            unique_together={('student', 'circle')},
        ),
    ]
