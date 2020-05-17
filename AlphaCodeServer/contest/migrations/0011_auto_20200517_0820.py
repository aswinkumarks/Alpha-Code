# Generated by Django 3.0.5 on 2020-05-17 08:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contest', '0010_auto_20200502_0713'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contestquestion',
            name='codingQues',
        ),
        migrations.RemoveField(
            model_name='contestquestion',
            name='mcqQues',
        ),
        migrations.AlterField(
            model_name='testcase',
            name='testCaseType',
            field=models.CharField(choices=[('Hidden', 'Output and Input will be hidden from user'), ('Visible', 'Output and Input will be shown to user')], max_length=30),
        ),
    ]
