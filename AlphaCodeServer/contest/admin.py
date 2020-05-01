from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Contest)
admin.site.register(ContestQuestions)
admin.site.register(CodingQuestions)
admin.site.register(TestCases)
admin.site.register(MCQ_Questions)
admin.site.register(Option)