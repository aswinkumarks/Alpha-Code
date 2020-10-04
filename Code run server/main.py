from network import Network
from container import DockerContainer
import signal
import argparse

def interrut_handler(sig, frame):
    print('Stoping containers')
    net.server_flag = False
    docker_container.stop_all()
    exit(0)

if __name__ == '__main__':
	parser = argparse.ArgumentParser()
	parser.add_argument("-e","--execution_mode",default="containerd",help="-e normal/containerd")
	args = parser.parse_args()
	if args.execution_mode == "containerd":
		docker_container = DockerContainer()
		docker_container.create_containers(5)
		docker_container.start_all()
		signal.signal(signal.SIGINT, interrut_handler)
		net = Network(container = docker_container)
	else:
		net = Network(execution_mode="normal")

	net.start_server()
	print('Started server')
