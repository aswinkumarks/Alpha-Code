from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Task,RunServer
from django.views.decorators.csrf import csrf_exempt
from .network import Network
import json
from contest.models import *


def runTask(data):
	task = Task(task_type='Execute Code',info=json.dumps(data))
	task.save()

	available_server = RunServer.objects.filter(status='Running')
	if len(available_server) == 0:
		print('No server available')
		return 'Run Server Error: No server available'

	servers = sorted(available_server,key=lambda x:x.no_alloted_tasks)
	msg = {'taskId':task.tId,'type':task.task_type,'data':data}
	output = "Run Server Error: Un-Known Error"
	task_executed = False
	for server in servers:
		try:
			conn = Network((server.ip,server.port))
			conn.send_data(msg)
			server.no_alloted_tasks += 1
			server.save()
			task.status = 'Running'
			task.save()
			try:
				data = conn.recv_data()
				task_executed = True
				output = data['response']
				break
			except:
				output = 'Run Server Error: No response from server'
			server.no_alloted_tasks -= 1
			server.save()
		except:
			output = 'Run Server Error: Cannot connect to server'

	if task_executed:
		task.status = 'Completed'
		task.save()

	return {"status":task_executed, "output":output}


def runTestCase(testcase, data):
	task_output = runTask(data)
	if not task_output["status"]:
		return {"status":False, "output":"Code Run Server Error"}

	output = task_output["output"]
	output = output.strip()
	correct_ans = False
	if testcase.OutputType == "Static":
		if output == testcase.pgmOutputOrEvalCode:
			correct_ans = True
	else:
		data = {'language':"Python",
			'code':testcase.pgmOutputOrEvalCode,
			'input':testcase.pgmInput+'\n'+output}
		res = runTask(data)
		res = res.strip()
		if res.split(':')[0] == "Run Server Error":
			return res
		if res == "True":
			correct_ans = True

	return {"status": True, "output":output, "input": data["input"], "correct_ans":correct_ans}


@csrf_exempt
def run(request):
	res = request.body
	res = res.decode('utf-8')
	data = json.loads(res)
	cname = data['contest name']
	cq  = ContestQuestion.objects.get(contest__cname=data['contest name'],qno=data["qno"])
	question = CodingQuestion.objects.get(cq=cq)
	testcases = TestCase.objects.filter(question=question)
	results = []
	for testcase in testcases:
		task_data = {'language':data['lang'],
					'code':data['code'],
					'input':testcase.pgmInput}
		res = runTestCase(testcase, task_data)
		res["expected_output"] = testcase.pgmOutputOrEvalCode
		results.append(res)

	# output = output.replace("<",'&lt')
	# output = output.replace(">",'&gt')
	template = loader.get_template('code-output-block.html')
	context = {"testcase_results":results}
	return HttpResponse(template.render(context,request))