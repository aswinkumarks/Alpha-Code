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
        # contest = Contest.objects.get(cname=cname)
        qobj = ContestQuestion.objects.get(qno=1,contest__cname=cname)
        if qobj.qtype == 'MCQ':
            question = qobj.mcqQues
        else:
            question = codingQues
        # code_ques = CodingQuestion.objects.filter(cqId=qobj)
        # mcq = McqQuestion.objects.filter(cqId=qobj)
        
        # if code_ques:
        #     question = code_ques[0]
        # else:
        #     question = mcq[0]
        
        qlen = len(ContestQuestion.objects.filter(contest__cname=cname))
        context = {"qno":qobj.qno, "question":question, "num_of_q":list(range(1,qlen+1))}
        # context = {"":""}
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