import socket
import time
import pickle
from threading import Thread
from RunServer import runCode
from uuid import uuid4
import os

class Network:
    def __init__(self,container):
        self.server = socket.socket()
        self.server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        # self.connection.settimeout(0.2)
        self.serverIP = ''
        self.serverPort = 6000
        self.server.bind(('', self.serverPort))
        self.server.listen(5)
        self.connections = []
        self.server_flag = True

        self.docker_container = container


    def start_server(self):
        t = Thread(target=self.code_server)
        t.start()

    def recv_msg(self,conn,addr):
        msg_str = conn.recv(1024)
        msg = pickle.loads(msg_str)
        if msg['type'] == 'Execute Code':
            lang = msg['data']['language']
            if lang == "Python":
                ext = ".py"
            elif lang == "C":
                ext = ".c"

            unique_id = str(uuid4())
            fname = unique_id + ext
            codefilepath = "./tempFiles/"+fname
            inpfilepath = "./tempFiles/"+unique_id+".inp"
            with open(codefilepath,'w') as file:     # Write code to a file
                file.write(msg['data']['code'])

            with open(inpfilepath,'w') as file:
                file.write(msg['data']['input'])

            # output = runCode(msg['data']['code'],msg['data']['language'],msg['data']['input'])

            output = self.docker_container.execute_task(fname)
            print("output",output)

            try:
                os.remove(codefilepath)
                os.remove(inpfilepath)
            except:
                print("Cannot remove temp files")

            return_msg = {'taskId':msg['taskId'],'response':output}
            return_msg_str = pickle.dumps(return_msg)
            conn.send(return_msg_str)

        elif msg['type'] == 'check active':
            msg['info'] = 'active'
            return_msg_str = pickle.dumps(msg)
            conn.send(return_msg_str)


        self.connections.remove((conn,addr))
        conn.close()


    def code_server(self):
        self.server_flag = True
        while self.server_flag:
            conn ,addr = self.server.accept()
            self.connections.append((conn,addr))
            print(addr)
            t1 = Thread(target=self.recv_msg,args=(conn ,addr))
            t1.start()


    def stop(self):
        self.server_flag = False


    def send_data(self,data,dest):
        data_string = pickle.dumps(data)
        self.connection.sendto(data_string,dest)
