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

@csrf_exempt
def create_contest(request):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")

    if request.method == 'POST':
        cname = request.POST.get("cname").strip()
        res = save_new_contest_info(request.POST)
        if not res:
            return HttpResponse("ERROR : Contest Name already in use. Please choose a different one.")

        return HttpResponseRedirect(cname+'/create_question')

    template = loader.get_template('createcontest.html')
    context = {}
    return HttpResponse(template.render(context, request))


@csrf_exempt
def create_question(request, cname):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")

    if request.method == 'POST':
        try:
            create_new_question(request.POST, cname)
        except Exception as e:
            print(e)
            return HttpResponseRedirect('/error')

    template = loader.get_template('createquestion.html')
    context = {"cname":cname}
    return HttpResponse(template.render(context, request))


@login_required(login_url='/accounts/login')
def admin_page(request):
    if request.user.is_staff:
        template = loader.get_template('adminpage.html')
        context = {}
        return HttpResponse(template.render(context, request))
    else:
        return HttpResponse("<h1>Access Denied</h1>")


@login_required(login_url='/accounts/login')
def disp_contest_pg(request, cname):
    if request.user.is_authenticated:
        contest = Contest.objects.get(cname=cname)
        if contest.endTime < datetime.now(dt.timezone.utc):
            return HttpResponse("Contest Over")

        template = loader.get_template('contest.html')
        qlen = len(ContestQuestion.objects.filter(contest__cname=cname))
        qobj = ContestQuestion.objects.get(qno=1, contest__cname=cname)

        if qobj.qtype == 'MCQ':
            options_set = Option.objects.filter(question=qobj.mcqquestion)
            options = [op.option for op in options_set]
            context = {"qno": qobj.qno, "question": qobj.mcqquestion.question,
                       "desc": None, "num_of_q": list(range(1, qlen+1)),
                       "qtype": qobj.qtype, "options": options, "cname": cname}
        else:
            context = {"qno": qobj.qno, "question": qobj.codingquestion.question,
                       "desc": qobj.codingquestion.description,
                       "num_of_q": list(range(1, qlen+1)), "qtype": qobj.qtype, "cname": cname}

        return HttpResponse(template.render(context, request))
    else:
        return HttpResponseRedirect('/')


@login_required(login_url='/accounts/login')
def startContest(request, cname):
    contest = Contest.objects.get(cname=cname)
    participants = Participant.objects.filter(user=request.user, contest__cname=cname)
    if len(participants) == 0:
        participant = Participant(user=request.user, contest=contest)
        participant.save()
    else:
        participant = participants[0]
    if contest.endTime > datetime.now(dt.timezone.utc) and participant.submition_time is None:
        return HttpResponseRedirect("/contest/"+cname)
    else:
        return HttpResponseRedirect("/contests/ContestOver")


@login_required(login_url='/accounts/login')
def getQuestion(request, cname, qno):
    qobj = ContestQuestion.objects.get(qno=qno, contest__cname=cname)
    qlen = len(ContestQuestion.objects.filter(contest__cname=cname))

    if qobj.qtype == 'MCQ':
        options_set = Option.objects.filter(question=qobj.mcqquestion)
        options = [op.option for op in options_set]
        info = {"qno": qobj.qno, "question": qobj.mcqquestion.question, "desc": None,
                "num_of_q": list(range(1, qlen+1)), "qtype": qobj.qtype, "options": options}
    elif qobj.qtype == "Coding":
        info = {"qno": qobj.qno, "question": qobj.codingquestion.question,
                "desc": qobj.codingquestion.description, "num_of_q": list(range(1, qlen+1)), "qtype": qobj.qtype}
    else:
        return HttpResponse("DataBase Error")

    return HttpResponse(json.dumps(info))


@login_required(login_url='/accounts/login')
def show_contests(request, msg=""):
    contests = Contest.objects.all()
    return render(request, 'contestsDashboard.html', {"contests": contests, "server_msg": msg})


