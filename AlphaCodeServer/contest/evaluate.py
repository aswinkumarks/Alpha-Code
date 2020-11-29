from .models import *
from AlphaCodeTasks.views import runTask

def evaluateSubmission(uname, cname, qno):
	cq  = ContestQuestion.objects.get(contest__cname=cname,qno=qno)
	participant = Participant.objects.get(user__username=uname,contest__cname=cname)
	submitted_ans = Submission.objects.get(participant=participant,qno=qno)
	score = 0
	response = "wrong"
	if cq.qtype == "MCQ":
		question = McqQuestion.objects.get(cq=cq)
		correct_options = Option.objects.filter(question=question,correct_option=True)
		for option in correct_options:
			if submitted_ans.user_answer == option.option:
				response = "Correct"
				break

		if response == "Correct":
			score += question.score

	else:
		question = CodingQuestion.objects.get(cq=cq)
		testcases = TestCase.objects.filter(question=question)
		no_testcases = 0
		correct_answers = 0
		for testcase in testcases:
			data = {'language':submitted_ans.language,
					'code':submitted_ans.user_answer,
					'input':testcase.pgmInput}
			task_output = runTask(data)
			output = task_output["output"]
			output = output.strip()
			if output.split(':')[0] == "Run Server Error":
				return output
				
			# print(output,testcase.pgmOutputOrEvalCode)
			if testcase.OutputType == "Static":
				if output == testcase.pgmOutputOrEvalCode:
					correct_answers += 1
					score += testcase.score
			else:
				data = {'language':"Python",
					'code':testcase.pgmOutputOrEvalCode,
					'input':testcase.pgmInput+'\n'+output}

				res = runTask(data)
				res = res.strip()
				if res.split(':')[0] == "Run Server Error":
					return res

				if res == "True":
					correct_answers += 1

			no_testcases += 1

		response = "%d/%d testcases are  correct"%(correct_answers, no_testcases)

	submitted_ans.score = score
	submitted_ans.save()

	return response


def getParticipantScore(participant):
	submissions = Submission.objects.filter(participant=participant)
	score = 0
	for submission in submissions:
		score += submission.score

	return score