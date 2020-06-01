import subprocess
import os
import random
import json
import docker
import tarfile

# Create your views here.
def runCode(code,lang,inputStr=''):
    MAXTIME = 3
    os.chdir(os.path.join(os.getcwd(), "tempFiles/"))
    client = docker.from_env()
    container_list = client.containers.list()
    if lang=='C':
        # if os.path.isfile('a.out'):
        #     os.remove('a.out')
        f = open('./tempFiles/temp.c','w')
        f.write(code)
        f.close()
        try:
            # command = 'gcc ./tempFiles/temp.c;exit 0'
            # output = subprocess.check_output(command, stderr=subprocess.STDOUT,shell=True,universal_newlines=True)
            # print("complier output",output)
            # if os.path.isfile('a.out'):
            #     command = "./a.out"
            #     try:
            #         output = subprocess.check_output(command,input=inputStr,stderr=subprocess.STDOUT,shell=True,universal_newlines=True,timeout=MAXTIME)
            #         print("Run output",output)
            #     except subprocess.TimeoutExpired:
            #         output = "Execution Time out"
            #     os.remove('a.out')

            cont_no = random.randint(1,6)
            for i in container_list:
                if(i.name == "AlphaCodeContainer%d"%(cont_no)):
                    tart = tarfile.open("randomfile.tar", mode='w')
                    tart.add("temp.c")
                    tart.close()
                    data = open("randomfile.tar", 'rb').read()
                    if(i.put_archive("/root/", data)):
                        try:
                            output = i.exec_run(cmd="gcc temp.c -o temp", workdir="/root/")
                            output = i.exec_run(cmd="./temp", workdir="/root/")
                            i.exec_run(cmd="rm -rf temp temp.c", workdir="/root/")
                            output = output.output
                        except:
                            output = "Unexpected error"
                    else:
                        print("data not written successfully")
                    break
                else:
                    continue

        except:
            output = "Un-expected error"

    elif lang=='Python':
        f = open('./tempFiles/temp2.py','w')
        f.write(code)
        f.close()
        try:
        #     command = 'python ./tempFiles/temp2.py'
        #     output = subprocess.check_output(command,input=inputStr, stderr=subprocess.STDOUT,shell=True,universal_newlines=True,timeout=MAXTIME)
        # except subprocess.TimeoutExpired:
        #     output = "Execution Time out"
        # except subprocess.CalledProcessError as e:
        #     output = e.output
        cont_no = random.randint(1,6)
        for i in container_list:
            if(i.name == "AlphaCodeContainer%d"%(cont_no)):
                tart = tarfile.open("randomfile.tar", mode='w')
                tart.add("temp2.py")
                tart.close()
                data = open("randomfile.tar", 'rb').read()
                if(i.put_archive("/root/", data)):
                    try:
                        output = i.exec_run(cmd="python3 temp2.py", workdir="/root/")
                        i.exec_run(cmd="rm -rf temp2.py", workdir="/root/")
                        output = output.output
                    except:
                        output = "Unexpected error"
                else:
                    print("data not written successfully")
                break
            else:
                continue

        except:
            output = "Un-expected error"
    return output
