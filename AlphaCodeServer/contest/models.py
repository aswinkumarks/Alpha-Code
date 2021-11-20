from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

class Contest(models.Model):
    cId = models.AutoField(primary_key=True)
    cname = models.CharField(unique=True,max_length=50)
    desc = models.TextField(blank=True)
    hosted_by = models.CharField(max_length=150, default="")
    duration = models.IntegerField(default=0)
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()

    def __str__(self):
        return self.cname


class Participant(models.Model):
    user = models.ForeignKey(get_user_model(),on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    start_time = models.DateTimeField(auto_now_add=True)
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    rank = models.IntegerField(default=9999999)
    submition_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'contest'], name='Unique user for contest')
        ]

    def __str__(self):
        return self.contest.cname+": "+self.user.username


class ContestResult(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    contest_name = models.ForeignKey(Contest, to_field="cname",on_delete=models.CASCADE)
    rank = models.IntegerField()

    class Meta:
        unique_together = ('contest_name', 'rank',)

    def __str__(self):
        return self.participant.contest.cname + ": " + self.participant.user.username


class Question(models.Model):
    contest = models.ForeignKey(Contest, on_delete=models.CASCADE)
    qno = models.IntegerField()
    qtype = models.CharField(max_length=50,choices=(('MCQ','Multiple Choice Question'),
                        ('Coding','Coding Question')))
    question = models.TextField()
    description = models.TextField(blank=True)
    score = models.IntegerField(default=0)

    class Meta:
        unique_together = ['contest', 'qno']
        ordering = ['qno']
    
    def __str__(self):
        return str(self.qno)+'. '+self.qtype
        

class Option(models.Model):
    question = models.ForeignKey(Question, related_name='options', on_delete=models.CASCADE)
    option = models.CharField(max_length=250)
    correct_option = models.BooleanField(default=False)


class TestCase(models.Model):
    question = models.ForeignKey(Question, related_name='testcases', on_delete=models.CASCADE)
    testCaseType = models.CharField(max_length=30,choices=(('Hidden','Output and Input will be hidden from user'),
                                        ('Visible','Output and Input will be shown to user')))
    pgmInput = models.TextField(default = "")
    OutputType = models.CharField(max_length=30,choices=(('Static','Program output will be same for the given input'),
                                        ('Dynamic','Program output will be different for the given input')))
    pgmOutputOrEvalCode = models.TextField()
    score = models.IntegerField(default =0)

    def __str__(self):
        return self.question.cq.contest.cname + ":" + str(self.question.cq.qno)


class Submission(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    qno = models.IntegerField()
    language = models.CharField(max_length=50,choices=(('Python','Python pgm'),('C++','C++ pgm'),
                                        ('C','C Program')))
    user_answer = models.TextField()
    score = models.IntegerField(default = 0)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['participant', 'qno'], name='Unique qno for participant')
        ]

    def __str__(self):
        return self.participant.user.username


class TempCodeCache(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    qno = models.IntegerField()
    language = models.CharField(max_length=50,choices=(('Python','Python pgm'),('C++','C++ pgm'),
                                        ('C','C Program')))
    answer = models.TextField()

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['participant', 'qno', 'language'], name='Unique answer cache for participant')
        ]


