from rest_framework import serializers
from .models import Contest

class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ("cId", "cname", "desc", "hosted_by", "duration", "startTime", "endTime")