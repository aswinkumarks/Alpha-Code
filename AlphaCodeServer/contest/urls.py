from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('contest/<cname>',views.disp_contest_pg),
    path('contests/',views.show_contests),
    path('contest/<cname>/getQuestion/<int:qno>',views.getQuestion),
    # path('saveResponse/<qno>',views.saveResponse)
    path('getReminTime/<cname>',views.reminingTime),
    path('create_contest/', views.create_contest),
    path('admin_page/', views.admin_page),
    path('create_contest/<cname>/create_question/', views.create_question)
]
