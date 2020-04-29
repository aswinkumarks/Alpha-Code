from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('run/<lang>/<int:Q_no>',views.run),
    # path('round2',views.quiz2),
    # path('getQuestion/<int:qno>',views.getQuestion),
    # path('saveResponse/<qno>',views.saveResponse)
]
