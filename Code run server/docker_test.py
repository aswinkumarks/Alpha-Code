import docker
import os
import copy
# from threading import Thread
import concurrent.futures

class DockerContainer:
	def __init__(self):
		self.client = docker.from_env()
		self.containers = []
		self.available_containers = []

	def create_containers(self,no_containers):
		try:
			# Check if run-code-image exists
			image = self.client.images.get('run-code-image')
		except docker.errors.ImageNotFound:
			print("run-code-image not found")
			try:
				print("Trying to build image please wait..")
				image,log = self.client.images.build(path = "./",tag="run-code-image",quiet=False)
				# for line in log:
				# 	print(line)
			except:
				print("Docker build error")
				exit(0)
		except:
			print("Docker Service not found")
			exit(0)


		mount_path= {os.getcwd():{'bind': '/tmp', 'mode': 'ro'}}

		# Create containers if not present 
		for c_no in range(no_containers):
			c_name = "Alpha-Code-Container%d"%(c_no)
			if len(self.client.containers.list(all=True,
				   filters={"name":c_name})) == 0:
				container = self.client.containers.create('run-code-image',
							volumes=mount_path,stdin_open = True
							, tty = True, working_dir="/root",
							detach=True,mem_limit='50M',
							name="Alpha-Code-Container%d"%(c_no))
				print("Created container %d"%(c_no+1))
			else:
				container = self.client.containers.get(c_name)
				print("Container %s is already created"%(c_name))
			self.containers.append(container)

		self.available_containers = copy.copy(self.containers)


	def start_all(self):
		for index,container in enumerate(self.containers):
			print("Starting Container %d"%(index+1))
			container.start()
			print("Container %d started"%(index+1))


	def stop_all(self):
		for index,container in enumerate(self.containers):
			print("Stoping Container %d"%(index+1))
			container.stop(timeout=0)
			# container.remove(force=True)
			print("Container %d stopped"%(index+1))


	def run_file(self,container,fname):
		name, ext = fname.split('.')
		if(ext == 'py'):
			command = ['sh', '-c', 'cat %s.inp | timeout 3 python3 %s'%(name, fname)]
			print(command)
		elif(ext == 'c'):
			command	= ['sh', '-c', 'gcc %s && (cat %s.inp | timeout 3 ./a.out)'%(fname,name)]
			print(command)
		resgen = container.exec_run(cmd=command,workdir="/tmp/tempFiles/",stream=True)
		#return res.output.decode()
		res = ''
		for i in resgen.output:
			res = res + i.decode() + '\n'

		return res

	def allocate_container(self,fname):
		TIMEOUT = 10
		container = self.available_containers.pop(0)
		with concurrent.futures.ThreadPoolExecutor() as executor:
			future = executor.submit(self.run_file,container,fname)
			try:
				output = future.result(timeout=TIMEOUT)
			except:
				output = "Time limit Exceeded"
				container.stop(timeout=0)
				container.start()

		self.available_containers.append(container)
		return output


	def execute_task(self,fname):
		TIMEOUT = 5

		if len(self.available_containers) == 0:
			return "No container is available"

		output = "Docker: Un-known Error"
		with concurrent.futures.ThreadPoolExecutor() as executor:
			future = executor.submit(self.allocate_container,fname)
			try:
				output = future.result(timeout=TIMEOUT)
			except:
				output = "Time limit Exceeded"

		return output



if __name__ == "__main__":
	container = DockerContainer()
	# coderunnernet = container.client.networks.create("coderunnernet", driver="bridge")

	container.create_containers(5)
	container.start_all()

	# for i in container.containers:
	# 	print("connecting: %s",i)
	# 	coderunnernet.connect(i)
	for cont in container.containers:
		res = cont.exec_run(cmd="echo hello;",workdir="/root")
		print(res)
		print(res.output)

	output = container.execute_task("temp2.py")

	print(output)

	res = input("Stop containers [y/n] :")
	if res == 'y':
		container.stop_all()

	# container.client.networks.prune()
#Alphine reuirements
#gcc
#libc-dev
#python3
