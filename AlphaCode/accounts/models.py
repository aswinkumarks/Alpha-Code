from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.
class Participant(models.Model):
    userId = models.ForeignKey(get_user_model(),to_field='id',on_delete=models.CASCADE)
    p1class = models.CharField(max_length=10)
    p2class = models.CharField(max_length=10)
    monitor_num = models.CharField(primary_key=True, max_length=10)
    score = models.IntegerField(default=0)