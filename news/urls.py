from django.urls import path
from . import views

urlpatterns = [
    path('', views.news_list, name='news_list'),
    path('<slug:slug>/', views.news_detail, name='news_detail'),
]
