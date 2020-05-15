from django.shortcuts import render
from django.http import HttpResponse
from .models import Task,RunServer
from django.views.decorators.csrf import csrf_exempt
from .network import Network
import json

@csrf_exempt
def run(request,lang,Q_no=0):
	res = request.body
	res = res.decode('utf-8')
	res = json.loads(res)
	# print(res)
	code = res["code"]
	# code = res
	output = "Error"
	inputStr = res["input"]
	data = {'language':lang,'code':code,'input':inputStr}
	task = Task(task_type='Execute Code',info=json.dumps(data))
	task.save()


	available_server = RunServer.objects.filter(status='Running')
	if len(available_server) == 0:
		print('No server available')
		return HttpResponse('No server available')

	servers = sorted(available_server,key=lambda x:x.no_alloted_tasks)
	msg = {'taskId':task.tId,'type':task.task_type,'data':data}

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
				output = 'No response from server'

			server.no_alloted_tasks -= 1
			server.save()

		except:
			output = 'Cannot connect to server'

	if task_executed:
		task.status = 'Completed'
		task.save()

	print("Output:",output)
	output = output.replace("<",'&lt')
	output = output.replace(">",'&gt')
	# print(output)
	return HttpResponse(output)