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


@login_required(login_url='/accounts/login')
def delete_question(request, cname, qno):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")
    try:
        ContestQuestion.objects.get(contest__cname=cname, qno=qno).delete()
    except:
        return HttpResponse("<h1>Question out of this dimension</h1>")
    return HttpResponseRedirect('/editContest/'+cname)
