# Generated by Django 2.0.3 on 2018-03-27 20:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_registration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='registered_at',
            field=models.DateField(),
        ),
    ]