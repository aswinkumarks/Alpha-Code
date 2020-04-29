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
	t1 = Task(task_type='Execute Code',info=json.dumps(data))
	t1.save()

	# duplicate = Temp_Code.objects.filter(q_no=Q_no,lang=lang)

	# if len(duplicate) < 1:
	#     m = Temp_Code(q_no=Q_no,code=code,lang=lang)
	#     m.save()
	# else:
	#     m = Temp_Code.objects.get(q_no=Q_no,lang=lang)
	#     m.code = code  
	#     m.save()

	# if Q_no == 0:
	#     fname = './codeRunner/Test_case/Q%d_testcase.txt'%(Q_no)
	#     if os.path.isfile(fname):
	#         f = open(fname,'r')
	#         inputStr = f.read()
	#         print(inputStr)
	#     else:
	#         print("File not found")

	available_server = RunServer.objects.filter(status='Running')
	if len(available_server) == 0:
		print('No server available')
		return HttpResponse('No server available')

	server = min(available_server,key=lambda x:x.no_alloted_tasks)
	msg = {'taskId':t1.tId,'type':t1.task_type,'data':data}
	try:
		conn = Network((server.ip,server.port))
		conn.send_data(msg)

		data = conn.recv_data()
		output = data['response']
	except:
		output = 'Cannot connect to server'

	print("Output:",output)
	output = output.replace("<",'&lt')
	output = output.replace(">",'&gt')
	# print(output)
	return HttpResponse(output)