# Generated by Django 2.0.3 on 2018-05-19 13:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_payment'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='programs',
            field=models.ManyToManyField(through='api.Registration', to='api.Program'),
        ),
    ]