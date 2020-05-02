from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import ContestQuestion, CodingQuestion, Contest, McqQuestion
import json

from django.views.decorators.csrf import csrf_exempt



# Create your views here.
@csrf_exempt
def create_contest(request):
    if request.method == 'POST':
        res = request.body
        res = res.decode('utf-8')
        cname = request.POST.get("cname")
        st = request.POST.get("start-time")
        et = request.POST.get("end-time")
        # print(cname,st,et)
        if Contest.objects.filter(cname=cname):
            return HttpResponse("error : already in database")

        c = Contest(cname=cname, startTime=st, endTime=et)
        c.save()
        return HttpResponseRedirect(cname+'/create_question')

    template = loader.get_template('createcontest.html')
    context = {}
    return HttpResponse(template.render(context,request))

@csrf_exempt
def create_question(request, cname):
    print("in create question")
    # if request.method == 'POST':
    #     res = request.body
    #     res = res.decode('utf-8')
    #     print(res['cname'])

    template = loader.get_template('createquestion.html')
    context = {}
    return HttpResponse(template.render(context,request))

def admin_page(request):
    template = loader.get_template('adminpage.html')
    context = {}
    return HttpResponse(template.render(context,request))

def disp_contest_pg(request, cname):
    if request.user.is_authenticated:
        template = loader.get_template('main.html')
        qlen = len(ContestQuestion.objects.filter(contest__cname=cname))        
        qobj = ContestQuestion.objects.get(qno=1,contest__cname=cname)
        
        if qobj.qtype == 'MCQ':
            context = {"qno":qobj.qno, "question":qobj.mcqQues.question, "num_of_q":list(range(1,qlen+1))}
        else:
            context = {"qno":qobj.qno, "question":qobj.codingQues.question, "desc":qobj.codingQues.description ,"num_of_q":list(range(1,qlen+1))}
        
        return HttpResponse(template.render(context,request))
    else:
        return HttpResponseRedirect('/')


def getQuestion(request, cname, qno):   
    # question,desc,pgmInput,expOutput = '','','',''
    qobj = ContestQuestion.objects.get(qno=qno,contest__cname=cname)
    qlen = len(ContestQuestion.objects.filter(contest__cname=cname))
    
    if qobj.qtype == 'Coding':
        info = {"qno":qobj.qno, "question":qobj.codingQues.question, "desc":qobj.codingQues.description, "num_of_q":list(range(1,qlen+1))}
    elif qobj.qtype == 'MCQ':
        info = {"qno":qobj.qno, "question":qobj.mcqQues.question, "desc":"", "num_of_q":list(range(1,qlen+1))}
    else:
        return HttpResponse("DataBase Error")
    
    # for q in ques:
    #     question = q.question
    #     desc = q.description
    #     pgmInput = q.pgmInput
    #     expOutput = q.expOutput
    # info = {"ques": question, "desc":desc, "input":pgmInput, "expOutput":expOutput, "num_of_q":list(range(1,qlen+1))}
    return HttpResponse(json.dumps(info))
    # return HttpResponse(info)

# def saveResponse(request,qno):
#     res = request.body
#     res = res.decode('utf-8')
#     m = Questions.objects.get(q_no=qno)
#     m.user_answer = res
#     m.save()
#     return HttpResponse("")