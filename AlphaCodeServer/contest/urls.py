from django.conf.urls import url
from django.urls import path
from . import views

urlpatterns = [
    path('contest/<cname>',views.disp_contest_pg),
    path('contests/',views.show_contests),
    path('contests/<msg>',views.show_contests),
    path('contest/<cname>/getQuestion/<int:qno>',views.getQuestion),
    path('submitResponse',views.submitResponse),
    path('getRemTime/<cname>',views.remainingTime),
    path('saveCode',views.saveCode),
    path('getCode',views.getCode),
    path('startContest/<cname>',views.startContest),
    path('create_contest/', views.create_contest),
    path('admin_page/', views.admin_page),
    path('create_contest/<cname>/create_question/', views.create_question),
    path('finalSubmit/<cname>', views.result_pg),
    path('thankyou', views.thankyou_pg),
    path('testing', views.testing_pg),
    path('deleteContest/<cname>', views.delete_contest),
    path('editContest', views.delete_contest)
]
