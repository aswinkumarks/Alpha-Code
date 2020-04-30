from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Contest(models.Model):
    cId = models.AutoField(primary_key=True)
    cname = models.CharField(max_length=50)
    num_of_q = models.IntegerField()
    contest_type = models.CharField()  #mcq, prog


class Questions(models.Model):
    q_no = models.IntegerField(primary_key=True)
    question = models.TextField()
    description = models.TextField()
    pgmInput = models.TextField(default = "")
    expOutput = models.TextField(default = "")
    num_of_testcases = models.IntegerField()
    # answer = models.CharField(max_length=100)
    # user_answer = models.CharField(max_length=100, default = "")

class Code_Answers(models.Model):
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    q_no = models.IntegerField()
    code = models.TextField()
    lang = models.CharField(max_length=50)
    # submission_time = models.TimeField(auto_now_add=True)

class MCQ_Questions(models.Model):
    q_no = models.IntegerField(primary_key=True)
    question = models.TextField()
    description = models.TextField()
    answer = models.CharField(max_length=4) #option a or acd etc

class MCQ_Answers(models.Model):
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    q_no = models.IntegerField()
    user_answer = models.CharField(max_length=4)

