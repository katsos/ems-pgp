# Generated by Django 2.0.3 on 2018-05-27 14:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20180527_1423'),
    ]

    operations = [
        migrations.RenameField(
            model_name='program',
            old_name='expense',
            new_name='expenses',
        ),
    ]