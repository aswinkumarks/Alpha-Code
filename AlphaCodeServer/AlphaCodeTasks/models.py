from django.db import models
# from django_mysql.models import JSONField

# Create your models here.
class Task(models.Model):
	tId = models.AutoField(primary_key=True)
	submission_time = models.TimeField(auto_now_add=True)
	status = models.CharField(max_length=20, choices=(('Running','Task is running'),
                            ('Submitted','Task is registered'),('Completed','Task is complete')),default='Submitted')
	task_type = models.CharField(max_length=20, choices=(('Execute Code','Task for running program'),
                            ('Evaluate Result','Task for scoring the result')))
	info = models.TextField()

	def __str__(self):
		return self.status


class RunServer(models.Model):
	name = models.CharField(max_length=30)
	ip = models.GenericIPAddressField(unique=True)
	port = models.IntegerField()
	no_alloted_tasks = models.IntegerField()
	status = models.CharField(max_length=20, choices=(('Running','Server is Active'),
                            ('Stopped','Server is not running')),default='Stopped')

	def __str__(self):
		return self.name