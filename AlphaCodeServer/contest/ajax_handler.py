from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from .models import *
import json
from django.contrib.auth.decorators import login_required
from datetime import datetime
import datetime as dt
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .evaluate import evaluateSubmission
from .evaluate import getParticipantScore
from .extra_scripts import *
# from .db_handler import *


@login_required(login_url='/accounts/login')
def delete_contest(request, cname):
    if request.user.is_staff:
        Contest.objects.get(cname=cname).delete()
        template = loader.get_template('contestsDashboard.html')
        context = {}
        return HttpResponse(template.render(context, request))


@login_required(login_url='/accounts/login')
def edit_contest_pg(request, cname):
    if request.user.is_staff:
        contest = Contest.objects.get(cname=cname)
        questions = get_all_contest_questions(cname)
        
        for q in questions:
            print(q, questions[q])
        
        template = loader.get_template('editcontest.html')
        context = {"cname": cname, "desc": contest.desc, "hosted_by": contest.hosted_by, "startDate": contest.startTime,
                   "endDate": contest.endTime, "host": contest.hosted_by, "duration": contest.duration, "questions":questions}
        return HttpResponse(template.render(context, request))
