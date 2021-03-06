from datetime import datetime
from datetime import timedelta
from .models import *


def combine_date_and_time(date, time, offset):
    date = datetime.strptime(date, '%Y-%m-%d')
    time = datetime.strptime(time, '%H:%M').time()
    date_time = date.combine(date, time) + timedelta(minutes=offset)
    return date_time


def get_all_contest_questions(cname):
    cqs = ContestQuestion.objects.filter(contest__cname=cname)
    data = {}
    for cq in cqs:
        if cq.qtype == 'MCQ':
            q = cq.mcqquestion
            options = Option.objects.filter(question=q)
            data[cq.qno] = {"qobj":q, "qtype":cq.qtype, "options": options}
        else:
            q = cq.codingquestion
            testcases = TestCase.objects.filter(question=q)
            data[cq.qno] = {"qobj":q, "qtype":cq.qtype, "testcases":testcases}
    return data
