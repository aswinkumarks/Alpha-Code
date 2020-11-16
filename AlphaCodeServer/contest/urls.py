from django.conf.urls import url
from django.urls import path
from . import views
from . import ajax_handler

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
    path('final_submit/<cname>', views.final_submit),
    path('<cname>/results', views.result_pg),
    path('thankyou', views.thankyou_pg),
    path('error', views.error_page),
    path('deleteContest/<cname>', ajax_handler.delete_contest),
    path('editContest/<cname>', ajax_handler.edit_contest_pg)
]
