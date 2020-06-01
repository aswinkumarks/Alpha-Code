import docker
import os


class dockerContainer:
	def __init__(self):
		self.client = docker.from_env()
		self.containers = []

	def create_containers(self,no_containers):

		mount_path= {os.getcwd():{'bind': '/tmp', 'mode': 'ro'}}

		for c_no in range(no_containers):
			c_name = "Alpha-Code-Container%d"%(c_no)
			if len(self.client.containers.list(all=True,
				   filters={"name":c_name})) == 0:
				container = self.client.containers.create('run-code-container',
							volumes=mount_path,stdin_open = True
							, tty = True, working_dir="/root",
							detach=True,mem_limit='50M',
							name="Alpha-Code-Container%d"%(c_no))
				print("Created container %d"%(c_no+1))
			else:
				container = self.client.containers.get(c_name)
				print("Container %s is already created"%(c_name))
			self.containers.append(container)


	def start(self):
		for index,container in enumerate(self.containers):
			print("Starting Container %d"%(index+1))
			container.start()
			print("Container %d started"%(index+1))


	def stop(self):
		for index,container in enumerate(self.containers):
			print("Stoping Container %d"%(index+1))
			container.stop(timeout=2)
			# container.remove(force=True)
			print("Container %d stoped"%(index+1))


container = dockerContainer()
coderunnernet = container.client.networks.create("coderunnernet", driver="bridge")

container.create_containers(5)
container.start()

for i in container.containers:
	print("connecting: %s",i)
	coderunnernet.connect(i)

res = input("Stop containers [y/n] :")
if res == 'y':
	container.stop()

container.client.networks.prune()
#Alphine reuirements
#gcc
#libc-dev
#python3
