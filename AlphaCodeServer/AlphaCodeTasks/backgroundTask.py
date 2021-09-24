from apscheduler.schedulers.background import BackgroundScheduler
from .models import RunServer
from .models import Task
import socket
import pickle

def is_active_server():

    servers = RunServer.objects.all()
    for server in servers:
        try:
            conn = socket.socket()
            conn.connect((server.ip,server.port))
            msg = {'type':'check active'}
            msg_str = pickle.dumps(msg)
            conn.send(msg_str)

            res_str = conn.recv(1024)
            res = pickle.loads(res_str)
            if res['info'] == 'active' and server.status == 'Stopped':
                server.status = 'Running'
                server.save()

        except:
            print(server.name,'is down')
            if server.status != 'Stopped':
                server.status = 'Stopped'
                server.save()


def clear_tasks():
    Task.objects.filter(status="Completed").delete()
        

def start_background_tasks():

    pass
    # scheduler = BackgroundScheduler()
    # scheduler.add_job(is_active_server, 'interval', seconds=20, id='background_system_check', replace_existing=True)
    # scheduler.add_job(clear_tasks, 'interval', seconds=60, id='task_clear', replace_existing=True)
    # scheduler.start()