# Generated by Django 2.0.3 on 2018-06-11 17:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20180611_0910'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='email',
        ),
        migrations.RemoveField(
            model_name='student',
            name='registered_at',
        ),
    ]