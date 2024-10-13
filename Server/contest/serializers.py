from rest_framework import serializers
from .models import *
from .models import Question


class ContestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contest
        fields = "__all__"


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ("option", "correct_option")


class TestCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestCase
        fields = ("testCaseType", "pgmInput", "OutputType", "pgmOutputOrEvalCode", "score")


class QuestionSerializer(serializers.ModelSerializer):
    contest = serializers.SlugRelatedField(slug_field="contestName", queryset=Contest.objects.all())
    testcases = TestCaseSerializer(many=True)
    options = OptionSerializer(many=True)

    class Meta:
        model = Question
        fields = ("id", "qno", "qtype", "question", "description", "score",  "contest", "testcases", "options")

    def create(self, validated_data):
        testcases_data = validated_data.pop('testcases')
        options_data = validated_data.pop('options')
        contest_name = validated_data.pop('contest')
        contest = Contest.objects.get(contestName=contest_name)
        question = Question.objects.create(contest=contest, **validated_data)
        if validated_data['qtype'] == 'MCQ':
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
        else:
            for testcase_data in testcases_data:
                TestCase.objects.create(question=question, **testcase_data)
        return question

    def update(self, instance, validated_data):
        testcases_data = validated_data.get('testcases')
        options_data = validated_data.get('options')
        instance.qtype = validated_data.get('qtype', instance.qtype)
        instance.question = validated_data.get('question', instance.question)
        instance.description = validated_data.get('description', instance.description)
        instance.score = validated_data.get('score', instance.score)
        if validated_data['qtype'] == 'MCQ' and options_data:
            prev_options = Option.objects.filter(question=instance)
            prev_options.delete()
            for option_data in options_data:
                Option.objects.create(question=instance, **option_data)
        elif validated_data['qtype'] == 'Coding' and testcases_data:
            prev_testcases = TestCase.objects.filter(question=instance)
            prev_testcases.delete()
            for testcase_data in testcases_data:
                TestCase.objects.create(question=instance, **testcase_data)
        
        instance.save()
        return instance