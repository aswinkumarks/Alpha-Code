import socket
import time
import pickle
from threading import Thread

class Network:
    def __init__(self,addr):
        self.connection = socket.socket()
        self.connection.connect(addr)
        # self.connection.settimeout(0.2)


    def send_data(self,data):
        data_string = pickle.dumps(data)
        self.connection.send(data_string)

    def recv_data(self):
        data_str = self.connection.recv(1024)
        data = pickle.loads(data_str)
        return data

    def close(self):
        self.connection.close()

    