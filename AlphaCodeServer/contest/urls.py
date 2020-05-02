from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('contest/<cname>',views.disp_contest_pg),
    # path('round1',views.quiz),
    # path('round2',views.quiz2),
    path('contest/<cname>/getQuestion/<int:qno>',views.getQuestion),
    # path('saveResponse/<qno>',views.saveResponse)
    path('create_contest/', views.create_contest),
    path('admin_page/', views.admin_page),
    path('create_contest/<cname>', views.create_question)
]
