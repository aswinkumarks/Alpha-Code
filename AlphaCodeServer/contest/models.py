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
    def __str__(self):
        return self.cname

class Participant(models.Model):
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    start_time = models.TimeField(auto_now_add=True)
    cId = models.ForeignKey(Contest, on_delete=models.CASCADE)
    rank = models.IntegerField(default=9999999)
    submition_time = models.TimeField()


class ContestQuestion(models.Model):
    cId = models.ForeignKey(Contest, on_delete=models.CASCADE)
    qno = models.IntegerField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['cId', 'qno'], name='name of constraint')
        ]


class CodingQuestion(models.Model):
    cqId = models.ForeignKey(ContestQuestion, on_delete=models.CASCADE)
    question = models.TextField()
    description = models.TextField()

    def __str__(self):
        return self.question[:30]


class TestCase(models.Model):
	q_id = models.ForeignKey(CodingQuestion,on_delete=models.CASCADE)
	testCaseType = models.CharField(max_length=30,choices=(('Hidden','Output and Input will be hidden from user'),
    									('Visiable','Output and Input will be shown to user')))
	pgmInput = models.TextField(default = "")
	OutputType = models.CharField(max_length=30,choices=(('Static','Program output will be same for the given input'),
    									('Dynamic','Program ouput will be different for the given input')))
	pgmOutputOrEvalCode = models.TextField()


class McqQuestion(models.Model):
    cqId = models.ForeignKey(ContestQuestion, on_delete=models.CASCADE)
    question = models.TextField()

    def __str__(self):
        return self.question[:30]


class Option(models.Model):
    q_id = models.ForeignKey(McqQuestion, on_delete=models.CASCADE)
    option = models.CharField(max_length=250)
    correct_option = models.BooleanField(default=False)

class User_Response(models.Model):
    cId = models.ForeignKey(Contest, on_delete=models.CASCADE)
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    q_no = models.IntegerField()
    user_answer = models.TextField()

### 
# class Question(models.Model):
#     cqId = models.ForeignKey(ContestQuestion, on_delete=models.CASCADE)
#     question = models.TextField()
#     description = models.TextField()

# 	testCaseType = models.CharField(max_length=30,choices=(('Hidden','Output and Input will be hidden from user'),
#     									('Visiable','Output and Input will be shown to user')))
# 	pgmInput = models.TextField(default = "")
# 	OutputType = models.CharField(max_length=30,choices=(('Static','Program output will be same for the given input'),
#     									('Dynamic','Program ouput will be different for the given input')))
# 	pgmOutputOrEvalCode = models.TextField()

#     option = models.CharField(max_length=250)
#     correct_option = models.BooleanField(default=False)

#     def __str__(self):
#         return self.question[:30]