from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import ContestQuestion, CodingQuestion, Contest, McqQuestion
import json

# Create your views here.

def create_contest(request):
    template = loader.get_template('createcontest.html')
    context = {}
    return HttpResponse(template.render(context,request))

def create_question(request):
    template = loader.get_template('create_question.html')
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