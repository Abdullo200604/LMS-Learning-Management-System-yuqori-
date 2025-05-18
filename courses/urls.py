from django.urls import path
from . import views

urlpatterns = [
    path('', views.course_list, name='course_list'),
    path('<int:course_id>/', views.course_detail, name='course_detail'),
    path('schedule/', views.schedule, name='schedule'),
    path('attendance/', views.attendance_list, name='attendance_list'),
    path('attendance/<int:course_id>/', views.attendance, name='attendance'),
    path('attendance/<int:course_id>/stats/', views.attendance_stats, name='attendance_stats'),
]
