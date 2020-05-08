from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Contest(models.Model):
    cId = models.AutoField(primary_key=True)
    cname = models.CharField(unique=True,max_length=50)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()

    def __str__(self):
        return self.cname


class Participant(models.Model):
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    start_time = models.TimeField(auto_now_add=True)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    rank = models.IntegerField(default=9999999)
    submition_time = models.TimeField()



class McqQuestion(models.Model):
    question = models.TextField()

    def __str__(self):
        return self.question[:30]
        

class Option(models.Model):
    question = models.ForeignKey(McqQuestion, on_delete=models.CASCADE)
    option = models.CharField(max_length=250)
    correct_option = models.BooleanField(default=False)


class CodingQuestion(models.Model):
    question = models.TextField()
    description = models.TextField()

    def __str__(self):
        return self.question[:30]


class TestCase(models.Model):
    question = models.ForeignKey(CodingQuestion,on_delete=models.CASCADE)
    testCaseType = models.CharField(max_length=30,choices=(('Hidden','Output and Input will be hidden from user'),
                                        ('Visible','Output and Input will be shown to user')))
    pgmInput = models.TextField(default = "")
    OutputType = models.CharField(max_length=30,choices=(('Static','Program output will be same for the given input'),
                                        ('Dynamic','Program ouput will be different for the given input')))
    pgmOutputOrEvalCode = models.TextField()


class ContestQuestion(models.Model):
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    qno = models.IntegerField()
    qtype = models.CharField(max_length=50,choices=(('MCQ','Multiple Choice Question'),
                        ('Coding','Coding Question')))
    mcqQues = models.OneToOneField(McqQuestion, null=True, blank=True, on_delete=models.CASCADE)
    codingQues = models.OneToOneField(CodingQuestion, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['contest', 'qno'], name='name of constraint')
        ]

    def _str_(self):
        return str(self.qno)



class User_Response(models.Model):
    cId = models.ForeignKey(Contest, on_delete=models.CASCADE)
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    q_no = models.IntegerField()
    user_answer = models.TextField()

