import subprocess
import sys
import os
# import random
import json
# import docker
# import tarfile

# Create your views here.

def runCode(code,lang,inputStr=''):
    MAXTIME = 6
    TIME_LIMIT = 3
    if lang=='C':
        if os.path.isfile('a.out'):
            os.remove('a.out')
        f = open('./tempFiles/temp.c','w')
        f.write(code)
        f.close()
        try:
            command = 'gcc ./tempFiles/temp.c;exit 0'
            output = subprocess.check_output(command, stderr=subprocess.STDOUT,shell=True,universal_newlines=True)
            print("complier output",output)
            if os.path.isfile('a.out'):
                command = "./a.out"
                try:
                    output = subprocess.check_output(command,input=inputStr,stderr=subprocess.STDOUT,shell=True,universal_newlines=True,timeout=MAXTIME)
                    print("Run output",output)
                except subprocess.TimeoutExpired:
                    output = "Execution Time out"
                os.remove('a.out')
        except:
            output = "Un-expected error"

    elif lang=='Python':
        f = open('./tempFiles/temp2.py','w')
        f.write(code)
        f.close()
        try:
            command = 'python ./tempFiles/temp2.py'
            output = subprocess.check_output(command,input=inputStr, stderr=subprocess.STDOUT,shell=True,universal_newlines=True,timeout=MAXTIME)
        except subprocess.TimeoutExpired:
            output = "Execution Time out"
        except subprocess.CalledProcessError as e:
            output = e.output
        except:
            output = "Un-expected error"
    return output


def runCodeInContainer(fname):
    input_file_name = fname.split('.')[0]+".inp"
    with open("/tmp/tempFiles/"+input_file_name,'r') as file:
        inputStr = file.read()

    ext = fname.split('.')[-1]

    if ext == "py":
            lang = "Python"
    elif ext == "c":
        lang = "C"
    else:
        return "Unkown language"

    MAXTIME = 3
    output = "Un-known Error"

    if lang=='C':
        if os.path.isfile('a.out'):
            os.remove('a.out')
        try:
            command = 'gcc /tmp/tempFiles/%s;exit 0'%(fname)
            output = subprocess.check_output(command, stderr=subprocess.STDOUT,shell=True,universal_newlines=True)
            print("complier output",output)
            if os.path.isfile('a.out'):
                command = "./a.out"
                try:
                    output = subprocess.check_output(command,input=inputStr,stderr=subprocess.STDOUT,shell=True,universal_newlines=True,timeout=MAXTIME)
                    print("Run output",output)
                except subprocess.TimeoutExpired:
                    output = "Execution Time out"
                os.remove('a.out')
        except:
            output = "Un-expected error"

    elif lang=='Python':
        try:
            command = 'python3 /tmp/tempFiles/%s'%(fname)
            output = subprocess.check_output(command,input=inputStr, stderr=subprocess.STDOUT,shell=True,universal_newlines=True,timeout=MAXTIME)

        except subprocess.TimeoutExpired:
            output = "Execution Time out"

        except subprocess.CalledProcessError as e:
            output = e.output

        except:
            output = "Un-expected error"

    return output


if __name__ == "__main__":

    if len(sys.argv) == 2:
        fname = sys.argv[1]
        # print(fname)
        res = runCodeInContainer(fname)
        print(res)

    else:
        print("Error")
