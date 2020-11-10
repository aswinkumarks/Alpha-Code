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
from .db_handler import *


@csrf_exempt
def create_contest(request):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")

    if request.method == 'POST':
        cname = request.POST.get("cname")
        start_date_time = combine_date_and_time(request.POST.get("start-date"),
                                                request.POST.get("start-time"), int(request.POST.get("time_zone_offset")))
        end_date_time = combine_date_and_time(request.POST.get("end-date"),
                                              request.POST.get("end-time"),  int(request.POST.get("time_zone_offset")))
        res = save_new_contest_info(cname=request.POST.get("cname"), desc=request.POST.get("contest_desc"),
                                    start_time=start_date_time, end_time=end_date_time)
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
        res = request.body
        res = res.decode('utf-8')
        qtype = request.POST.get("qtype")
        q_desc = request.POST.get("q_desc")
        question = request.POST.get("question")
        contest_questions = ContestQuestion.objects.filter(contest__cname=cname).order_by('-qno')
        if len(contest_questions) == 0:
            qno = 1
        else:
            qno = contest_questions.first().qno + 1

        contest = Contest.objects.get(cname=cname)
        cq = ContestQuestion(contest=contest)
        cq.qno = qno
        cq.qtype = qtype
        no = 1

        if qtype == 'MCQ':
            mcq_question = McqQuestion(cq=cq, question=question)
            cq.save()
            mcq_question.save()

            while True:
                try:
                    op_value = request.POST.get('option'+str(no))
                    correct = False
                    if request.POST.get('ans_correct'+str(no)) == "True":
                        correct = True
                    option = Option(question=mcq_question,option=op_value, correct_option=correct)
                    option.save()
                    no += 1
                except:
                    print(no, 'finished')
                    break

        else:
            codingQues = CodingQuestion(cq=cq, question=question, description=q_desc)
            cq.save()
            codingQues.save()

            while True:
                try:
                    inp = request.POST.get('testcaseip'+str(no))
                    opt = request.POST.get('outputeval'+str(no))
                    t_type = request.POST.get('testcasetype'+str(no))
                    opt_type = request.POST.get('outputtype'+str(no))
                    tc = TestCase(question=codingQues)
                    tc.testCaseType = t_type
                    tc.pgmInput = inp
                    tc.OutputType = opt_type
                    tc.pgmOutputOrEvalCode = opt
                    tc.save()
                    no += 1
                except:
                    print(no, 'finished')
                    break

    template = loader.get_template('createquestion.html')
    context = {}
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
    exist = Participant.objects.filter(
        user=request.user, contest__cname=cname).exists()
    if not exist:
        participant = Participant(user=request.user, contest=contest)
        participant.save()

    if contest.endTime > datetime.now(dt.timezone.utc):
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
    return HttpResponse(str(rem_time.seconds))


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
def result_pg(request, cname):
    participant = Participant.objects.get(user__username=request.user.username, contest__cname=cname)
    score = getParticipantScore(participant)
    # return HttpResponse(str(score))
    template = loader.get_template('results.html')
    context = {"participant":participant}
    context = {}
    return HttpResponse(template.render(context,request))


def thankyou_pg(request):
    template = loader.get_template('thankyou.html')
    context = {}
    return HttpResponse(template.render(context, request))


def testing_pg(request):
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
