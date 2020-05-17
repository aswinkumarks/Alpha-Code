from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import loader
from .models import *
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
            return HttpResponse("ERROR : Contest Name already in use. Please choose a different one.")

        c = Contest(cname=cname, startTime=st, endTime=et)
        c.save()
        return HttpResponseRedirect(cname+'/create_question')

    template = loader.get_template('createcontest.html')
    context = {}
    return HttpResponse(template.render(context,request))

@csrf_exempt
def create_question(request, cname):
    
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
            mcq_question = McqQuestion(question=question)
            cq.mcqQues = mcq_question
            mcq_question.save()
            cq.save()

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
            codingQues = CodingQuestion(question=question,description=q_desc)
            cq.codingQues = codingQues
            codingQues.save()
            cq.save()
            
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

def admin_page(request):
    template = loader.get_template('adminpage.html')
    context = {}
    return HttpResponse(template.render(context,request))

def disp_contest_pg(request, cname):
    if request.user.is_authenticated:
        template = loader.get_template('main.html')
        qlen = len(ContestQuestion.objects.filter(contest__cname=cname))        
        qobj = ContestQuestion.objects.get(qno=1,contest__cname=cname)
        print(qobj.qtype)
        if qobj.qtype == 'MCQ':
            context = {"qno":qobj.qno, "question":qobj.mcqQues.question, "num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype}
        else:
            context = {"qno":qobj.qno, "question":qobj.codingQues.question, "desc":qobj.codingQues.description ,"num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype}
        
        return HttpResponse(template.render(context,request))
    else:
        return HttpResponseRedirect('/')


def getQuestion(request, cname, qno):   
    # question,desc,pgmInput,expOutput = '','','',''
    qobj = ContestQuestion.objects.get(qno=qno,contest__cname=cname)
    qlen = len(ContestQuestion.objects.filter(contest__cname=cname))
    
    print(qobj.qtype)
    if qobj.qtype == 'MCQ':
        info = {"qno":qobj.qno, "question":qobj.mcqQues.question, "num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype}
    elif qobj.qtype == "Coding":
        info = {"qno":qobj.qno, "question":qobj.codingQues.question, "desc":qobj.codingQues.description ,"num_of_q":list(range(1,qlen+1)), "qtype":qobj.qtype}
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