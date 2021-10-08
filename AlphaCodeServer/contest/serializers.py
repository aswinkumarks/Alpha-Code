from rest_framework import serializers
from .models import *


class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ("cId", "cname", "desc", "hosted_by", "duration", "startTime", "endTime")


class QuestionSerializer(serializers.ModelSerializer):
    contest = ContestSerializer()
    class Meta:
        model = ContestQuestion
        fields = ("qno", "qtype", "contest")


class McqOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ("option", "correct_option")


class McqQuestionSerializer(serializers.ModelSerializer):
    cq = serializers.PrimaryKeyRelatedField(queryset=Contest.objects.all())
    options = McqOptionSerializer(many=True)
    class Meta:
        model = McqQuestion
        fields = ("question", "score", "cq", "options")


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ("testCaseType", "pgmInput", "OutputType", "pgmOutputOrEvalCode", "score")


class CodingQuestionSerializer(serializers.ModelSerializer):
    cq = serializers.PrimaryKeyRelatedField(queryset=Contest.objects.all())
    testcases = TestCaseSerializer(many=True)
    class Meta:
        model = CodingQuestion
        fields = ("question", "description", "cq", "testcases")
