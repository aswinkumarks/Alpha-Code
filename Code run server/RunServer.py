import subprocess
import os
import json

# Create your views here.
def runCode(code,lang,inputStr=''):
    MAXTIME = 3
    if lang=='c':
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

    elif lang=='python3':
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