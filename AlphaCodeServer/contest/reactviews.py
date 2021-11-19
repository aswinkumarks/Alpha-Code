from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import *
import json
from django.contrib.auth.decorators import login_required
from datetime import datetime
import datetime as dt
from django.views.decorators.csrf import csrf_exempt
from .evaluate import evaluateSubmission
from .evaluate import getParticipantScore
from .extra_scripts import *
from .db_handler import *
from rest_framework import viewsets
from .serializers import QuestionSerializer, ContestSerializer
from rest_framework.permissions import IsAuthenticated



class ContestView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()


class QuestionView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = Question.objects.all()
        contest_name = self.request.query_params.get('cname')
        if contest_name is not None:
            queryset = queryset.filter(contest__cname=contest_name)
        return queryset
    