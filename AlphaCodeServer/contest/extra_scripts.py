from datetime import datetime
from datetime import timedelta

def combine_date_and_time(date, time, offset):
    date = datetime.strptime(date, '%Y-%m-%d')
    time = datetime.strptime(time, '%H:%M').time()
    date_time = date.combine(date, time) + timedelta(minutes=offset)
    return date_time
