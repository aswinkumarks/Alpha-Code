from django.db import models

# Create your models here.
class Questions(models.Model):
    q_no = models.IntegerField(primary_key=True)
    question = models.TextField()
    description = models.TextField()
    pgmInput = models.TextField(default = "")
    expOutput = models.TextField(default = "")
    # answer = models.CharField(max_length=100)
    # user_answer = models.CharField(max_length=100, default = "")