@csrf_exempt
@login_required(login_url='/accounts/login')
def saveCode(request):
    content = request.body.decode('utf-8')
    data = json.loads(content)
    res = TempCodeCache.objects.filter(participant__user=request.user, qno=int(
        data["qno"]), language=data["lang"]).exists()
    if res:
        tmp_code = TempCodeCache.objects.get(participant__user=request.user, qno=int(data["qno"]),
                                             language=data["lang"])
        tmp_code.answer = data["code"]
        tmp_code.save()
    else:
        try:
            participant = Participant.objects.get(user=request.user, contest__cname=data["cname"])
            tmp_code = TempCodeCache(participant=participant, qno=int(data["qno"]))
            tmp_code.language = data["lang"]
            tmp_code.answer = data["code"]
            tmp_code.save()
        except:
            return HttpResponse("DB error")

    return HttpResponse("Saved Code")


@csrf_exempt
@login_required(login_url='/accounts/login')
def getCode(request):
    content = request.body.decode('utf-8')
    data = json.loads(content)
    res = TempCodeCache.objects.filter(participant__user=request.user, qno=int(data["qno"]),
                                         language=data["lang"]).exists()
    info = {"code": ""}
    if res:
        tmp_code = TempCodeCache.objects.get(participant__user=request.user, qno=int(data["qno"]),
                                         language=data["lang"])
        info["code"] = tmp_code.answer

    return HttpResponse(json.dumps(info))


def remainingTime(request, cname):
    contest = Contest.objects.get(cname=cname)
    rem_time = contest.endTime - datetime.now(dt.timezone.utc)
    return HttpResponse(str(rem_time.total_seconds()))


@csrf_exempt
@login_required(login_url='/accounts/login')
def submitResponse(request):
    content = request.body.decode('utf-8')
    data = json.loads(content)
    contest = Contest.objects.get(cname=data["cname"])
    if contest.endTime < datetime.now(dt.timezone.utc):
        return HttpResponse("Contest Over")
    try:
        participant = Participant.objects.get(user=request.user, contest__cname=data["cname"])
        exist_submission = Submission.objects.filter(participant=participant, qno=int(data["qno"])).exists()
        if exist_submission:
            submission = Submission.objects.get(participant=participant, qno=int(data["qno"]))
        else:
            submission = Submission(participant=participant, qno=int(data["qno"]))

        submission.language = data["lang"]
        submission.user_answer = data["code"].strip()
        submission.save()
    except:
        return HttpResponse("DB error")

    res = evaluateSubmission(request.user.username, data["cname"], int(data["qno"]))
    return HttpResponse(res)


@login_required(login_url='/accounts/login')
def final_submit(request, cname):
    participant = Participant.objects.get(user=request.user, contest__cname=cname)
    participant.submition_time = datetime.now(dt.timezone.utc)
    participant.score = getParticipantScore(participant)
    participant.save()
    return HttpResponseRedirect("/%s/results"%(cname))


@login_required(login_url='/accounts/login')
def result_pg(request, cname):
    participant = Participant.objects.get(user__username=request.user.username, contest__cname=cname)
    score = getParticipantScore(participant)
    # return HttpResponse(str(score))
    template = loader.get_template('results.html')
    context = {"participant":participant}
    return HttpResponse(template.render(context,request))


def thankyou_pg(request):
    template = loader.get_template('thankyou.html')
    context = {}
    return HttpResponse(template.render(context, request))


def error_page(request):
    template = loader.get_template('404.html')
    context = {}
    return HttpResponse(template.render(context, request))


@login_required(login_url='/accounts/login')
def delete_contest(request, cname):
    if request.user.is_staff:
        Contest.objects.get(cname=cname).delete()
        template = loader.get_template('contestsDashboard.html')
        context = {}
        return HttpResponse(template.render(context, request))
