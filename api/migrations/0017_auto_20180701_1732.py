# Generated by Django 2.0.3 on 2018-07-01 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_auto_20180624_1157'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='notes',
            field=models.CharField(blank=True, default='', max_length=256),
        ),
    ]
