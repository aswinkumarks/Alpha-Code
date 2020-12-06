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

        all_q = ContestQuestion.objects.filter(contest__cname=cname).order_by("qno")
        for q in all_q:
            if q.qno > int(qno):
                q.qno-=1
                q.save()

    except Exception as e:
        print(e)
        return HttpResponse("<h1>Question out of this dimension</h1>")
    return HttpResponseRedirect('/editContest/'+cname)

@login_required(login_url='/accounts/login')
def saveContestEdit(request):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")
    # try:
    print("\n\n\n",request.body,"\n\n")
    cname = request.POST.get("cname").strip()
    contest = Contest.objects.get(cname=cname)
    contest.desc = request.POST.get("contest_desc").strip()
    contest.hosted_by = request.POST.get("hosted_by").strip()
    st = combine_date_and_time(request.POST.get("start-date"), request.POST.get("start-time"), int(request.POST.get("time_zone_offset")))
    et = combine_date_and_time(request.POST.get("end-date"), request.POST.get("end-time"), int(request.POST.get("time_zone_offset")))
    contest.start_time = st
    contest.end_time = et
    if request.POST.get("duration") == "":
        contest.duration = (et - st).total_seconds() // 60
    else:
        contest.duration = request.POST.get("duration")
    contest.save()
    return HttpResponseRedirect('/editContest/'+cname)

    # except Exception as e:
        # print("exception : ",e)
        # return HttpResponse("<h1>Format Error/ Invalid characters</h1>")