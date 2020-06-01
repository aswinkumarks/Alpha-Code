import socket
import time
import pickle
from threading import Thread
from RunServer import runCode

class Network:
    def __init__(self):
        self.server = socket.socket()
        self.server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
        # self.connection.settimeout(0.2)
        self.serverIP = ''
        self.serverPort = 6000
        self.server.bind(('', self.serverPort))
        self.server.listen(5)
        self.connections = []
        self.server_flag = True


    def start_server(self):
        t = Thread(target=self.code_server)
        t.start()

    def recv_msg(self,conn,addr):
        msg_str = conn.recv(1024)
        msg = pickle.loads(msg_str)
        if msg['type'] == 'Execute Code':
            output = runCode(msg['data']['code'],msg['data']['language'],msg['da\
            ta']['input'])
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
