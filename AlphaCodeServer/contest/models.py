from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Contest(models.Model):
    cId = models.AutoField(primary_key=True)
    cname = models.CharField(unique=True,max_length=50)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    # contest_type = models.CharField(max_length=50,choices=(('MCQ','Multiple Choice Question'),
    #                         ('Coding','Coding Question')))  #mcq, prog

class ContestQuestions(models.Model):
    cId = models.ForeignKey(Contest, on_delete=models.CASCADE)
    qno = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['cId', 'qno'], name='name of constraint')
        ]


class CodingQuestions(models.Model):
    cqId = models.ForeignKey(ContestQuestions, on_delete=models.CASCADE)
    question = models.TextField()
    description = models.TextField()


class TestCases(models.Model):
	q_id = models.ForeignKey(CodingQuestions,on_delete=models.CASCADE)
	testCaseType = models.CharField(max_length=30,choices=(('Hidden','Output and Input will be hidden from user'),
    									('Visiable','Output and Input will be shown to user')))
	pgmInput = models.TextField(default = "")
	OutputType = models.CharField(max_length=30,choices=(('Static','Program output will be same for the given input'),
    									('Dynamic','Program ouput will be different for the given input')))
	pgmOutputOrEvalCode = models.TextField()


class MCQ_Questions(models.Model):
    cqId = models.ForeignKey(ContestQuestions, on_delete=models.CASCADE)
    question = models.TextField()


class Option(models.Model):
	q_id = models.ForeignKey(MCQ_Questions, on_delete=models.CASCADE)
	option = models.CharField(max_length=250)

# class MCQ_Answers(models.Model):
#     cId = models.ForeignKey(Contest, on_delete=models.CASCADE)
#     userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
#     q_no = models.IntegerField()
#     user_answer = models.CharField(max_length=4)

