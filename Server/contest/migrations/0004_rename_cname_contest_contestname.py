# Generated by Django 3.2.9 on 2024-07-14 18:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contest', '0003_auto_20240714_1821'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contest',
            old_name='cname',
            new_name='contestName',
        ),
    ]
