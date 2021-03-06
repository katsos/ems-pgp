# Generated by Django 2.0.3 on 2018-06-14 20:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20180614_0830'),
    ]

    operations = [
        migrations.AddField(
            model_name='expense',
            name='is_completed',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='payment',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='api.Student'),
        ),
    ]
