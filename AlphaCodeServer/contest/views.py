from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import ContestQuestion, CodingQuestion, Contest, McqQuestion
import json

# Create your views here.
# def quiz(request):
#     if request.user.is_authenticated:
#         template = loader.get_template('quizpage.html')
#         ques = Questions.objects.filter(q_no=1)
#         context = {"question":ques}
#         return HttpResponse(template.render(context,request))
#     else:
#         return HttpResponseRedirect('/')


def disp_contest_pg(request, cname):
    if request.user.is_authenticated:
        template = loader.get_template('main.html')
        contest = Contest.objects.get(cname=cname)
        qobj = ContestQuestion.objects.get(qno=1,cId=contest)
        code_ques = CodingQuestion.objects.filter(cqId=qobj)
        mcq = McqQuestion.objects.filter(cqId=qobj)

        if code_ques:
            question = code_ques
        else:
            question = mcq

        qlen = len(ContestQuestion.objects.filter(cId=contest))
        context = {"question":question, "num_of_q":list(range(1,qlen+1))}
        # context = {"":""}
        return HttpResponse(template.render(context,request))
    else:
        return HttpResponseRedirect('/')


def getQuestion(request,qno):
    ques = Questions.objects.filter(q_no=qno)
    qlen = len(Questions.objects.all())
    question,desc,pgmInput,expOutput = '','','',''
    for q in ques:
        question = q.question
        desc = q.description
        pgmInput = q.pgmInput
        expOutput = q.expOutput
    info = {"ques": question, "desc":desc, "input":pgmInput, "expOutput":expOutput, "num_of_q":list(range(1,qlen+1))}
    return HttpResponse(json.dumps(info))

# def saveResponse(request,qno):
#     res = request.body
#     res = res.decode('utf-8')
#     m = Questions.objects.get(q_no=qno)
#     m.user_answer = res
#     m.save()
#     return HttpResponse("")