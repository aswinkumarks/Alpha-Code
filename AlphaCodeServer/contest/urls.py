from django.conf.urls import url
from django.urls import path, include
from . import views, admin_views, reactviews
from . import ajax_handler
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'contests', reactviews.ContestView, "contest")
router.register(r'create_contest', reactviews.CreateContest, "create_contest")

urlpatterns = [
    path('contest/<cname>',views.disp_contest_pg),
    path('contests/',views.show_contests),
    path('contests/<msg>',views.show_contests),
    path('getQuestion/<cname>/<int:qno>',views.getQuestion),
    path('submitResponse',views.submitResponse),
    path('getRemTime/<cname>',ajax_handler.remainingTime),
    path('saveCode',ajax_handler.saveCode),
    path('getCode',ajax_handler.getCode),
    path('startContest/<cname>',views.startContest),
    path('create_contest/', views.create_contest),
    path('admin_page/', views.admin_page),
    path('create_contest/<cname>/create_question/', views.create_question),
    path('final_submit/<cname>', views.final_submit),
    path('<cname>/results', views.result_pg),
    path('thankyou', views.thankyou_pg),
    path('error', views.error_page),
    path('deleteContest/<cname>', ajax_handler.delete_contest),
    path('editContest/<cname>', ajax_handler.edit_contest_pg),
    path('delete_question/<cname>/<qno>', admin_views.delete_question),
    path('saveContestEdit', admin_views.saveContestEdit),
    path('api/', include(router.urls))
    
]
