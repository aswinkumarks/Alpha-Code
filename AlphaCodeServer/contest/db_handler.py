from datetime import timedelta
from .models import *
from .extra_scripts import *

def save_new_contest_info(post_data):
    try:
        cname = post_data.get("cname")
        start_time = combine_date_and_time(post_data.get("start-date"), post_data.get("start-time"),
                                                int(post_data.get("time_zone_offset")))
        end_time = combine_date_and_time(post_data.get("end-date"), post_data.get("end-time"),
                                                int(post_data.get("time_zone_offset")))
        if Contest.objects.filter(cname=cname):
            return False

        duration = post_data.get("duration", (end_time - start_time).total_seconds() // 60)
        new_contest = Contest(cname=cname, desc=post_data.get("contest_desc"), startTime=start_time,
                            endTime=end_time, hosted_by=post_data.get("hosted_by", ""), duration=duration)
        new_contest.save()
    except:
        return False

    return True


def save_new_mcq_question(cq_obj, post_data):
    question = post_data.get("question")
    mcq_question = McqQuestion(cq=cq_obj, question=question)
    mcq_question.save()
    no = 1 
    while True:
        try:
            op_value = post_data.get('option'+str(no))
            correct = False
            if post_data.get('ans_correct'+str(no)) == "True":
                correct = True
            option = Option(question=mcq_question,option=op_value, correct_option=correct)
            option.save()
            no += 1
        except:
            break

    return True


def save_new_coding_question(cq_obj, post_data):
    q_desc = post_data.get("q_desc")
    question = post_data.get("question")
    codingQues = CodingQuestion(cq=cq_obj, question=question, description=q_desc)
    codingQues.save()
    no = 1
    while True:
        try:
            inp = post_data.get('testcaseip'+str(no))
            opt = post_data.get('outputeval'+str(no))
            t_type = post_data.get('testcasetype'+str(no))
            opt_type = post_data.get('outputtype'+str(no))
            tc = TestCase(question=codingQues, testCaseType=t_type, pgmInput=inp,
                        OutputType=opt_type, pgmOutputOrEvalCode= opt)
            tc.save()
            no += 1
        except:
            break

    return True


def get_prev_question_no(cname):
    contest_questions = ContestQuestion.objects.filter(contest__cname=cname)
    return len(contest_questions) + 1

def create_new_question(post_data, cname):
    qtype = post_data.get("qtype")
    contest = Contest.objects.get(cname=cname)
    cq = ContestQuestion(contest=contest)
    cq.qno = get_prev_question_no(cname)
    cq.qtype = qtype
    cq.save()

    if qtype == "MCQ":
        res = save_new_mcq_question(cq, post_data)
    else:
        res = save_new_coding_question(cq, post_data)

    if not res:
        cq.delete()
        return False

    return True