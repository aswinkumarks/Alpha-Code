# Generated by Django 3.0.2 on 2020-05-01 08:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_participant_start_time'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Participant',
        ),
    ]
