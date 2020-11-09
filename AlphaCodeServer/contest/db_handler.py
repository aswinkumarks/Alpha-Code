from datetime import timedelta
from .models import *


def save_new_contest_info(cname, desc, start_time, end_time, hosted_by="", duration=0):
    if Contest.objects.filter(cname=cname):
        return False

    new_contest = Contest(cname=cname, desc=desc, startTime=start_time,
                          endTime=end_time, hosted_by=hosted_by, duration=duration)
    new_contest.save()
    return True
