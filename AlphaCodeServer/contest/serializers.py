from rest_framework import serializers
from .models import *
from .models import Question


class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = ("cId", "cname", "desc", "hosted_by", "duration", "startTime", "endTime")


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ("option", "correct_option")


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ("testCaseType", "pgmInput", "OutputType", "pgmOutputOrEvalCode", "score")


class QuestionSerializer(serializers.ModelSerializer):
    contest = serializers.PrimaryKeyRelatedField(queryset=Contest.objects.all())
    testcases = TestCaseSerializer(many=True)
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ("qno", "qtype", "question", "description", "score",  "contest", "testcases", "options")

    def create(self, validated_data):
        testcases_data = validated_data.pop('testcases')
        options_data = validated_data.pop('options')
        contest_id = validated_data.pop('contest')
        question = Question.objects.create(contest=contest_id, **validated_data)
        if validated_data['qtype'] == 'MCQ':
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
        else:
            for testcase_data in testcases_data:
                TestCase.objects.create(question=question, **testcase_data)
        return question