from django.urls import path
from . import views

urlpatterns = [
        path('', views.ListCourse.as_view()),
        path('<int:pk>/', views.DetailCourse.as_view()),
        ]
