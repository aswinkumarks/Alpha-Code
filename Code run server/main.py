from network import Network
from docker_test import DockerContainer
import signal

def interrut_handler(sig, frame):
    print('Stoping containers')
    net.server_flag = False
    docker_container.stop_all()
    exit(0)

if __name__ == '__main__':
	docker_container = DockerContainer()
	docker_container.create_containers(5)
	docker_container.start_all()
	signal.signal(signal.SIGINT, interrut_handler)
	net = Network(container = docker_container)
	# try:
	# 	net = Network(container = docker_container)
	# except:
	# 	print('Stoping containers')
	# 	docker_container.stop_all()
	net.start_server()
	print('Started server')
