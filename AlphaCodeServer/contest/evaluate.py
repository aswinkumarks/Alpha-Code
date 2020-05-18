from .models import *
from AlphaCodeTasks.views import runTask

def evaluateSubmission(uname,cname,qno):
	cq  = ContestQuestion.objects.get(contest__cname=cname,qno=qno)
	participant = Participant.objects.get(user__username=uname,contest__cname=cname)
	submitted_ans = Submission.objects.get(participant=participant,qno=qno)
	
	if cq.qtype == "MCQ":
		question = McqQuestion.objects.get(cq=cq)
		correct_options = Option.objects.filter(question=question,correct_option=True)
		response = "wrong"
		for option in correct_options:
			if submitted_ans.user_answer == option.option:
				response = "Correct"
				break

	else:
		question = CodingQuestion.objects.get(cq=cq)
		testcases = TestCase.objects.filter(question=question)
		no_testcases = 0
		correct_answers = 0
		for testcase in testcases:
			data = {'language':submitted_ans.language,
					'code':submitted_ans.user_answer,
					'input':testcase.pgmInput}
			output = runTask(data)
			output = output.rstrip()
			# print(output,testcase.pgmOutputOrEvalCode)
			if output == testcase.pgmOutputOrEvalCode:
				correct_answers += 1

			no_testcases += 1

		response = "%d/%d testcases are  correct"%(correct_answers, no_testcases)

	return response

