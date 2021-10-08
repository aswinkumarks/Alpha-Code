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
from .serializers import ContestSerializer
from rest_framework.permissions import IsAuthenticated



class ContestView(viewsets.ModelViewSet):
    # permission_classes = (IsAuthenticated,)
    serializer_class = ContestSerializer
    queryset = Contest.objects.all()
    