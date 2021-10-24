from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Contest)
admin.site.register(Question)
admin.site.register(TestCase)
admin.site.register(Option)
admin.site.register(Participant)
admin.site.register(TempCodeCache)
admin.site.register(Submission)
admin.site.register(ContestResult)