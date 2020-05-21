from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import *
import json
from django.contrib.auth.decorators import login_required
# import datetime
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .evaluate import evaluateSubmission


# Create your views here.
@csrf_exempt
def create_contest(request):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")

    if request.method == 'POST':
        res = request.body
        res = res.decode('utf-8')
        cname = request.POST.get("cname")
        st = request.POST.get("start-time")
        et = request.POST.get("end-time")
        # print(cname,st,et)
        if Contest.objects.filter(cname=cname):
            return HttpResponse("ERROR : Contest Name already in use. Please choose a different one.")

        c = Contest(cname=cname, startTime=st, endTime=et)
        c.save()
        return HttpResponseRedirect(cname+'/create_question')

    template = loader.get_template('createcontest.html')
    context = {}
    return HttpResponse(template.render(context,request))


@csrf_exempt
def create_question(request, cname):
    if not request.user.is_staff:
        return HttpResponse("<h1>Access Denied</h1>")
        
    if request.method == 'POST':
        res = request.body
        res = res.decode('utf-8')
        qno = request.POST.get("qno")
        qtype = request.POST.get("qtype")
        q_desc = request.POST.get("q_desc")
        question = request.POST.get("question")
        # print(res)
        # print(cname)
        if ContestQuestion.objects.filter(contest__cname=cname, qno=qno):
            return HttpResponse("ERROR : Question number already in DB. Please choose a different question number.")
        
        contest = Contest.objects.get(cname=cname)
        cq = ContestQuestion(contest=contest)
        cq.qno = int(qno)
        cq.qtype = qtype
        no = 1

        if qtype == 'MCQ':
            # pass
            mcq_question = McqQuestion(cq=cq,question=question)
            cq.save()
            mcq_question.save()

            while True:
                try:
                
                    op_value = request.POST.get('option'+str(no))
                    correct = False
                    # print('options',request.POST.get('ans_correct'+str(no)))

                    if request.POST.get('ans_correct'+str(no))=="True":
                        correct = True
                    option = Option(question=mcq_question, option=op_value, correct_option=correct)
                    option.save()
                    no+=1
                    # print(op_value, request.POST.get('ans_correct'))
                except:
                    print(no,'finished')
                    break

        else:
            codingQues = CodingQuestion(cq=cq,question=question,description=q_desc)
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
                    print(no,'finished')
                    break

            # return HttpResponse("Success : Questions added to contest %s"%(cname))



    template = loader.get_template('createquestion.html')
    context = {}
    return HttpResponse(template.render(context,request))


@login_required(login_url='/accounts/login')
def admin_page(request):
    if request.user.is_staff:
        template = loader.get_template('adminpage.html')
        context = {}
        return HttpResponse(template.render(context,request))
    else:
        return HttpResponse("<h1>Access Denied</h1>")


@login_required(login_url='/accounts/login')
def disp_contest_pg(request, cname):
    if request.user.is_authenticated:
        template = loader.get_template('main.html')
        qlen = len(ContestQuestion.objects.filter(contest__cname=cname))        
        qobj = ContestQuestion.objects.get(qno=1,contest__cname=cname)

        if qobj.qtype == 'MCQ':
            options_set = Option.objects.filter(question=qobj.mcqquestion)
            options = [op.option for op in options_set]
            # print(options)
            context = {"qno":qobj.qno, "question":qobj.mcqquestion.question, "desc":None, "num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype, "options":options}
        else:
            context = {"qno":qobj.qno, "question":qobj.codingquestion.question, "desc":qobj.codingquestion.description ,"num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype}
        
        return HttpResponse(template.render(context,request))
    else:
        return HttpResponseRedirect('/')


@login_required(login_url='/accounts/login')
def startContest(request,cname):
    exist = Participant.objects.filter(user=request.user,contest__cname=cname).exists()
    if not exist:
        contest = Contest.objects.get(cname=cname)
        participant = Participant(user=request.user,contest=contest)
        participant.save()

    return HttpResponseRedirect("/contest/"+cname)


@login_required(login_url='/accounts/login')
def getQuestion(request, cname, qno):   
    qobj = ContestQuestion.objects.get(qno=qno,contest__cname=cname)
    qlen = len(ContestQuestion.objects.filter(contest__cname=cname))
    
    print(qobj.qtype)

    if qobj.qtype == 'MCQ':
        options_set = Option.objects.filter(question=qobj.mcqquestion)
        options = [op.option for op in options_set]
        # print(options)
        info = {"qno":qobj.qno, "question":qobj.mcqquestion.question, "desc":None, "num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype, "options":options}
    elif qobj.qtype == "Coding":
        info = {"qno":qobj.qno, "question":qobj.codingquestion.question, "desc":qobj.codingquestion.description ,"num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype}
    else:
        return HttpResponse("DataBase Error")
    
    return HttpResponse(json.dumps(info))


@login_required(login_url='/accounts/login')
def show_contests(request):
    contests = Contest.objects.all()
    return render(request,'contests.html',{"contests":contests})


@csrf_exempt
def saveCode(request):
    content = request.body.decode('utf-8')
    data = json.loads(content)
    res = TempCodeCache.objects.filter(participant__user=request.user,qno=int(data["qno"]),language=data["lang"]).exists()
    if res:
        tmp_code = TempCodeCache.objects.get(participant__user=request.user,qno=int(data["qno"]),language=data["lang"])
        tmp_code.answer = data["code"]
        tmp_code.save()
    else:
        try:
            participant = Participant.objects.get(user=request.user,contest__cname=data["cname"])
            tmp_code = TempCodeCache(participant=participant,qno=int(data["qno"]))
            tmp_code.language = data["lang"]
            tmp_code.answer = data["code"]
            tmp_code.save()
        except:
            return HttpResponse("DB error")

    return HttpResponse("Saved Code")


@csrf_exempt
def getCode(request):
    content = request.body.decode('utf-8')
    data = json.loads(content)
    res = TempCodeCache.objects.filter(participant__user=request.user,qno=int(data["qno"]),language=data["lang"]).exists()
    info = {"code":""}
    if res:
        tmp_code = TempCodeCache.objects.get(participant__user=request.user,qno=int(data["qno"]),language=data["lang"])
        info["code"] = tmp_code.answer

    return HttpResponse(json.dumps(info))


def remainingTime(request,cname):
    contest = Contest.objects.get(cname=cname)
    rem_time = contest.endTime - timezone.now()
    # print(rem_time.days,rem_time.seconds)
    return HttpResponse(str(rem_time.seconds))


@csrf_exempt
def submitResponse(request):
    content = request.body.decode('utf-8')
    data = json.loads(content)
    # print(data["code"])
    try:
        participant = Participant.objects.get(user = request.user, contest__cname = data["cname"])
        exist_submission = Submission.objects.filter(participant = participant, qno = int(data["qno"])).exists()
        if exist_submission:
            submission = Submission.objects.get(participant = participant, qno = int(data["qno"]))
        else:
            submission = Submission(participant = participant, qno = int(data["qno"]))
        
        submission.language = data["lang"]
        submission.user_answer = data["code"].strip()
        submission.save()
    except:
        return HttpResponse("DB error")

    res = evaluateSubmission(request.user.username,data["cname"],int(data["qno"]))
    return HttpResponse(res)


