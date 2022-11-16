from django.urls import path
from . import views

urlpatterns = [
    path('', views.review_list),
    path('review/<int:review_pk>/', views.review_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('review/<int:review_pk>/comments/', views.comment_create),
]