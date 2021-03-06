from datetime import timedelta
from .models import *
from .extra_scripts import *

def save_new_contest_info(post_data):
    try:
        cname = post_data.get("cname").strip()
        start_time = combine_date_and_time(post_data.get("start-date"), post_data.get("start-time"),
                                                int(post_data.get("time_zone_offset")))
        end_time = combine_date_and_time(post_data.get("end-date"), post_data.get("end-time"),
                                                int(post_data.get("time_zone_offset")))
        if Contest.objects.filter(cname=cname):
            return False
        
        if post_data.get("contest_desc") == "":
            desc = ""
        else:
            desc = post_data.get("contest_desc")
        
        if post_data.get("duration") == "":
            duration = (end_time - start_time).total_seconds() // 60
        else:
            duration = post_data.get("duration")
        new_contest = Contest(cname=cname, desc=desc, startTime=start_time, endTime=end_time, hosted_by=post_data.get("hosted_by", ""), duration=duration)
        new_contest.save()
    except Exception as e:
        print(e)
        return False

    return True


def save_new_mcq_question(cq_obj, post_data):
    question = post_data.get("question")
    score = post_data.get("score")
    mcq_question = McqQuestion(cq=cq_obj, question=question, score=score)
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
            score = post_data.get('score'+str(no))
            tc = TestCase(question=codingQues, testCaseType=t_type, pgmInput=inp,
                        OutputType=opt_type, pgmOutputOrEvalCode=opt, score=score)
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


def update_result(participant, cname):
    if ContestResult.objects.filter(participant=participant, contest_name=cname).exists():
        print("Error: Rank already calculated")
        return False

    contest = Contest.objects.get(cname=cname)
    results = ContestResult.objects.filter(contest_name=cname).order_by("rank")
    rank = -1
    for result in results:
        if result.participant.score < participant.score:
            rank = result.rank
            break
        elif result.participant.score == participant.score and \
             result.participant.submition_time > participant.submition_time:
            rank = result.rank
            break
    
    if rank == -1:
        ContestResult(participant=participant, contest_name=contest, rank=len(results)+1).save()
        return True

    for result in reversed(results):
        if result.rank >= rank:
            result.rank += 1
            result.save()

    ContestResult(participant=participant, contest_name=contest, rank=rank).save()
